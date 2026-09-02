import { Skeleton } from "@/components/ui/skeleton";

export default function SpecimenLoading() {
  return (
    <main className="bg-background flex-1">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-8 w-40" />
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_430px]">
          <Skeleton className="h-[clamp(460px,62dvh,660px)] rounded-2xl" />
          <Skeleton className="h-[620px] rounded-2xl" />
        </div>
      </section>
    </main>
  );
}
