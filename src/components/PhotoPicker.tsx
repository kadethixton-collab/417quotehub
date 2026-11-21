"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { Icon } from "./Icons";

const MAX_PHOTOS = 3;
const MAX_EDGE = 1600;

type Item = { id: string; preview: string; url?: string; status: "uploading" | "done" | "error"; error?: string };

/**
 * Re-encode a photo as a ≤1600px JPEG in the browser. This makes uploads small and fast
 * on mobile data AND strips EXIF metadata, including the GPS location phones embed.
 */
async function compress(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), "image/jpeg", 0.8),
  );
}

export default function PhotoPicker({ onChange }: { onChange: (urls: string[], busy: boolean) => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(
      items.filter((i) => i.status === "done" && i.url).map((i) => i.url!),
      items.some((i) => i.status === "uploading"),
    );
  }, [items, onChange]);

  useEffect(() => () => items.forEach((i) => URL.revokeObjectURL(i.preview)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (id: string, patch: Partial<Item>) => setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  async function upload(file: File, id: string) {
    try {
      const blob = await compress(file);
      const body = new FormData();
      body.append("file", blob, "photo.jpg");
      const res = await fetch("/api/upload-photo", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      update(id, { status: "done", url: data.url });
      track("quote_photo_uploaded");
    } catch (e) {
      const msg = e instanceof Error && e.message !== "encode failed" ? e.message : "Couldn't read that photo.";
      update(id, { status: "error", error: msg });
      track("quote_photo_error");
    }
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const room = MAX_PHOTOS - items.filter((i) => i.status !== "error").length;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, Math.max(room, 0));
    const next = picked.map((f) => ({ id: crypto.randomUUID(), preview: URL.createObjectURL(f), status: "uploading" as const, file: f }));
    setItems((list) => [...list.filter((i) => i.status !== "error"), ...next.map(({ file: _f, ...i }) => i)]);
    next.forEach((n) => upload(n.file, n.id));
    if (inputRef.current) inputRef.current.value = "";
  }

  const remove = (id: string) =>
    setItems((list) => {
      const gone = list.find((i) => i.id === id);
      if (gone) URL.revokeObjectURL(gone.preview);
      return list.filter((i) => i.id !== id);
    });

  const active = items.filter((i) => i.status !== "error").length;

  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">
        Photos <span className="font-normal text-slate-500">(optional, helps pros quote faster)</span>
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        {items.map((i) => (
          <div key={i.id} className="relative h-20 w-20 overflow-hidden rounded-lg ring-1 ring-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={i.preview} alt="Selected project photo" className={`h-full w-full object-cover ${i.status === "uploading" ? "opacity-50" : ""}`} />
            {i.status === "uploading" && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">Uploading…</span>
            )}
            {i.status === "error" && (
              <span className="absolute inset-0 flex items-center justify-center bg-red-50/90 p-1 text-center text-[10px] font-semibold leading-tight text-red-700">
                {i.error}
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(i.id)}
              className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-white hover:bg-slate-900"
              aria-label="Remove photo"
            >
              <Icon name="x" className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        ))}
        {active < MAX_PHOTOS && (
          <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-brand-500 hover:text-brand-700 focus-within:ring-2 focus-within:ring-brand-200">
            <Icon name="plus" className="h-5 w-5" />
            Add photo
            <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
        )}
      </div>
    </div>
  );
}
