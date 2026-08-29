import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteGallery, saveGallery } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function GalleryAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.gallery.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Gallery</h1>
      <ResourceManager
        fields={[
          { name: "title", label: "Title" },
          { name: "image", label: "Image" },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: ["CAMPUS", "CLASSROOMS", "LABORATORIES", "STUDENTS", "GRADUATION", "EVENTS", "SPORTS"].map((value) => ({ value, label: value })),
          },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveGallery}
        onDelete={deleteGallery}
      />
    </div>
  );
}
