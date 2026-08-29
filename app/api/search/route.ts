import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = searchSchema.safeParse({ q: searchParams.get("q") ?? "" });
  if (!parsed.success) {
    return NextResponse.json({ error: "Query is required." }, { status: 400 });
  }

  const q = parsed.data.q;
  const [programs, news, events, staff] = await Promise.all([
    prisma.program.findMany({
      where: { published: true, name: { contains: q, mode: "insensitive" } },
      take: 8,
    }),
    prisma.news.findMany({
      where: { published: true, title: { contains: q, mode: "insensitive" } },
      take: 8,
    }),
    prisma.event.findMany({
      where: { published: true, title: { contains: q, mode: "insensitive" } },
      take: 8,
    }),
    prisma.staff.findMany({
      where: { published: true, name: { contains: q, mode: "insensitive" } },
      take: 8,
    }),
  ]);

  return NextResponse.json({ programs, news, events, staff });
}
