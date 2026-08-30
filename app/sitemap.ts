import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/faculty",
    "/gallery",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
  }));

  return staticRoutes;
}
