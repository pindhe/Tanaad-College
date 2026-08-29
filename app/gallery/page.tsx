import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Campus, classroom, and student life photographs from Tanaad College.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await prisma.gallery.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader title="Gallery" description="A visual look at campus life." />
      <Section>
        <GalleryGrid items={items} />
      </Section>
    </>
  );
}
