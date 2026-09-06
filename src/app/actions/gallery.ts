"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { isBlobConfigured, writeManifest, type ManifestItem } from "@/lib/store";

export type SaveResult = { ok: boolean; error?: string; deleted?: number };

export async function saveGallery(
  items: ManifestItem[],
  /** Blob pathnames to delete permanently. Repo files can't be deleted at
   *  runtime, so those arrive as archived entries in `items` instead. */
  removeBlobs: string[] = [],
): Promise<SaveResult> {
  // Server actions are public endpoints; the layout guard does not protect them.
  if (!(await isAuthenticated())) return { ok: false, error: "Not signed in." };

  if (!Array.isArray(items) || items.length > 500) {
    return { ok: false, error: "Unexpected payload." };
  }
  if (!Array.isArray(removeBlobs) || removeBlobs.length > 100) {
    return { ok: false, error: "Unexpected payload." };
  }

  const clean: ManifestItem[] = items.map((i) => ({
    id: String(i.id).slice(0, 300),
    url: String(i.url).slice(0, 2000),
    caption: String(i.caption ?? "").slice(0, 200),
    visible: Boolean(i.visible),
    ...(i.medium ? { medium: String(i.medium).slice(0, 160) } : {}),
    ...(i.dimensions ? { dimensions: String(i.dimensions).slice(0, 120) } : {}),
    ...(i.archived ? { archived: true } : {}),
    ...(typeof i.aspect === "number" && i.aspect > 0
      ? { aspect: Number(i.aspect.toFixed(4)) }
      : {}),
  }));

  // On Vercel the filesystem is read-only, so the local dev fallback cannot
  // work there. Say so plainly instead of surfacing an EROFS error.
  if (!isBlobConfigured() && process.env.VERCEL) {
    return {
      ok: false,
      error: "No Blob store connected yet — changes can't be published.",
    };
  }

  try {
    await writeManifest(clean);
  } catch (err) {
    return { ok: false, error: (err as Error).message || "Save failed." };
  }

  // Delete files only after the manifest is safely written: an orphaned blob
  // is harmless, a manifest pointing at a deleted file is not.
  let deleted = 0;
  if (isBlobConfigured()) {
    for (const pathname of removeBlobs) {
      try {
        await del(pathname);
        deleted += 1;
      } catch {
        // Already gone, or a transient failure — the manifest no longer
        // references it either way, so don't fail the whole save.
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, deleted };
}
