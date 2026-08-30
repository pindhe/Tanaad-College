import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { GALLERY_FALLBACK, GALLERY_HERO_IMAGE, type GalleryItem } from "@/lib/gallery-fallback";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedGallery } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Graduation, student, and campus photographs from Tanaad College.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const published = await getPublishedGallery();
  const items: GalleryItem[] =
    published.length > 0
      ? published.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          category: item.category,
        }))
      : GALLERY_FALLBACK;

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Moments from graduation ceremonies, student achievement, and campus life at Tanaad College."
        image={GALLERY_HERO_IMAGE}
      />

      <Section>
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Visual story</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Life at Tanaad College</h2>
          <p className="mt-4 text-muted-foreground">
            Browse photos from our community — filter by category or open any image for a closer look.
          </p>
        </div>
        <GalleryGrid items={items} />
      </Section>

      <CtaSection
        title="See the college in person"
        description="Visit campus or contact us to learn more about Tanaad College and our ICT programs."
        actionLabel="Contact us"
        href="/contact"
      />
    </>
  );
}
