import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
};

export function buildMetadata({ title, description, path, image }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/og.jpg");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tanaad College",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    metadataBase: new URL(getSiteUrl()),
  };
}

export function collegeJsonLd(settings: {
  collegeName: string;
  phone: string;
  email: string;
  address: string;
  facebook?: string | null;
  tiktok?: string | null;
}) {
  const sameAs = [settings.facebook, settings.tiktok].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: settings.collegeName,
    url: getSiteUrl(),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Hargeisa",
      addressCountry: "SO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.5624155,
      longitude: 44.0769968,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
