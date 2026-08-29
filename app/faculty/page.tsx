import { FacultyFilters } from "@/components/faculty-filters";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Faculty",
  description: "Meet lecturers and academic staff at Tanaad College.",
  path: "/faculty",
});

export default async function FacultyPage({
  searchParams,
}: {
  searchParams: Promise<{ faculty?: string; department?: string }>;
}) {
  const params = await searchParams;
  const [faculties, departments, staff] = await Promise.all([
    prisma.faculty.findMany({ orderBy: { name: "asc" } }),
    prisma.department.findMany({ orderBy: { name: "asc" } }),
    prisma.staff.findMany({
      where: {
        published: true,
        ...(params.department ? { departmentId: params.department } : {}),
        ...(params.faculty
          ? { department: { facultyId: params.faculty } }
          : {}),
      },
      include: { department: { include: { faculty: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <>
      <PageHeader title="Faculty" description="Lecturers and academic staff listed by department." />
      <Section>
        <FacultyFilters
          faculties={faculties.map((item) => ({ id: item.id, name: item.name }))}
          departments={departments.map((item) => ({ id: item.id, name: item.name, facultyId: item.facultyId }))}
          selectedFaculty={params.faculty}
          selectedDepartment={params.department}
          staff={staff}
        />
      </Section>
    </>
  );
}
