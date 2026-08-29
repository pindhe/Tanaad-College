"use client";

import { toast } from "sonner";
import { markMessage } from "@/actions/admin";
import { Button } from "@/components/ui/button";

export function MessageActions({ id }: { id: string }) {
  async function update(status: "READ" | "REPLIED" | "ARCHIVED") {
    const result = await markMessage(id, status);
    if (!result.ok) toast.error(result.error);
    else toast.success("Message updated.");
  }

  return (
    <div className="mt-4 flex gap-2">
      <Button size="sm" variant="outline" onClick={() => update("READ")}>Mark read</Button>
      <Button size="sm" variant="outline" onClick={() => update("REPLIED")}>Mark replied</Button>
      <Button size="sm" variant="outline" onClick={() => update("ARCHIVED")}>Archive</Button>
    </div>
  );
}
