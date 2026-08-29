import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
