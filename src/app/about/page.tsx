import Link from "next/link";

import { Microscope, Network, ShieldCheck } from "lucide-react";

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

const goalIcons = [Microscope, Network, ShieldCheck];

const principles = [
  "Accesibilidad para usuarios no técnicos.",
  "Metadatos claros y trazables.",
  "Base preparada para crecer sin rehacer la interfaz.",
  "Diseño sobrio compatible con identidad institucional.",
];

export default function AboutPage() {
  return (
    <main className="bg-background flex-1">
      <section className="relative overflow-hidden border-b border-[var(--paleo-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(0,229,255,0.14),transparent_24rem),radial-gradient(circle_at_78%_42%,rgba(0,255,198,0.08),transparent_24rem)]" />
        <div className="paleo-scanlines absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="paleo-kicker">Acerca del proyecto</p>
            <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Un repositorio 3D para educación, investigación y divulgación
            </h1>
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-8">
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
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="paleo-kicker">Misión</p>
          <h2 className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.035em]">
            Objetivos
          </h2>
          <div className="mt-5 grid gap-4">
            {goals.map((goal, index) => {
              const Icon = goalIcons[index];

              return (
                <Card key={goal} className="paleo-panel py-0">
                  <CardContent className="text-muted-foreground flex gap-4 p-5 text-sm leading-6">
                    <div className="border-primary/30 bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl border">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    {goal}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
          <p className="paleo-kicker">Sistema visual</p>
          <h2 className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.035em]">
            Criterios de diseño
          </h2>
          <div className="mt-5 grid gap-4">
            {principles.map((principle) => (
              <Card
                key={principle}
                className="bg-secondary/35 border-[var(--paleo-border)] py-0"
              >
                <CardContent className="text-muted-foreground p-5 text-sm leading-6">
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
