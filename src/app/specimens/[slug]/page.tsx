import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ModelViewer } from "@/components/model-viewer";
import { SpecimenMetadata } from "@/components/specimen-metadata";
import { buttonVariants } from "@/components/ui/button";
import { getSpecimenBySlug, specimens } from "@/data/specimens";
import { cn } from "@/lib/utils";

type SpecimenPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return specimens.map((specimen) => ({ slug: specimen.slug }));
}

export async function generateMetadata({
  params,
}: SpecimenPageProps): Promise<Metadata> {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);

  if (!specimen) {
    return { title: "Objeto no encontrado" };
  }

  return {
    title: specimen.name,
    description: specimen.description,
    openGraph: {
      title: specimen.name,
      description: specimen.description,
      images: [
        {
          url: specimen.thumbnailUrl,
          alt: `Miniatura de ${specimen.name}`,
        },
      ],
    },
  };
}

export default async function SpecimenDetailPage({
  params,
}: SpecimenPageProps) {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);

  if (!specimen) {
    notFound();
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/collection"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-6",
          )}
        >
          Volver a la colección
        </Link>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <ModelViewer
            modelUrl={specimen.modelUrl}
            label={`Visualizador 3D de ${specimen.name}`}
          />
          <SpecimenMetadata specimen={specimen} />
        </div>
      </section>
    </main>
  );
}
