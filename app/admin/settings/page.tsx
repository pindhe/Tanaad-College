import { ResourceManager } from "@/components/admin/resource-manager";
import { saveSettings } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export default async function SettingsPage() {
  await requireAdmin(["SUPER_ADMIN", "CONTENT_MANAGER"]);
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Site Settings</h1>
      <p className="text-sm text-muted-foreground">These values control the public website. Replace placeholder official information with verified college details.</p>
      <ResourceManager
        fields={[
          { name: "collegeName", label: "College name" },
          { name: "logo", label: "Logo" },
          { name: "favicon", label: "Favicon" },
          { name: "heroTitle", label: "Hero title" },
          { name: "heroDescription", label: "Hero description", type: "textarea" },
          { name: "heroImage", label: "Hero image" },
          { name: "phone", label: "Phone" },
          { name: "email", label: "Email", type: "email" },
          { name: "address", label: "Address" },
          { name: "whatsapp", label: "WhatsApp" },
          { name: "facebook", label: "Facebook" },
          { name: "instagram", label: "Instagram" },
          { name: "tiktok", label: "TikTok" },
          { name: "youtube", label: "YouTube" },
          { name: "linkedin", label: "LinkedIn" },
          { name: "googleMapsUrl", label: "Google Maps embed URL" },
          { name: "aboutText", label: "About text", type: "textarea" },
          { name: "historyText", label: "History", type: "textarea" },
          { name: "vision", label: "Vision", type: "textarea" },
          { name: "mission", label: "Mission", type: "textarea" },
          { name: "officeHours", label: "Office hours" },
          { name: "statsStudents", label: "Students stat", type: "number" },
          { name: "statsLecturers", label: "Lecturers stat", type: "number" },
          { name: "statsPrograms", label: "Programs stat", type: "number" },
          { name: "statsYears", label: "Years stat", type: "number" },
          { name: "studentLifeContent", label: "Student life JSON", type: "textarea" },
        ]}
        items={[settings as unknown as Record<string, unknown> & { id: string }]}
        onSave={async (_id, values) => saveSettings(values)}
      />
    </div>
  );
}
