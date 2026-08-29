import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMISSIONS_OFFICER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const applications = await prisma.application.findMany({
    where: {
      ...(searchParams.get("status") ? { status: searchParams.get("status") as never } : {}),
      ...(searchParams.get("program") ? { programId: searchParams.get("program") ?? undefined } : {}),
    },
    include: { program: true },
    orderBy: { createdAt: "desc" },
  });

  const header = ["Reference", "Name", "Email", "Phone", "Program", "Status", "Submitted"];
  const rows = applications.map((item) => [
    item.referenceNumber,
    item.fullName,
    item.email,
    item.phone,
    item.program.name,
    item.status,
    item.createdAt.toISOString(),
  ]);
  const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=applications.csv",
    },
  });
}
