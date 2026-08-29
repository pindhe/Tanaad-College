import { prisma } from "@/lib/prisma";

export async function generateReferenceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `TC-${year}-`;

  const latest = await prisma.application.findFirst({
    where: { referenceNumber: { startsWith: prefix } },
    orderBy: { referenceNumber: "desc" },
    select: { referenceNumber: true },
  });

  const next = latest ? Number(latest.referenceNumber.slice(prefix.length)) + 1 : 1;
  return `${prefix}${String(next).padStart(5, "0")}`;
}
