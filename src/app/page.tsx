import Link from "next/link";

import { ArrowRight, Atom, Database, ScanLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { specimens } from "@/data/specimens";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="bg-background flex-1">
      <section className="bg-background text-foreground relative overflow-hidden border-b border-(--paleo-border)">
        <div className="absolute inset-0 bg-[url('/hero-paleo.svg')] bg-cover bg-center opacity-18 mix-blend-multiply dark:opacity-24 dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(0,126,150,0.14),transparent_24rem),radial-gradient(circle_at_20%_72%,rgba(0,143,119,0.08),transparent_28rem),linear-gradient(90deg,rgba(244,251,255,0.98),rgba(244,251,255,0.84)_48%,rgba(244,251,255,0.62))] dark:bg-[radial-gradient(circle_at_72%_35%,rgba(0,229,255,0.18),transparent_24rem),radial-gradient(circle_at_20%_72%,rgba(0,255,198,0.1),transparent_28rem),linear-gradient(90deg,rgba(5,11,18,0.98),rgba(5,11,18,0.84)_48%,rgba(5,11,18,0.62))]" />
        <div className="paleo-scanlines absolute inset-0 opacity-35" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="border-primary/40 bg-primary/10 text-primary"
            >
              Paleontología digital
            </Badge>
            <h1 className="text-foreground mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              Paleo Virtual <span className="paleo-title-gradient">FCEyN</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-xl leading-8">
              Explorá el patrimonio paleontológico en tres dimensiones mediante
              una plataforma científica, accesible y preparada para crecer como
              repositorio institucional.
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
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href={`/specimens/${specimens[0].slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-6 text-base",
                )}
              >
                Ver modelo de ejemplo
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Sistema", "Repositorio 3D"],
                ["Formato", "GLB / GLTF"],
                ["Interfaz", "Web científica"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-secondary/35 rounded-2xl border border-(--paleo-border) p-4 backdrop-blur"
                >
                  <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.18em] uppercase">
                    {label}
                  </p>
                  <p className="text-foreground mt-2 text-sm font-semibold">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Card className="paleo-panel paleo-corners relative overflow-hidden py-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(0,255,198,0.18),transparent_15rem)]" />
            <CardContent className="space-y-5 p-6">
              <div className="bg-secondary/35 relative aspect-square rounded-2xl border border-(--paleo-border) p-5">
                <div className="border-primary/20 absolute inset-8 rounded-full border" />
                <div className="border-accent/20 absolute inset-16 rounded-full border" />
                <div className="bg-primary/16 absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="text-primary flex items-center justify-between font-mono text-[0.62rem] tracking-[0.18em] uppercase">
                    <span>Modelo 3D</span>
                    <ScanLine aria-hidden="true" className="size-4" />
                  </div>
                  <div className="border-primary/35 bg-primary/8 mx-auto grid size-40 place-items-center rounded-full border shadow-[0_0_60px_rgba(0,229,255,0.16)]">
                    <Atom aria-hidden="true" className="text-primary size-16" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-background/45 rounded-xl border border-(--paleo-border) p-3">
                      <p className="text-foreground text-2xl font-semibold">
                        {specimens.length}
                      </p>
                      <p className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.12em] uppercase">
                        piezas
                      </p>
                    </div>
                    <div className="bg-background/45 rounded-xl border border-(--paleo-border) p-3">
                      <p className="text-foreground text-2xl font-semibold">
                        3D
                      </p>
                      <p className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.12em] uppercase">
                        visor
                      </p>
                    </div>
                    <div className="bg-background/45 rounded-xl border border-(--paleo-border) p-3">
                      <p className="text-foreground text-2xl font-semibold">
                        GLB
                      </p>
                      <p className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.12em] uppercase">
                        base
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="text-muted-foreground relative flex items-start gap-3 text-sm leading-6">
                <Database
                  aria-hidden="true"
                  className="text-primary mt-1 size-4"
                />
                <p>
                  Base lista para reemplazar modelos demo por piezas reales,
                  metadatos curatoriales y recursos educativos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
