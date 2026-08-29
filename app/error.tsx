"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-primary">500</p>
      <h1 className="mt-3 text-4xl">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">Please try again or return to the homepage.</p>
      <Button className="mt-6" onClick={reset}>Try again</Button>
    </section>
  );
}
