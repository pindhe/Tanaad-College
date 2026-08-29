import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string; filename: string }> },
) {
  const { folder, filename } = await params;
  if (folder.includes("..") || filename.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "storage", "uploads", folder, filename);
  try {
    const data = await readFile(filePath);
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
