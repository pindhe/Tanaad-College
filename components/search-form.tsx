import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm({ defaultValue = "", placeholder }: { defaultValue?: string; placeholder: string }) {
  return (
    <form action="/search" className="flex w-full max-w-xl gap-2">
      <label htmlFor="q" className="sr-only">
        Search
      </label>
      <Input id="q" name="q" defaultValue={defaultValue} placeholder={placeholder} />
      <Button type="submit">Search</Button>
    </form>
  );
}
