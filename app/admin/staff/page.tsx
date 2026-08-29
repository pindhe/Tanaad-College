import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteStaff, saveStaff } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StaffAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const [items, departments] = await Promise.all([
    prisma.staff.findMany({ include: { department: true }, orderBy: { name: "asc" } }),
    prisma.department.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Staff</h1>
      <ResourceManager
        fields={[
          { name: "name", label: "Name" },
          { name: "position", label: "Position" },
          { name: "departmentId", label: "Department", type: "select", options: departments.map((item) => ({ value: item.id, label: item.name })) },
          { name: "qualification", label: "Qualification" },
          { name: "biography", label: "Biography", type: "textarea" },
          { name: "photo", label: "Photo" },
          { name: "email", label: "Email", type: "email" },
          { name: "isLeadership", label: "Leadership", type: "checkbox" },
          { name: "displayOrder", label: "Display order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveStaff}
        onDelete={deleteStaff}
      />
    </div>
  );
}
