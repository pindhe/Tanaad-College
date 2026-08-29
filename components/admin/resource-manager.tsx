"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "select" | "checkbox" | "url" | "email";
  options?: Array<{ value: string; label: string }>;
};

type Item = Record<string, unknown>;

export function ResourceManager({
  fields,
  items,
  onSave,
  onDelete,
}: {
  fields: Field[];
  items: Array<Item & { id: string }>;
  onSave: (id: string | undefined, values: Record<string, unknown>) => Promise<{ ok: boolean; error?: string }>;
  onDelete?: (id: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const empty = Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""]));
  const [values, setValues] = useState<Record<string, unknown>>(empty);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  function load(item: Item & { id: string }) {
    setEditingId(item.id);
    setValues(
      Object.fromEntries(
        fields.map((field) => {
          const value = item[field.name];
          if (field.type === "date" && value) return [field.name, String(value).slice(0, 10)];
          return [field.name, value ?? (field.type === "checkbox" ? false : "")];
        }),
      ),
    );
  }

  async function save() {
    setPending(true);
    const result = await onSave(editingId, values);
    setPending(false);
    if (!result.ok) {
      toast.error(result.error ?? "Could not save.");
      return;
    }
    toast.success("Saved successfully.");
    setEditingId(undefined);
    setValues(empty);
  }

  async function uploadImage(field: string, file: File) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "admin");
    data.append("kind", "image");
    const response = await fetch("/api/upload", { method: "POST", body: data });
    const json = (await response.json()) as { url?: string; error?: string };
    if (!json.url) {
      toast.error(json.error ?? "Upload failed");
      return;
    }
    setValues((current) => ({ ...current, [field]: json.url }));
    toast.success("Image uploaded");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <form
        className="space-y-3 rounded-xl border bg-white p-5"
        onSubmit={(event) => {
          event.preventDefault();
          void save();
        }}
      >
        <h2 className="text-lg">{editingId ? "Edit record" : "Create record"}</h2>
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium">
            {field.label}
            {field.type === "textarea" ? (
              <Textarea className="mt-2" value={String(values[field.name] ?? "")} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} />
            ) : field.type === "select" ? (
              <select className="mt-2 h-11 w-full rounded-md border px-3" value={String(values[field.name] ?? "")} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}>
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="mt-2"><Switch checked={Boolean(values[field.name])} onCheckedChange={(checked) => setValues((current) => ({ ...current, [field.name]: checked }))} /></div>
            ) : field.name.toLowerCase().includes("image") || field.name === "photo" || field.name === "logo" || field.name === "favicon" ? (
              <div className="mt-2 space-y-2">
                <Input value={String(values[field.name] ?? "")} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} />
                <Input type="file" accept="image/jpeg,image/png" onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadImage(field.name, file);
                }} />
              </div>
            ) : (
              <Input
                className="mt-2"
                type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "email" ? "email" : "text"}
                value={String(values[field.name] ?? "")}
                onChange={(event) => setValues((current) => ({ ...current, [field.name]: field.type === "number" ? Number(event.target.value) : event.target.value }))}
              />
            )}
          </label>
        ))}
        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
          <Button type="button" variant="outline" onClick={() => { setEditingId(undefined); setValues(empty); }}>Reset</Button>
        </div>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4">
            <div>
              <p className="font-semibold">{String(item.name ?? item.title ?? item.question ?? item.studentName ?? item.email ?? item.id)}</p>
              <p className="text-sm text-muted-foreground">
                {typeof item.description === "string" || typeof item.excerpt === "string" || typeof item.answer === "string" || typeof item.status === "string"
                  ? String(item.description ?? item.excerpt ?? item.answer ?? item.status)
                  : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => load(item)}>Edit</Button>
              {onDelete ? (
                <Button size="sm" variant="destructive" onClick={async () => {
                  const result = await onDelete(item.id);
                  if (!result.ok) toast.error(result.error ?? "Could not delete.");
                  else toast.success("Deleted.");
                }}>Delete</Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
