"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContactMessage } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    const result = await submitContactMessage(values);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Message sent successfully.");
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" className="mt-2" placeholder="Your full name" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" className="mt-2" placeholder="you@example.com" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" className="mt-2" placeholder="+252 63 ..." {...form.register("phone")} />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" className="mt-2" placeholder="How can we help?" {...form.register("subject")} />
          {form.formState.errors.subject ? (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.subject.message}</p>
          ) : null}
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          className="mt-2 min-h-36"
          placeholder="Write your message here..."
          {...form.register("message")}
        />
        {form.formState.errors.message ? (
          <p className="mt-1 text-sm text-destructive">{form.formState.errors.message.message}</p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
