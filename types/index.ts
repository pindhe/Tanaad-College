import type {
  ContactStatus,
  GalleryCategory,
  Gender,
  Role,
} from "@prisma/client";

export type { ContactStatus, GalleryCategory, Gender, Role };

export interface SiteSettingsData {
  id: string;
  collegeName: string;
  logo: string | null;
  favicon: string | null;
  heroTitle: string;
  heroDescription: string;
  heroImage: string | null;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
  googleMapsUrl: string | null;
  aboutText: string;
  historyText: string;
  vision: string;
  mission: string;
  officeHours: string;
  statsStudents: number;
  statsLecturers: number;
  statsPrograms: number;
  statsYears: number;
  studentLifeContent: string;
}

export interface StaffCardData {
  id: string;
  name: string;
  position: string;
  qualification: string;
  biography: string;
  photo: string | null;
  email: string | null;
  department: {
    name: string;
    faculty: {
      name: string;
    };
  } | null;
}

export interface TestimonialData {
  id: string;
  studentName: string;
  program: string;
  graduationYear: number;
  photo: string | null;
  content: string;
  rating: number;
}

export type Locale = "en" | "so" | "ar";
