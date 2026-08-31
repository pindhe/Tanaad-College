import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe";

const staffInclude = { department: { include: { faculty: true } } } as const;

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
