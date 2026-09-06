import fs from "node:fs";
import path from "node:path";
import { listUploads, readManifest, type ManifestItem } from "@/lib/store";

export type GalleryItem = ManifestItem & {
  /** False when the image exists but the manifest hasn't seen it yet. */
  inManifest: boolean;
  source: "repo" | "upload";
};

const ARTWORK_DIR = path.join(process.cwd(), "public", "artwork");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

function repoFiles(): { id: string; url: string }[] {
  try {
    return fs
      .readdirSync(ARTWORK_DIR)
      .filter((f) => IMAGE.test(f))
      .sort()
      .map((f) => ({ id: `repo:${f}`, url: `/artwork/${f}` }));
  } catch {
    return [];
  }
}

/**
 * Everything available to curate: the manifest's order and edits, plus any
 * image that exists but isn't in it yet — repo files or fresh uploads —
 * appended and hidden, so nothing goes public uncurated.
 */
export async function getGalleryForAdmin(): Promise<GalleryItem[]> {
  const [manifest, uploads] = await Promise.all([readManifest(), listUploads()]);

  const available = new Map<string, { url: string; source: "repo" | "upload" }>();
  for (const f of repoFiles()) available.set(f.id, { url: f.url, source: "repo" });
  for (const u of uploads) {
    available.set(`blob:${u.pathname}`, { url: u.url, source: "upload" });
  }

  const known = new Set(manifest.map((m) => m.id));

  const ordered: GalleryItem[] = manifest
    .filter((m) => available.has(m.id))
    .map((m) => ({
      ...m,
      // Trust the live URL over the stored one: blob URLs can change.
      url: available.get(m.id)!.url,
      source: available.get(m.id)!.source,
      inManifest: true,
    }));

  const newcomers: GalleryItem[] = [...available.entries()]
    .filter(([id]) => !known.has(id))
    .map(([id, meta]) => ({
      id,
      url: meta.url,
      caption: "",
      visible: false,
      source: meta.source,
      inManifest: false,
    }));

  return [...ordered, ...newcomers];
}

/** What the public gallery renders. One manifest read, no listing. */
export async function getVisibleGallery(): Promise<ManifestItem[]> {
  return (await readManifest()).filter((i) => i.visible);
}
