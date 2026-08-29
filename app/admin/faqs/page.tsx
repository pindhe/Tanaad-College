import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteFaq, saveFaq } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FaqsAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.fAQ.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">FAQs</h1>
      <ResourceManager
        fields={[
          { name: "question", label: "Question" },
          { name: "answer", label: "Answer", type: "textarea" },
          { name: "category", label: "Category" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveFaq}
        onDelete={deleteFaq}
      />
    </div>
  );
}
