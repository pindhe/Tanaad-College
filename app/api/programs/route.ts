import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    include: { department: { include: { faculty: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(programs);
}
