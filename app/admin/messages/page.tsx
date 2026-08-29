import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatShortDate } from "@/lib/utils";
import { MessageActions } from "@/components/admin/message-actions";

export default async function MessagesPage() {
  await requireAdmin(["SUPER_ADMIN", "ADMISSIONS_OFFICER"]);
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Messages</h1>
      <div className="space-y-4">
        {messages.map((item) => (
          <article key={item.id} className="rounded-xl border bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg">{item.subject}</h2>
                <p className="text-sm text-muted-foreground">{item.name} · {item.email} · {item.phone ?? "No phone"} · {formatShortDate(item.createdAt)}</p>
              </div>
              <span className="text-xs font-semibold uppercase">{item.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6">{item.message}</p>
            <MessageActions id={item.id} />
          </article>
        ))}
        {messages.length === 0 ? <p className="text-muted-foreground">No messages yet.</p> : null}
      </div>
    </div>
  );
}
