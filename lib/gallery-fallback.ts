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
    title: "Graduation Ceremony — Class of 2022",
    image: "/images/imgs/485168610_1341403394101920_3051021275619581611_n.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-2",
    title: "Graduation Ceremony — Classes of 2025",
    image: "/images/imgs/500379155_1405416951033897_5714435640946410489_n.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-3",
    title: "Graduates of Tanaad College",
    image: "/images/imgs/502997519_1408768317365427_6447797780186284108_n.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-4",
    title: "Student Success — Classes of 2026",
    image: "/images/imgs/787743859_1817818439793744_5902861751540954248_n.jpg",
    category: "GRADUATION",
  },
  {
    id: "local-5",
    title: "College Leadership",
    image: "/images/imgs/787904017_1601344154683482_6828865304745958283_n.jpg",
    category: "CAMPUS",
  },
  {
    id: "local-6",
    title: "Students at Ceremony",
    image: "/images/imgs/788259873_122154620546411518_4275986340878532585_n.jpg",
    category: "STUDENTS",
  },
  {
    id: "local-7",
    title: "Faculty Presence",
    image: "/images/imgs/788438777_1601342111350353_4685942073999015040_n.jpg",
    category: "CAMPUS",
  },
  {
    id: "local-8",
    title: "Honor of ICT Award",
    image: "/images/imgs/788901948_1601108978040333_6765133490496336309_n.jpg",
    category: "STUDENTS",
  },
  {
    id: "local-9",
    title: "Graduation Day",
    image: "/images/imgs/790683925_1817997656442489_4589591040991255365_n.jpg",
    category: "GRADUATION",
  },
];

export const GALLERY_HERO_IMAGE = GALLERY_FALLBACK[3].image;
