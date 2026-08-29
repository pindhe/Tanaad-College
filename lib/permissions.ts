import type { Role } from "@prisma/client";

export const adminNav = [
  { href: "/admin", label: "Dashboard", roles: ["SUPER_ADMIN", "CONTENT_MANAGER", "ADMISSIONS_OFFICER"] },
  { href: "/admin/applications", label: "Applications", roles: ["SUPER_ADMIN", "ADMISSIONS_OFFICER"] },
  { href: "/admin/programs", label: "Programs", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/faculties", label: "Faculties", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/departments", label: "Departments", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/staff", label: "Staff", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/news", label: "News", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/events", label: "Events", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/gallery", label: "Gallery", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/testimonials", label: "Testimonials", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/faqs", label: "FAQs", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/messages", label: "Messages", roles: ["SUPER_ADMIN", "ADMISSIONS_OFFICER"] },
  { href: "/admin/admission-dates", label: "Admission Dates", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/settings", label: "Settings", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/users", label: "Users", roles: ["SUPER_ADMIN"] },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  roles: Role[];
}>;
