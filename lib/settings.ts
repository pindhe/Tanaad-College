import { prisma } from "@/lib/prisma";
import type { SiteSettingsData } from "@/types";

const fallback: SiteSettingsData = {
  id: "default",
  collegeName: "Tanaad College",
  logo: null,
  favicon: null,
  heroTitle: "Build Your Future With Tanaad College",
  heroDescription: "Quality education, practical skills, and a brighter future start here.",
  heroImage: null,
  phone: "[Official Phone]",
  email: "[Official Email]",
  address: "[Official Address]",
  whatsapp: "",
  facebook: null,
  instagram: null,
  tiktok: null,
  youtube: null,
  linkedin: null,
  googleMapsUrl: null,
  aboutText: "[Official About]",
  historyText: "[Official History]",
  vision: "[Official Vision]",
  mission: "[Official Mission]",
  officeHours: "[Official Office Hours]",
  statsStudents: 0,
  statsLecturers: 0,
  statsPrograms: 0,
  statsYears: 0,
  studentLifeContent: "{}",
};

export async function getSettings(): Promise<SiteSettingsData> {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: { id: "default" },
    });
    return settings;
  } catch {
    return fallback;
  }
}
