import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="bg-background flex flex-1 items-center">
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Card className="paleo-panel py-0">
          <CardContent className="p-8 sm:p-10">
            <p className="paleo-kicker">404</p>
            <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-base leading-7">
              El recurso solicitado no existe o todavía no fue publicado en el
              repositorio Paleo Virtual FCEyN.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/collection"
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
              >
                Ir a la colección
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
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
