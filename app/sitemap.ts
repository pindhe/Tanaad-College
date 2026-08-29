import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let programs: Array<{ slug: string; updatedAt: Date }> = [];
  let news: Array<{ slug: string; updatedAt: Date }> = [];
  try {
    [programs, news] = await Promise.all([
      prisma.program.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.news.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);
  } catch {
    programs = [];
    news = [];
  }

  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/admissions",
    "/apply",
    "/application-status",
    "/faculty",
    "/student-life",
    "/news",
    "/events",
    "/gallery",
    "/faq",
    "/contact",
    "/search",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...programs.map((item) => ({ url: absoluteUrl(`/programs/${item.slug}`), lastModified: item.updatedAt })),
    ...news.map((item) => ({ url: absoluteUrl(`/news/${item.slug}`), lastModified: item.updatedAt })),
  ];
}
