import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { specimens } from "@/data/specimens";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex-1 bg-amber-50 dark:bg-stone-950">
      <section className="relative overflow-hidden border-b bg-amber-50 text-stone-950 dark:bg-stone-950 dark:text-white">
        <div className="absolute inset-0 bg-[url('/hero-paleo.svg')] bg-cover bg-center opacity-34 saturate-90 dark:opacity-70 dark:saturate-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-50/82 to-amber-50/25 dark:from-stone-950 dark:via-stone-950/80 dark:to-stone-950/20" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="bg-stone-950/8 text-stone-800 dark:bg-white/15 dark:text-white"
            >
              Repositorio institucional 3D
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-950 sm:text-6xl dark:text-white">
              Paleo Virtual FCEyN
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 dark:text-stone-200">
              Una base web para explorar, documentar y divulgar objetos fósiles
              digitalizados en 3D, pensada para estudiantes, docentes,
              investigadores y público general.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/collection"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-6 text-base",
                )}
              >
                Explorar colección
              </Link>
              <Link
                href={`/specimens/${specimens[0].slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 border-stone-950/20 bg-white/60 px-6 text-base text-stone-950 hover:bg-white dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
                )}
              >
                Ver modelo de ejemplo
              </Link>
            </div>
          </div>
          <Card className="border-stone-950/10 bg-white/75 text-stone-950 shadow-2xl backdrop-blur-md dark:border-white/20 dark:bg-white/12 dark:text-white">
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-stone-500 uppercase dark:text-stone-300">
                  Primera versión
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-950 dark:text-white">
                  Visualización y catálogo navegable
                </h2>
              </div>
              <Separator className="bg-stone-950/10 dark:bg-white/20" />
              <p className="text-sm leading-6 text-stone-700 dark:text-stone-200">
                Esta etapa prioriza una arquitectura estable: datos locales
                reemplazables, fichas de especímenes, visualizador 3D aislado y
                componentes UI reutilizables.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="rounded-xl bg-stone-950/6 p-3 dark:bg-white/10">
                  <p className="text-2xl font-semibold">{specimens.length}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    piezas demo
                  </p>
                </div>
                <div className="rounded-xl bg-stone-950/6 p-3 dark:bg-white/10">
                  <p className="text-2xl font-semibold">3D</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    web viewer
                  </p>
                </div>
                <div className="rounded-xl bg-stone-950/6 p-3 dark:bg-white/10">
                  <p className="text-2xl font-semibold">GLB</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    formato base
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
