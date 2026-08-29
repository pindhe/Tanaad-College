import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteProgram, saveProgram } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProgramsAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const [items, departments] = await Promise.all([
    prisma.program.findMany({ include: { department: true }, orderBy: { name: "asc" } }),
    prisma.department.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Programs</h1>
      <ResourceManager
        fields={[
          { name: "name", label: "Name" },
          { name: "departmentId", label: "Department", type: "select", options: departments.map((item) => ({ value: item.id, label: item.name })) },
          { name: "description", label: "Short description", type: "textarea" },
          { name: "overview", label: "Overview", type: "textarea" },
          { name: "duration", label: "Duration" },
          { name: "requirements", label: "Requirements", type: "textarea" },
          { name: "courses", label: "Courses", type: "textarea" },
          { name: "learningOutcomes", label: "Learning outcomes", type: "textarea" },
          { name: "careerOpportunities", label: "Career opportunities", type: "textarea" },
          { name: "tuition", label: "Tuition" },
          { name: "image", label: "Image" },
          { name: "featured", label: "Featured", type: "checkbox" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveProgram}
        onDelete={deleteProgram}
      />
    </div>
  );
}
