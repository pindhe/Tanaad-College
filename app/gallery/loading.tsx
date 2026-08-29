import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="aspect-[4/3]" />
      <Skeleton className="aspect-[4/3]" />
      <Skeleton className="aspect-[4/3]" />
    </div>
  );
}
