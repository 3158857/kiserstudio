import { promises as fs } from "node:fs";
import path from "node:path";
import { get, list, put } from "@vercel/blob";
import bootstrap from "@/data/gallery.json";

export type ManifestItem = {
  /** Stable key: `repo:<filename>` or `blob:<pathname>`. */
  id: string;
  url: string;
  /** The piece's title. */
  caption: string;
  /** Falls back to a site-wide default when empty. */
  medium?: string;
  /** e.g. '9 x 12 in., Unframed'. Omitted from the card when empty. */
  dimensions?: string;
  visible: boolean;
  /**
   * Tombstone for repo images, which can't be deleted at runtime — the file
   * stays on disk, but this keeps it out of the admin and the gallery instead
   * of reappearing as a new discovery on every load.
   */
  archived?: boolean;
  /** width / height. Absent on items published before masonry existed. */
  aspect?: number;
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
    const { id, url, caption, medium, dimensions, visible, archived, aspect } =
      entry as Record<string, unknown>;
    if (typeof id !== "string" || typeof url !== "string") return [];
    return [
      {
        id,
        url,
        caption: typeof caption === "string" ? caption : "",
        visible: Boolean(visible),
        ...(typeof medium === "string" && medium ? { medium } : {}),
        ...(typeof dimensions === "string" && dimensions ? { dimensions } : {}),
        ...(archived ? { archived: true } : {}),
        ...(typeof aspect === "number" && aspect > 0 ? { aspect } : {}),
      },
    ];
  });
}

export type ManifestSource = "blob" | "local" | "bootstrap";
export type ManifestRead = {
  items: ManifestItem[];
  source: ManifestSource;
  error?: string;
};

/**
 * Manifest precedence: Blob, then the local dev file, then the committed
 * bootstrap in src/data. Reads go straight to origin (`useCache: false`)
 * because the blob's own CDN copy would otherwise serve a just-published
 * manifest up to a minute stale.
 *
 * Returns the source and any error so the admin can show which store it is
 * actually reading — swallowing these silently made a read failure look
 * identical to an empty store.
 */
export async function readManifestDetailed(): Promise<ManifestRead> {
  if (isBlobConfigured()) {
    try {
      const found = await get(MANIFEST_PATH, {
        access: "public",
        useCache: false,
      });
      if (found && found.statusCode === 200) {
        const parsed = await new Response(found.stream).json();
        return { items: normalise(parsed?.items), source: "blob" };
      }
      // null means the manifest hasn't been written yet — expected on a new store.
      return { items: normalise(bootstrap.items), source: "bootstrap" };
    } catch (err) {
      return {
        items: normalise(bootstrap.items),
        source: "bootstrap",
        error: (err as Error).message || "Blob read failed.",
      };
    }
  }

  try {
    const raw = await fs.readFile(LOCAL_MANIFEST, "utf8");
    return { items: normalise(JSON.parse(raw)?.items), source: "local" };
  } catch {
    return { items: normalise(bootstrap.items), source: "bootstrap" };
  }
}

export async function readManifest(): Promise<ManifestItem[]> {
  return (await readManifestDetailed()).items;
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
