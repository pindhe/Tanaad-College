import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteTestimonial, saveTestimonial } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function TestimonialsAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Testimonials</h1>
      <ResourceManager
        fields={[
          { name: "studentName", label: "Student name" },
          { name: "program", label: "Program" },
          { name: "graduationYear", label: "Graduation year", type: "number" },
          { name: "photo", label: "Photo" },
          { name: "content", label: "Testimonial", type: "textarea" },
          { name: "rating", label: "Rating", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveTestimonial}
        onDelete={deleteTestimonial}
      />
    </div>
  );
}
