import fs from "node:fs";
import path from "node:path";
import manifest from "@/data/gallery.json";

export type GalleryItem = {
  file: string;
  caption: string;
  visible: boolean;
  /** False when the file is on disk but not yet in the committed manifest. */
  inManifest: boolean;
};

const ARTWORK_DIR = path.join(process.cwd(), "public", "artwork");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

function filesOnDisk(): string[] {
  try {
    return fs.readdirSync(ARTWORK_DIR).filter((f) => IMAGE.test(f)).sort();
  } catch {
    return [];
  }
}

/**
 * Merges the committed manifest with whatever is actually in public/artwork.
 * Manifest order wins; files dropped in since the last commit are appended
 * and default to hidden, so nothing reaches the public gallery uncurated.
 * Manifest entries whose file has been deleted are dropped.
 */
export function getGallery(): GalleryItem[] {
  const files = filesOnDisk();
  const known = new Set(manifest.items.map((i) => i.file));

  const ordered = manifest.items
    .filter((i) => files.includes(i.file))
    .map((i) => ({
      file: i.file,
      caption: i.caption ?? "",
      visible: Boolean(i.visible),
      inManifest: true,
    }));

  const newcomers = files
    .filter((f) => !known.has(f))
    .map((f) => ({ file: f, caption: "", visible: false, inManifest: false }));

  return [...ordered, ...newcomers];
}

export function getVisibleGallery(): GalleryItem[] {
  return getGallery().filter((i) => i.visible);
}
