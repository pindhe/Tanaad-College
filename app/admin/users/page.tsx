import { ResourceManager } from "@/components/admin/resource-manager";
import { deleteUser, saveUser } from "@/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function UsersAdminPage() {
  await requireAdmin(["SUPER_ADMIN"]);
  const items = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Users</h1>
      <ResourceManager
        fields={[
          { name: "name", label: "Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password" },
          {
            name: "role",
            label: "Role",
            type: "select",
            options: [
              { value: "SUPER_ADMIN", label: "Super Admin" },
              { value: "CONTENT_MANAGER", label: "Content Manager" },
              { value: "ADMISSIONS_OFFICER", label: "Admissions Officer" },
            ],
          },
        ]}
        items={items.map((item) => ({ ...item, password: "" }))}
        onSave={saveUser}
        onDelete={deleteUser}
      />
    </div>
  );
}
