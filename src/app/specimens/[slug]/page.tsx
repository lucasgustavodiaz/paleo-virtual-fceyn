import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { ModelViewer } from "@/components/model-viewer";
import { SpecimenActions } from "@/components/specimen-actions";
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

  const specimenIndex = specimens.findIndex(
    (currentSpecimen) => currentSpecimen.slug === specimen.slug,
  );
  const previousSpecimen =
    specimens[(specimenIndex - 1 + specimens.length) % specimens.length];
  const nextSpecimen = specimens[(specimenIndex + 1) % specimens.length];

  return (
    <main className="bg-background flex-1">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/collection"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-6 font-mono text-xs tracking-[0.12em] uppercase",
          )}
        >
          Volver a la colección
        </Link>
        <div className="mb-6">
          <p className="paleo-kicker">Estación de análisis</p>
          <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            {specimen.name}
          </h1>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="grid gap-4">
            <ModelViewer
              modelUrl={specimen.modelUrl}
              label={`Visualizador 3D de ${specimen.name}`}
            />
            <SpecimenActions specimen={specimen} />
          </div>
          <SpecimenMetadata specimen={specimen} />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/specimens/${previousSpecimen.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-auto justify-start gap-3 p-4 text-left",
            )}
          >
            <ArrowLeft aria-hidden="true" />
            <span>
              <span className="text-muted-foreground block font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                Anterior
              </span>
              <span className="block whitespace-normal">
                {previousSpecimen.name}
              </span>
            </span>
          </Link>
          <Link
            href={`/specimens/${nextSpecimen.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-auto justify-end gap-3 p-4 text-right",
            )}
          >
            <span>
              <span className="text-muted-foreground block font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                Siguiente
              </span>
              <span className="block whitespace-normal">
                {nextSpecimen.name}
              </span>
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
