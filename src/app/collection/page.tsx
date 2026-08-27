import { CollectionFilters } from "@/components/collection-filters";
import { specimens } from "@/data/specimens";

export const metadata = {
  title: "Colección",
  description: "Listado inicial de objetos fósiles digitalizados en 3D.",
};

export default function CollectionPage() {
  return (
    <main className="flex-1 bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.22em] text-stone-500 uppercase">
            Colección
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50">
            Objetos 3D disponibles
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-7">
            Catálogo inicial con piezas de ejemplo. La estructura está preparada
            para reemplazar estos registros por modelos, miniaturas y metadatos
            científicos reales del repositorio.
          </p>
        </div>
        <CollectionFilters specimens={specimens} />
      </section>
    </main>
  );
}
