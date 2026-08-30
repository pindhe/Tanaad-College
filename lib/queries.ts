import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe";

const programInclude = { department: { include: { faculty: true } } } as const;
const staffInclude = { department: { include: { faculty: true } } } as const;
const newsInclude = { author: { select: { name: true } } } as const;

export async function getFeaturedPrograms() {
  return safeQuery(
    () =>
      prisma.program.findMany({
        where: { published: true, featured: true },
        include: programInclude,
        take: 6,
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getPublishedPrograms() {
  return safeQuery(
    () =>
      prisma.program.findMany({
        where: { published: true },
        include: programInclude,
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getProgramBySlug(slug: string) {
  return safeQuery(
    () =>
      prisma.program.findFirst({
        where: { slug, published: true },
        include: programInclude,
      }),
    null,
  );
}

export async function getLatestNews(take = 3) {
  return safeQuery(
    () =>
      prisma.news.findMany({
        where: { published: true, publishedAt: { lte: new Date() } },
        include: newsInclude,
        orderBy: { publishedAt: "desc" },
        take,
      }),
    [],
  );
}

export async function getNewsBySlug(slug: string) {
  return safeQuery(
    () =>
      prisma.news.findFirst({
        where: { slug, published: true },
        include: newsInclude,
      }),
    null,
  );
}

export async function getRelatedNews(id: string, category: string) {
  return safeQuery(
    () =>
      prisma.news.findMany({
        where: { published: true, id: { not: id }, category },
        include: newsInclude,
        take: 3,
        orderBy: { publishedAt: "desc" },
      }),
    [],
  );
}

export async function getPublishedTestimonials(take?: number) {
  return safeQuery(
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take,
      }),
    [],
  );
}

export async function getLeadership() {
  return safeQuery(
    () =>
      prisma.staff.findMany({
        where: { published: true, isLeadership: true },
        include: staffInclude,
        orderBy: { displayOrder: "asc" },
      }),
    [],
  );
}

export async function getPublishedStaff(filters: { faculty?: string; department?: string }) {
  return safeQuery(
    () =>
      prisma.staff.findMany({
        where: {
          published: true,
          ...(filters.department ? { departmentId: filters.department } : {}),
          ...(filters.faculty ? { department: { facultyId: filters.faculty } } : {}),
        },
        include: staffInclude,
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getFaculties() {
  return safeQuery(() => prisma.faculty.findMany({ orderBy: { name: "asc" } }), []);
}

export async function getDepartments() {
  return safeQuery(() => prisma.department.findMany({ orderBy: { name: "asc" } }), []);
}

export async function getApplyOptions() {
  const [faculties, departments, programs] = await Promise.all([
    safeQuery(() => prisma.faculty.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }), []),
    safeQuery(
      () => prisma.department.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, facultyId: true } }),
      [],
    ),
    safeQuery(
      () =>
        prisma.program.findMany({
          where: { published: true },
          orderBy: { name: "asc" },
          select: { id: true, name: true, departmentId: true },
        }),
      [],
    ),
  ]);
  return { faculties, departments, programs };
}

export async function getAdmissionDates() {
  return safeQuery(() => prisma.admissionDate.findMany({ orderBy: { date: "asc" } }), []);
}

export async function getPublishedEvents() {
  return safeQuery(
    () =>
      prisma.event.findMany({
        where: { published: true },
        orderBy: { eventDate: "asc" },
      }),
    [],
  );
}

export async function getPublishedGallery() {
  return safeQuery(
    () =>
      prisma.gallery.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      }),
    [],
  );
}

export async function getPublishedFaqs() {
  return safeQuery(() => prisma.fAQ.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } }), []);
}
