"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

const STORAGE_KEY = "kiser-gallery-draft-v1";

type Row = { file: string; caption: string; visible: boolean; inManifest: boolean };

export function GalleryAdmin({ items }: { items: GalleryItem[] }) {
  const [{ rows, loaded }, setState] = useState<{ rows: Row[]; loaded: boolean }>({
    rows: items,
    loaded: false,
  });
  const [copied, setCopied] = useState(false);

  const setRows = (updater: (prev: Row[]) => Row[]) =>
    setState((prev) => ({ ...prev, rows: updater(prev.rows) }));

  // Restore any in-progress draft, then reconcile against what's on disk now:
  // keep the draft's order and edits, drop files that vanished, append new ones.
  // localStorage is browser-only, so the server renders the committed manifest
  // and this hydrates the draft once on mount. A single state write, not a
  // render loop — which is what the lint rule guards against.
  useEffect(() => {
    let draft: Row[] | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) draft = JSON.parse(raw) as Row[];
    } catch {
      draft = null;
    }

    let next = items;
    if (draft?.length) {
      const onDisk = new Map(items.map((i) => [i.file, i]));
      const kept = draft
        .filter((d) => onDisk.has(d.file))
        .map((d) => ({ ...d, inManifest: onDisk.get(d.file)!.inManifest }));
      const seen = new Set(kept.map((k) => k.file));
      next = [...kept, ...items.filter((i) => !seen.has(i.file))];
    }
    // One-time hydration of client-only persisted state; no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ rows: next, loaded: true });
  }, [items]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {
      /* private mode / quota — the export button is the real safety net */
    }
  }, [rows, loaded]);

  const move = (index: number, delta: number) =>
    setRows((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const update = (file: string, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.file === file ? { ...r, ...patch } : r)));

  const json = useMemo(
    () =>
      JSON.stringify(
        { items: rows.map(({ file, caption, visible }) => ({ file, caption, visible })) },
        null,
        2,
      ) + "\n",
    [rows],
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [json]);

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing to clear */
    }
    setState({ rows: items, loaded: true });
  };

  const visibleCount = rows.filter((r) => r.visible).length;
  const dirty = JSON.stringify(rows) !== JSON.stringify(items);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight">Gallery admin</h1>
      <p className="font-secondary mt-3 text-sm opacity-70">
        {rows.length} images in <code className="opacity-90">public/artwork</code> ·{" "}
        {visibleCount} shown in the gallery
      </p>

      <div className="mt-6 border border-rule-dark bg-white/[0.03] p-5">
        <p className="font-secondary text-sm leading-relaxed opacity-80">
          Edits are saved in this browser only. To publish them, copy the JSON
          below into{" "}
          <code className="opacity-100">src/data/gallery.json</code> and commit.
          A real save button needs a database — that comes with uploads.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="tracked border border-chalk/40 px-5 py-2.5 text-[0.62rem] uppercase transition-colors hover:border-chalk"
          >
            {copied ? "Copied" : "Copy JSON"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!dirty}
            className="tracked border border-chalk/20 px-5 py-2.5 text-[0.62rem] uppercase transition-colors hover:border-chalk/60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Discard changes
          </button>
          {dirty && (
            <span className="font-secondary text-xs text-accent">
              Unpublished changes
            </span>
          )}
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {rows.map((row, i) => (
          <li
            key={row.file}
            className={`flex items-start gap-4 border p-4 ${
              row.visible ? "border-rule-dark bg-white/[0.02]" : "border-rule-dark/50 opacity-60"
            }`}
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-graphite/30">
              <Image
                src={`/artwork/${row.file}`}
                alt={row.caption || row.file}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <code className="truncate text-xs opacity-70">{row.file}</code>
                {!row.inManifest && (
                  <span className="tracked bg-accent px-2 py-0.5 text-[0.5rem] uppercase">
                    New
                  </span>
                )}
              </div>

              <label className="mt-3 block">
                <span className="sr-only">Caption for {row.file}</span>
                <input
                  type="text"
                  value={row.caption}
                  onChange={(e) => update(row.file, { caption: e.target.value })}
                  placeholder="Caption"
                  className="font-secondary w-full border border-rule-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-chalk/60"
                />
              </label>

              <label className="font-secondary mt-3 inline-flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={row.visible}
                  onChange={(e) => update(row.file, { visible: e.target.checked })}
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
                aria-label={`Move ${row.file} earlier`}
                className="border border-rule-dark px-3 py-1 text-sm transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-25"
              >
                &#8593;
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === rows.length - 1}
                aria-label={`Move ${row.file} later`}
                className="border border-rule-dark px-3 py-1 text-sm transition-colors hover:border-chalk disabled:cursor-not-allowed disabled:opacity-25"
              >
                &#8595;
              </button>
            </div>
          </li>
        ))}
      </ul>

      <details className="mt-10">
        <summary className="tracked cursor-pointer text-[0.62rem] uppercase opacity-70">
          Show JSON
        </summary>
        <pre className="mt-4 max-h-80 overflow-auto border border-rule-dark bg-black/40 p-4 text-xs leading-relaxed">
          {json}
        </pre>
      </details>
    </div>
  );
}
