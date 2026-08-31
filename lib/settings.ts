import { COLLEGE_LOGO_PATH, OFFICIAL_LINKS } from "@/lib/brand";
import { isDatabaseAvailable, markDatabaseUnavailable } from "@/lib/db-status";
import { prisma } from "@/lib/prisma";
import type { SiteSettingsData } from "@/types";

const fallback: SiteSettingsData = {
  id: "default",
  collegeName: "Tanaad College",
  logo: COLLEGE_LOGO_PATH,
  favicon: COLLEGE_LOGO_PATH,
  heroTitle: "Build Your Future With Tanaad College",
  heroDescription: "Center of Leading IT & Technology in Hargeisa. Quality teaching, practical digital skills, and pathways into technology careers.",
  heroImage: "/images/imgs/11.jpg",
  phone: "+252 63 8555522",
  email: "tanaadcollege@gmail.com",
  address: "Near Telesom Headquarters, Hargeisa, Somalia",
  whatsapp: "+252638555522",
  facebook: OFFICIAL_LINKS.facebook,
  instagram: null,
  tiktok: OFFICIAL_LINKS.tiktok,
  youtube: null,
  linkedin: null,
  googleMapsUrl: OFFICIAL_LINKS.googleMapsEmbed,
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
  if (!(await isDatabaseAvailable())) {
    return fallback;
  }

  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: { id: "default" },
    });
    return {
      ...settings,
      logo: settings.logo || COLLEGE_LOGO_PATH,
      favicon: settings.favicon || COLLEGE_LOGO_PATH,
    };
  } catch {
    markDatabaseUnavailable();
    return fallback;
  }
}
