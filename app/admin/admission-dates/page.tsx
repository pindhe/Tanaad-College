import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteAdmissionDate, saveAdmissionDate } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdmissionDatesPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.admissionDate.findMany({ orderBy: { date: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Admission Dates</h1>
      <ResourceManager
        fields={[
          { name: "title", label: "Title" },
          { name: "date", label: "Date", type: "date" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        items={items}
        onSave={saveAdmissionDate}
        onDelete={deleteAdmissionDate}
      />
    </div>
  );
}
