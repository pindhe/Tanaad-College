import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you requested is not available.</p>
      <Button asChild className="mt-6">
        <Link href="/">Return home</Link>
      </Button>
    </section>
  );
}
