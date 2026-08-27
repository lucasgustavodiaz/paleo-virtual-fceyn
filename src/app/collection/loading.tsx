import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionLoading() {
  return (
    <main className="flex-1 bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-4 h-10 w-full max-w-xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-3xl" />
        <Skeleton className="mt-10 h-72 rounded-2xl" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-96 rounded-2xl" />
          ))}
        </div>
      </section>
    </main>
  );
}
