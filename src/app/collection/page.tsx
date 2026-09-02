import { Suspense } from "react";

import { CollectionFilters } from "@/components/collection-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { specimens } from "@/data/specimens";

export const metadata = {
  title: "Colección",
  description: "Listado inicial de objetos fósiles digitalizados en 3D.",
};

export default function CollectionPage() {
  return (
    <main className="bg-background flex-1">
      <section className="relative overflow-hidden border-b border-[var(--paleo-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(0,229,255,0.13),transparent_24rem),radial-gradient(circle_at_82%_12%,rgba(0,255,198,0.08),transparent_22rem)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="paleo-kicker">Archivo científico digital</p>
            <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Colección de objetos 3D
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              Navegá especímenes, filtrá por criterios curatoriales y accedé a
              modelos interactivos preparados para exploración web.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<CollectionFiltersFallback />}>
          <CollectionFilters specimens={specimens} />
        </Suspense>
      </section>
    </main>
  );
}

function CollectionFiltersFallback() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-72 rounded-3xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-96 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
