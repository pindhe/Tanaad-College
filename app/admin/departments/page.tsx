import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteDepartment, saveDepartment } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DepartmentsPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const [items, faculties] = await Promise.all([
    prisma.department.findMany({ include: { faculty: true }, orderBy: { name: "asc" } }),
    prisma.faculty.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Departments</h1>
      <ResourceManager
        fields={[
          { name: "name", label: "Name" },
          { name: "facultyId", label: "Faculty", type: "select", options: faculties.map((item) => ({ value: item.id, label: item.name })) },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        items={items}
        onSave={saveDepartment}
        onDelete={deleteDepartment}
      />
    </div>
  );
}
