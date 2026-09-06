import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import bootstrap from "@/data/gallery.json";

export type ManifestItem = {
  /** Stable key: `repo:<filename>` or `blob:<pathname>`. */
  id: string;
  url: string;
  caption: string;
  visible: boolean;
};

export const MANIFEST_PATH = "gallery/manifest.json";
export const UPLOAD_PREFIX = "artwork/";

/** Gitignored dev fallback, so the admin is usable before Blob exists. */
const LOCAL_MANIFEST = path.join(process.cwd(), ".gallery-store.json");

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function normalise(raw: unknown): ManifestItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const { id, url, caption, visible } = entry as Record<string, unknown>;
    if (typeof id !== "string" || typeof url !== "string") return [];
    return [
      {
        id,
        url,
        caption: typeof caption === "string" ? caption : "",
        visible: Boolean(visible),
      },
    ];
  });
}

/**
 * Manifest precedence: Blob, then the local dev file, then the committed
 * bootstrap in src/data. The bootstrap means a fresh store still renders the
 * gallery that is live today rather than an empty page.
 */
export async function readManifest(): Promise<ManifestItem[]> {
  if (isBlobConfigured()) {
    try {
      const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
      const found = blobs.find((b) => b.pathname === MANIFEST_PATH);
      if (found) {
        const res = await fetch(found.url, { cache: "no-store" });
        if (res.ok) {
          const parsed = await res.json();
          return normalise(parsed?.items);
        }
      }
    } catch {
      // Fall through to the bootstrap rather than break the page.
    }
    return normalise(bootstrap.items);
  }

  try {
    const raw = await fs.readFile(LOCAL_MANIFEST, "utf8");
    return normalise(JSON.parse(raw)?.items);
  } catch {
    return normalise(bootstrap.items);
  }
}

export async function writeManifest(items: ManifestItem[]): Promise<void> {
  const body = JSON.stringify({ items }, null, 2) + "\n";

  if (isBlobConfigured()) {
    await put(MANIFEST_PATH, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      // The manifest is read through our own cached layer, so keep the CDN
      // copy short-lived to avoid serving a stale save.
      cacheControlMaxAge: 60,
    });
    return;
  }

  await fs.writeFile(LOCAL_MANIFEST, body, "utf8");
}

/** Uploaded artwork, newest first. Empty when Blob isn't configured. */
export async function listUploads(): Promise<{ pathname: string; url: string }[]> {
  if (!isBlobConfigured()) return [];
  try {
    const { blobs } = await list({ prefix: UPLOAD_PREFIX });
    return blobs
      .filter((b) => b.pathname !== UPLOAD_PREFIX)
      .map((b) => ({ pathname: b.pathname, url: b.url }));
  } catch {
    return [];
  }
}
