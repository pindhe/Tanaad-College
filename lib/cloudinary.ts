import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
]);

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function validateUpload(
  file: File,
  kind: "image" | "document",
): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: "Only JPG, JPEG, PNG, and PDF files are allowed." };
  }

  if (kind === "image" && file.type === "application/pdf") {
    return { ok: false, error: "Images must be JPG or PNG." };
  }

  const max = kind === "image" ? MAX_IMAGE_BYTES : MAX_DOCUMENT_BYTES;
  if (file.size > max) {
    return {
      ok: false,
      error: `File is too large. Maximum size is ${Math.round(max / (1024 * 1024))}MB.`,
    };
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const allowedExt = kind === "image" ? ["jpg", "jpeg", "png"] : ["jpg", "jpeg", "png", "pdf"];
  if (!ext || !allowedExt.includes(ext)) {
    return { ok: false, error: "Invalid file extension." };
  }

  return { ok: true };
}

async function uploadLocal(buffer: Buffer, mime: string, folder: string): Promise<string> {
  const ext = EXTENSIONS[mime] ?? "bin";
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "storage", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/api/files/${folder}/${filename}`;
}

export async function uploadToStorage(
  file: File,
  options: { folder: string; privateAsset?: boolean },
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (!isCloudinaryConfigured()) {
    return uploadLocal(buffer, file.type, options.folder);
  }

  const resourceType = file.type === "application/pdf" ? "raw" : "image";
  const folder = `tanaad-college/${options.folder}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        type: options.privateAsset ? "authenticated" : "upload",
        use_filename: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}
