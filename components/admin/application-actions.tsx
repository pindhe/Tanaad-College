"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateApplication } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationStatus } from "@prisma/client";

export function ApplicationActions({
  id,
  status,
  notes,
}: {
  id: string;
  status: ApplicationStatus;
  notes: string;
}) {
  const [current, setCurrent] = useState(status);
  const [adminNotes, setAdminNotes] = useState(notes);
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    const result = await updateApplication(id, { status: current, adminNotes });
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Application updated successfully.");
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Status
        <select className="mt-2 h-11 w-full rounded-md border px-3" value={current} onChange={(event) => setCurrent(event.target.value as ApplicationStatus)}>
          {["SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "DOCUMENTS_REQUIRED"].map((item) => (
            <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium">
        Admin notes
        <Textarea className="mt-2" value={adminNotes} onChange={(event) => setAdminNotes(event.target.value)} />
      </label>
      <Button onClick={save} disabled={pending}>{pending ? "Saving..." : "Save changes"}</Button>
    </div>
  );
}
