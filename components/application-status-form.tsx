"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationStatusSchema } from "@/lib/validations";
import { checkApplicationStatus } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

type Values = z.infer<typeof applicationStatusSchema>;

export function ApplicationStatusForm() {
  const [result, setResult] = useState<{
    referenceNumber: string;
    fullName: string;
    status: string;
    createdAt: string;
    program: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(applicationStatusSchema),
    defaultValues: { referenceNumber: "", contact: "" },
  });

  async function onSubmit(values: Values) {
    setError(null);
    const response = await checkApplicationStatus(values);
    if (!response.ok) {
      setResult(null);
      setError(response.error);
      return;
    }
    setResult(response.result);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div>
          <Label htmlFor="referenceNumber">Application reference number</Label>
          <Input id="referenceNumber" className="mt-2" placeholder="TC-2026-00001" {...form.register("referenceNumber")} />
        </div>
        <div>
          <Label htmlFor="contact">Phone or email</Label>
          <Input id="contact" className="mt-2" {...form.register("contact")} />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Checking..." : "Check Status"}
        </Button>
      </form>
      {result ? (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl">Application status</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt>Applicant</dt><dd className="font-semibold">{result.fullName}</dd></div>
            <div className="flex justify-between gap-4"><dt>Program</dt><dd className="font-semibold">{result.program}</dd></div>
            <div className="flex justify-between gap-4"><dt>Submitted</dt><dd className="font-semibold">{new Date(result.createdAt).toLocaleDateString()}</dd></div>
            <div className="flex justify-between gap-4"><dt>Status</dt><dd className="font-semibold">{result.status.replaceAll("_", " ")}</dd></div>
          </dl>
        </div>
      ) : null}
    </div>
  );
}
