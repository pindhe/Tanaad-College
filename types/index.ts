import type {
  ApplicationStatus,
  ContactStatus,
  GalleryCategory,
  Gender,
  Role,
} from "@prisma/client";

export type { ApplicationStatus, ContactStatus, GalleryCategory, Gender, Role };

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

export interface ProgramCardData {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  image: string | null;
  department: {
    name: string;
    faculty: {
      name: string;
    };
  };
}

export interface NewsCardData {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  author: {
    name: string;
  };
}

export interface EventCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  location: string;
  eventDate: Date;
  eventTime: string;
  registrationLink: string | null;
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

export interface ApplicationStatusResult {
  referenceNumber: string;
  fullName: string;
  status: ApplicationStatus;
  createdAt: Date;
  program: {
    name: string;
  };
}

export interface StudentLifeContent {
  campusLife: string;
  clubs: string;
  sports: string;
  events: string;
  activities: string;
  communityService: string;
}

export type Locale = "en" | "so" | "ar";
