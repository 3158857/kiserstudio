"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { isBlobConfigured, writeManifest, type ManifestItem } from "@/lib/store";

export type SaveResult = { ok: boolean; error?: string };

export async function saveGallery(items: ManifestItem[]): Promise<SaveResult> {
  // Server actions are public endpoints; the layout guard does not protect them.
  if (!(await isAuthenticated())) return { ok: false, error: "Not signed in." };

  if (!Array.isArray(items) || items.length > 500) {
    return { ok: false, error: "Unexpected payload." };
  }

  const clean: ManifestItem[] = items.map((i) => ({
    id: String(i.id).slice(0, 300),
    url: String(i.url).slice(0, 2000),
    caption: String(i.caption ?? "").slice(0, 200),
    visible: Boolean(i.visible),
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}
