import Link from "next/link";
import { auth, signOut } from "@/auth";
import { CollegeLogo } from "@/components/college-logo";
import { adminNav } from "@/lib/permissions";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50">
      {session?.user ? (
        <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
          <aside className="bg-navy p-6 text-white">
            <Link href="/admin" className="flex items-center gap-3">
              <CollegeLogo size="sm" />
              <span className="font-heading text-lg">Tanaad Admin</span>
            </Link>
            <p className="mt-1 text-xs text-white/60">{session.user.role.replaceAll("_", " ")}</p>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Admin">
              {adminNav
                .filter((item) => (item.roles as readonly string[]).includes(session.user.role))
                .map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                    {item.label}
                  </Link>
                ))}
            </nav>
            <form
              className="mt-8"
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <Button type="submit" variant="gold" size="sm">Logout</Button>
            </form>
            <Link href="/" className="mt-4 inline-block text-xs text-white/60 hover:text-white">View website</Link>
          </aside>
          <div className="p-6 lg:p-10">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
