import type { GalleryCategory } from "@prisma/client";

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  category: GalleryCategory;
};

/** Local campus photos used when the database has no published gallery items. */
export const GALLERY_FALLBACK: GalleryItem[] = [
  {
    id: "local-1",
    title: "Merit Award Ceremony",
    image: "/images/imgs/20.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-2",
    title: "Graduation Ceremony",
    image: "/images/imgs/11.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-3",
    title: "Graduates of Tanaad College",
    image: "/images/imgs/2.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-4",
    title: "Student Success — Classes of 2026",
    image: "/images/imgs/3.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-5",
    title: "College Event",
    image: "/images/imgs/19.jpg",
    category: "CAMPUS",
  },
  {
    id: "local-6",
    title: "Students at Ceremony",
    image: "/images/imgs/1.jpg",
    category: "STUDENTS",
  },
  {
    id: "local-7",
    title: "Faculty Presence",
    image: "/images/imgs/14.jpeg",
    category: "CAMPUS",
  },
  {
    id: "local-8",
    title: "Honor of ICT",
    image: "/images/imgs/5.jpg",
    category: "STUDENTS",
  },
  {
    id: "local-9",
    title: "Graduation Day",
    image: "/images/imgs/3.jpg",
    category: "GRADUATION",
  },
];

export const GALLERY_HERO_IMAGE = "/images/imgs/11.jpg";
