import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteNews, saveNews } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function NewsAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">News</h1>
      <ResourceManager
        fields={[
          { name: "title", label: "Title" },
          { name: "category", label: "Category" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "featuredImage", label: "Featured image" },
          { name: "publishedAt", label: "Publish date", type: "date" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveNews}
        onDelete={deleteNews}
      />
    </div>
  );
}
