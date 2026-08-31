import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number").optional().or(z.literal("")),
  subject: z.string().min(2, "Subject is required").max(160),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const programSchema = z.object({
  name: z.string().min(2).max(160),
  slug: z.string().min(2).max(180).optional(),
  departmentId: z.string().min(1),
  description: z.string().min(10),
  overview: z.string().optional().or(z.literal("")),
  duration: z.string().min(1),
  requirements: z.string().min(1),
  courses: z.string().optional().or(z.literal("")),
  learningOutcomes: z.string().optional().or(z.literal("")),
  careerOpportunities: z.string().min(1),
  tuition: z.string().min(1),
  image: z.string().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const facultySchema = z.object({
  name: z.string().min(2).max(160),
  description: z.string().min(5),
  image: z.string().optional().or(z.literal("")),
});

export const departmentSchema = z.object({
  name: z.string().min(2).max(160),
  facultyId: z.string().min(1),
  description: z.string().min(5),
});

export const staffSchema = z.object({
  name: z.string().min(2).max(160),
  position: z.string().min(2).max(160),
  departmentId: z.string().optional().or(z.literal("")),
  qualification: z.string().min(2),
  biography: z.string().min(5),
  photo: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  isLeadership: z.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

export const newsSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().optional(),
  category: z.string().min(2).max(80),
  excerpt: z.string().min(10).max(400),
  content: z.string().min(20),
  featuredImage: z.string().optional().or(z.literal("")),
  published: z.boolean().optional(),
  publishedAt: z.string().optional().or(z.literal("")),
});

export const eventSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().optional(),
  description: z.string().min(10),
  image: z.string().optional().or(z.literal("")),
  location: z.string().min(2),
  eventDate: z.string().min(1),
  eventTime: z.string().min(1),
  registrationLink: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(2).max(160),
  image: z.string().min(1),
  category: z.enum([
    "CAMPUS",
    "CLASSROOMS",
    "LABORATORIES",
    "STUDENTS",
    "GRADUATION",
    "EVENTS",
    "SPORTS",
  ]),
  published: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  studentName: z.string().min(2).max(120),
  program: z.string().min(2).max(160),
  graduationYear: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  photo: z.string().optional().or(z.literal("")),
  content: z.string().min(10).max(800),
  rating: z.coerce.number().int().min(1).max(5),
  published: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(5).max(240),
  answer: z.string().min(5),
  category: z.string().min(2).max(80).optional(),
  published: z.boolean().optional(),
});

export const settingsSchema = z.object({
  collegeName: z.string().min(2),
  logo: z.string().optional().or(z.literal("")),
  favicon: z.string().optional().or(z.literal("")),
  heroTitle: z.string().min(2),
  heroDescription: z.string().min(2),
  heroImage: z.string().optional().or(z.literal("")),
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  whatsapp: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  tiktok: z.string().optional().or(z.literal("")),
  youtube: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  googleMapsUrl: z.string().optional().or(z.literal("")),
  aboutText: z.string().min(1),
  historyText: z.string().min(1),
  vision: z.string().min(1),
  mission: z.string().min(1),
  officeHours: z.string().min(1),
  statsStudents: z.coerce.number().int().min(0),
  statsLecturers: z.coerce.number().int().min(0),
  statsPrograms: z.coerce.number().int().min(0),
  statsYears: z.coerce.number().int().min(0),
  studentLifeContent: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).optional().or(z.literal("")),
  role: z.enum(["SUPER_ADMIN", "CONTENT_MANAGER", "ADMISSIONS_OFFICER"]),
});

export const applicationStatusUpdateSchema = z.object({
  status: z.enum([
    "SUBMITTED",
    "UNDER_REVIEW",
    "ACCEPTED",
    "REJECTED",
    "DOCUMENTS_REQUIRED",
  ]),
  adminNotes: z.string().max(2000).optional().or(z.literal("")),
});

export const admissionDateSchema = z.object({
  title: z.string().min(2).max(160),
  date: z.string().min(1),
  description: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProgramInput = z.infer<typeof programSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
