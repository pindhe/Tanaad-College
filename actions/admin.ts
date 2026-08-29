"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, canManageContent, canManageAdmissions, canManageUsers } from "@/lib/auth";
import {
  admissionDateSchema,
  applicationStatusUpdateSchema,
  departmentSchema,
  eventSchema,
  facultySchema,
  faqSchema,
  gallerySchema,
  newsSchema,
  programSchema,
  settingsSchema,
  staffSchema,
  testimonialSchema,
  userSchema,
} from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { sendApplicationStatusEmail } from "@/lib/email";

function revalidatePublic() {
  revalidatePath("/", "layout");
}

export async function saveFaculty(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = facultySchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { ...parsed.data, slug: slugify(parsed.data.name), image: parsed.data.image || null };
  if (id) await prisma.faculty.update({ where: { id }, data });
  else await prisma.faculty.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteFaculty(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.faculty.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveDepartment(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = departmentSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { ...parsed.data, slug: slugify(parsed.data.name) };
  if (id) await prisma.department.update({ where: { id }, data });
  else await prisma.department.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteDepartment(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.department.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveProgram(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = programSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = {
    ...parsed.data,
    slug: parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.name),
    image: parsed.data.image || null,
    featured: parsed.data.featured ?? false,
    published: parsed.data.published ?? false,
  };
  if (id) await prisma.program.update({ where: { id }, data });
  else await prisma.program.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteProgram(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.program.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveStaff(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = staffSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = {
    ...parsed.data,
    departmentId: parsed.data.departmentId || null,
    photo: parsed.data.photo || null,
    email: parsed.data.email || null,
    isLeadership: parsed.data.isLeadership ?? false,
    published: parsed.data.published ?? true,
    displayOrder: parsed.data.displayOrder ?? 0,
  };
  if (id) await prisma.staff.update({ where: { id }, data });
  else await prisma.staff.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteStaff(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.staff.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveNews(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = newsSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const publishedAt = parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : parsed.data.published ? new Date() : null;
  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.title),
    category: parsed.data.category,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    featuredImage: parsed.data.featuredImage || null,
    published: parsed.data.published ?? false,
    publishedAt,
    authorId: user.id,
  };
  if (id) await prisma.news.update({ where: { id }, data });
  else await prisma.news.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteNews(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.news.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveEvent(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = {
    ...parsed.data,
    slug: parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.title),
    image: parsed.data.image || null,
    registrationLink: parsed.data.registrationLink || null,
    eventDate: new Date(parsed.data.eventDate),
    published: parsed.data.published ?? false,
  };
  if (id) await prisma.event.update({ where: { id }, data });
  else await prisma.event.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteEvent(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.event.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveGallery(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = gallerySchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { ...parsed.data, published: parsed.data.published ?? true };
  if (id) await prisma.gallery.update({ where: { id }, data });
  else await prisma.gallery.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteGallery(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.gallery.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveTestimonial(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { ...parsed.data, photo: parsed.data.photo || null, published: parsed.data.published ?? false };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteTestimonial(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.testimonial.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveFaq(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = faqSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { ...parsed.data, category: parsed.data.category ?? "General", published: parsed.data.published ?? false };
  if (id) await prisma.fAQ.update({ where: { id }, data });
  else await prisma.fAQ.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteFaq(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.fAQ.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveSettings(input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: parsed.data,
    create: { id: "default", ...parsed.data },
  });
  revalidatePublic();
  return { ok: true as const };
}

export async function saveAdmissionDate(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = admissionDateSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const data = { title: parsed.data.title, date: new Date(parsed.data.date), description: parsed.data.description || null };
  if (id) await prisma.admissionDate.update({ where: { id }, data });
  else await prisma.admissionDate.create({ data });
  revalidatePublic();
  return { ok: true as const };
}

export async function deleteAdmissionDate(id: string) {
  const user = await requireAdmin();
  if (!canManageContent(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.admissionDate.delete({ where: { id } });
  revalidatePublic();
  return { ok: true as const };
}

export async function updateApplication(id: string, input: unknown) {
  const user = await requireAdmin();
  if (!canManageAdmissions(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = applicationStatusUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const application = await prisma.application.update({
    where: { id },
    data: { status: parsed.data.status, adminNotes: parsed.data.adminNotes || null },
  });
  await sendApplicationStatusEmail({
    to: application.email,
    name: application.fullName,
    referenceNumber: application.referenceNumber,
    status: application.status,
  });
  revalidatePath("/admin/applications");
  return { ok: true as const };
}

export async function markMessage(id: string, status: "READ" | "REPLIED" | "ARCHIVED") {
  const user = await requireAdmin();
  if (!canManageAdmissions(user.role)) return { ok: false as const, error: "Not allowed." };
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin/messages");
  return { ok: true as const };
}

export async function saveUser(id: string | undefined, input: unknown) {
  const user = await requireAdmin();
  if (!canManageUsers(user.role)) return { ok: false as const, error: "Not allowed." };
  const parsed = userSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  if (!id && !parsed.data.password) return { ok: false as const, error: "Password is required." };
  const data = {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    role: parsed.data.role,
    ...(parsed.data.password ? { password: await bcrypt.hash(parsed.data.password, 12) } : {}),
  };
  if (id) await prisma.user.update({ where: { id }, data });
  else await prisma.user.create({ data: { ...data, password: data.password ?? "" } });
  revalidatePath("/admin/users");
  return { ok: true as const };
}

export async function deleteUser(id: string) {
  const user = await requireAdmin();
  if (!canManageUsers(user.role)) return { ok: false as const, error: "Not allowed." };
  if (user.id === id) return { ok: false as const, error: "You cannot delete your own account." };
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  return { ok: true as const };
}
