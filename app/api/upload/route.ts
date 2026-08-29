import { NextResponse } from "next/server";
import { uploadToStorage, validateUpload } from "@/lib/cloudinary";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(`upload:${clientIp(request.headers)}`, 20, 60_000);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many uploads." }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "general");
  const kind = formData.get("kind") === "document" ? "document" : "image";
  const privateAsset = formData.get("private") === "true";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const validation = validateUpload(file, kind);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const url = await uploadToStorage(file, { folder, privateAsset });
  return NextResponse.json({ url });
}
