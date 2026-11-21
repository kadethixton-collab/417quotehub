import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024; // the browser compresses photos to well under this

/** Confirm the bytes really are a JPEG, PNG, or WebP image (not just the claimed type). */
function sniff(b: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50)
    return "image/webp";
  return null;
}

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: "Photo uploads aren't enabled." }, { status: 503 });
  }
  if (rateLimited(req, "photo", 12, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many uploads. Please wait a few minutes." }, { status: 429 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    file = f instanceof File ? f : null;
  } catch {
    /* fall through */
  }
  if (!file) return NextResponse.json({ ok: false, error: "No photo received." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "That photo is too large." }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniff(bytes);
  if (!type) return NextResponse.json({ ok: false, error: "Please upload a JPG, PNG, or WebP photo." }, { status: 415 });

  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
  const month = new Date().toISOString().slice(0, 7);
  try {
    const blob = await put(`lead-photos/${month}/${crypto.randomUUID()}.${ext}`, Buffer.from(bytes), {
      access: "public",
      contentType: type,
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("[photo] upload failed:", err);
    return NextResponse.json({ ok: false, error: "Upload failed. Please try again." }, { status: 502 });
  }
}
