export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-navy py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-white/80">{description}</p> : null}
      </div>
    </section>
  );
}
