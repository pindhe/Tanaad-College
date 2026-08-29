import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteFaculty, saveFaculty } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FacultiesPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.faculty.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Faculties</h1>
      <ResourceManager
        fields={[
          { name: "name", label: "Name" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image" },
        ]}
        items={items}
        onSave={saveFaculty}
        onDelete={deleteFaculty}
      />
    </div>
  );
}
