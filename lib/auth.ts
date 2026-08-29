import { auth } from "@/auth";
import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAdmin(roles?: Role[]) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (roles && !roles.includes(user.role)) {
    redirect("/admin");
  }
  return user;
}

export function canManageContent(role: Role): boolean {
  return role === "SUPER_ADMIN" || role === "CONTENT_MANAGER";
}

export function canManageAdmissions(role: Role): boolean {
  return role === "SUPER_ADMIN" || role === "ADMISSIONS_OFFICER";
}

export function canManageUsers(role: Role): boolean {
  return role === "SUPER_ADMIN";
}

export function canManageSettings(role: Role): boolean {
  return role === "SUPER_ADMIN" || role === "CONTENT_MANAGER";
}
