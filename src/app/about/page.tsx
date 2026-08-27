import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Acerca del proyecto",
  description:
    "Objetivos institucionales, educativos y técnicos de Paleo Virtual FCEyN.",
};

const goals = [
  "Facilitar el acceso público a objetos paleontológicos digitalizados en 3D.",
  "Acompañar actividades de docencia, investigación y divulgación científica.",
  "Construir una base técnica mantenible para incorporar metadatos curatoriales reales.",
];

const principles = [
  "Accesibilidad para usuarios no técnicos.",
  "Metadatos claros y trazables.",
  "Base preparada para crecer sin rehacer la interfaz.",
  "Diseño sobrio compatible con identidad institucional.",
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="border-b bg-gradient-to-br from-stone-100 via-white to-amber-50 dark:from-stone-950 dark:via-stone-950 dark:to-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.22em] text-stone-500 uppercase">
              Acerca del proyecto
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50">
              Un repositorio 3D para educación, investigación y divulgación
            </h1>
            <p className="mt-6 text-base leading-8 text-stone-700 dark:text-stone-300">
              Esta primera versión prioriza una experiencia clara y accesible:
              colección navegable, fichas descriptivas y visualización 3D en el
              navegador. La arquitectura queda preparada para incorporar modelos
              reales, filtros curatoriales, recursos educativos y metadatos
              científicos más completos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/collection"
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
              >
                Explorar colección
              </Link>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5",
                )}
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Objetivos
          </h2>
          <div className="mt-5 grid gap-4">
            {goals.map((goal) => (
              <Card
                key={goal}
                className="border-stone-200 bg-white/80 dark:border-stone-800 dark:bg-stone-900/70"
              >
                <CardContent className="p-4 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {goal}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Criterios de diseño
          </h2>
          <div className="mt-5 grid gap-4">
            {principles.map((principle) => (
              <Card
                key={principle}
                className="border-stone-200 bg-white/80 dark:border-stone-800 dark:bg-stone-900/70"
              >
                <CardContent className="p-4 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {principle}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
