"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { saveGallery } from "@/app/actions/gallery";
import type { GalleryItem } from "@/lib/gallery";

// Generous, because the file is downscaled before it leaves the browser —
// this only rejects absurd inputs.
const MAX_UPLOAD_BYTES = 60 * 1024 * 1024;

// Long-edge cap. Above ~1536 device px nothing on the site can show more
// detail, so anything larger is only useful to someone downloading it.
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.85;

/**
 * Only the fields that actually get written. Blank and absent are treated the
 * same so clearing a field doesn't read as a pending change forever.
 */
function fingerprint(list: GalleryItem[]): string {
  return JSON.stringify(
    list.map((r) => [
      r.id,
      r.url,
      r.caption ?? "",
      r.medium ?? "",
      r.dimensions ?? "",
      r.visible,
      r.aspect ?? null,
    ]),
  );
}

const FIELD =
  "font-secondary w-full border border-rule-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-chalk/60";

/**
 * Downscales in the browser so full-resolution originals are never published.
 * createImageBitmap with imageOrientation:'from-image' applies EXIF rotation —
 * without it, portrait phone photos upload sideways.
 */
async function downscale(file: File): Promise<{ blob: Blob; name: string }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image.");
  // Photographs of drawings are opaque; a white bed keeps any transparent
  // source from turning black when re-encoded as JPEG.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );
  if (!blob) throw new Error("Could not process image.");

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return { blob, name };
}

export function GalleryAdmin({
  items,
  blobReady,
  manifestSource,
  manifestError,
}: {
  items: GalleryItem[];
  blobReady: boolean;
  manifestSource: "blob" | "local" | "bootstrap";
  manifestError?: string;
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const [rows, setRows] = useState<GalleryItem[]>(items);
  // Baseline for the dirty check. Compared on persisted fields only: the
  // server also returns inManifest and source, which are derived and never
  // saved, so including them left the button permanently "unpublished" after
  // a successful save — publishing a new piece flips inManifest to true on
  // the server while local state still says false.
  const [baseline, setBaseline] = useState(() => fingerprint(items));
  const [saving, startSaving] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const dirty = fingerprint(rows) !== baseline;

  const move = (index: number, delta: number) =>
    setRows((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const update = (id: string, patch: Partial<GalleryItem>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // The optimiser preserves aspect, so the thumbnail is enough to measure it.
  // This is how uploads get their aspect recorded — repo files are measured
  // server-side from their headers.
  const captureAspect = (id: string, el: HTMLImageElement) => {
    if (!el.naturalWidth || !el.naturalHeight) return;
    const aspect = Number((el.naturalWidth / el.naturalHeight).toFixed(4));
    setRows((prev) =>
      prev.map((r) =>
        r.id === id && r.aspect !== aspect ? { ...r, aspect } : r,
      ),
    );
  };

  const save = () => {
    setError(null);
    setStatus(null);
    startSaving(async () => {
      const payload = rows.map(
        ({ id, url, caption, medium, dimensions, visible, aspect }) => ({
          id,
          url,
          caption,
          medium,
          dimensions,
          visible,
          aspect,
        }),
      );
      const result = await saveGallery(payload);
      if (result.ok) {
        setStatus("Published");
        setBaseline(fingerprint(rows));
        router.refresh();
      } else {
        setError(result.error ?? "Save failed.");
      }
    });
  };

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    setStatus(null);

    for (const file of Array.from(files)) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setError(`${file.name} is over 25 MB.`);
        continue;
      }
      setUploading(file.name);
      try {
        const { blob, name } = await downscale(file);
        // Client upload: the file goes browser -> Blob directly, so Vercel's
        // 4.5 MB function body limit doesn't apply and there's no transfer cost.
        await upload(`artwork/${name}`, blob, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
      } catch (err) {
        setError(`${file.name}: ${(err as Error).message}`);
      }
    }

    setUploading(null);
    if (fileInput.current) fileInput.current.value = "";
    router.refresh();
  };

  const visibleCount = rows.filter((r) => r.visible).length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight">Gallery admin</h1>
      <p className="font-secondary mt-3 text-sm opacity-70">
        {rows.length} images · {visibleCount} shown in the gallery
      </p>
      <p className="font-secondary mt-1 text-xs opacity-50">
        Reading manifest from: <strong>{manifestSource}</strong>
        {manifestSource === "bootstrap" && !manifestError && " (nothing published yet)"}
        {manifestError && (
          <span className="text-accent"> — {manifestError}</span>
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 border border-rule-dark bg-white/[0.03] p-5">
        <button
          type="button"
          onClick={save}
          disabled={!dirty || saving}
          className="tracked border border-chalk/40 px-5 py-2.5 text-[0.62rem] uppercase transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-30"
        >
          {saving ? "Publishing…" : "Publish changes"}
        </button>

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={!blobReady || Boolean(uploading)}
          className="tracked border border-chalk/40 px-5 py-2.5 text-[0.62rem] uppercase transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-30"
        >
          {uploading ? `Uploading ${uploading}…` : "Upload artwork"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          hidden
          onChange={(e) => onFiles(e.target.files)}
        />

        {dirty && !saving && (
          <span className="font-secondary text-xs text-accent">Unpublished changes</span>
        )}
        {status && <span className="font-secondary text-xs opacity-70">{status}</span>}
        {error && (
          <span className="font-secondary text-xs text-accent" role="alert">
            {error}
          </span>
        )}
        {blobReady ? (
          <span className="font-secondary text-xs opacity-50">
            Images are resized to {MAX_EDGE}px on upload
          </span>
        ) : (
          <span className="font-secondary text-xs opacity-60">
            Uploads need the Blob store — changes save locally for now.
          </span>
        )}
      </div>

      <ul className="mt-8 space-y-3">
        {rows.map((row, i) => (
          <li
            key={row.id}
            className={`flex items-start gap-4 border p-4 ${
              row.visible
                ? "border-rule-dark bg-white/[0.02]"
                : "border-rule-dark/50 opacity-60"
            }`}
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-graphite/30">
              <Image
                src={row.url}
                alt={row.caption || row.id}
                fill
                sizes="80px"
                className="object-cover"
                onLoad={(e) => captureAspect(row.id, e.currentTarget)}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <code className="truncate text-xs opacity-70">
                  {row.id.replace(/^(repo|blob):/, "")}
                </code>
                {!row.inManifest && (
                  <span className="tracked bg-accent px-2 py-0.5 text-[0.5rem] uppercase">
                    New
                  </span>
                )}
                {row.source === "upload" && (
                  <span className="tracked border border-chalk/25 px-2 py-0.5 text-[0.5rem] uppercase opacity-70">
                    Uploaded
                  </span>
                )}
              </div>

              <label className="mt-3 block">
                <span className="sr-only">Title</span>
                <input
                  type="text"
                  value={row.caption}
                  onChange={(e) => update(row.id, { caption: e.target.value })}
                  placeholder="Title"
                  className={FIELD}
                />
              </label>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Medium</span>
                  <input
                    type="text"
                    value={row.medium ?? ""}
                    onChange={(e) => update(row.id, { medium: e.target.value })}
                    placeholder="Medium — defaults to charcoal on paper"
                    className={FIELD}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Dimensions</span>
                  <input
                    type="text"
                    value={row.dimensions ?? ""}
                    onChange={(e) => update(row.id, { dimensions: e.target.value })}
                    placeholder={'Size — e.g. 9 x 12 in., Unframed'}
                    className={FIELD}
                  />
                </label>
              </div>

              <label className="font-secondary mt-3 inline-flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={row.visible}
                  onChange={(e) => update(row.id, { visible: e.target.checked })}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                Show in gallery
              </label>
            </div>

            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move earlier"
                className="border border-rule-dark px-3 py-1 text-sm transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-25"
              >
                &#8593;
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === rows.length - 1}
                aria-label="Move later"
                className="border border-rule-dark px-3 py-1 text-sm transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-25"
              >
                &#8595;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
