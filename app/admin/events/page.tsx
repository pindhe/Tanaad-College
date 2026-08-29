import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteEvent, saveEvent } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EventsAdminPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const items = await prisma.event.findMany({ orderBy: { eventDate: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Events</h1>
      <ResourceManager
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image" },
          { name: "location", label: "Location" },
          { name: "eventDate", label: "Date", type: "date" },
          { name: "eventTime", label: "Time" },
          { name: "registrationLink", label: "Registration URL" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        items={items}
        onSave={saveEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}
