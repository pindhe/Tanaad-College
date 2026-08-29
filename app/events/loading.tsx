import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
      <Skeleton className="h-72" />
      <Skeleton className="h-72" />
      <Skeleton className="h-72" />
    </div>
  );
}
