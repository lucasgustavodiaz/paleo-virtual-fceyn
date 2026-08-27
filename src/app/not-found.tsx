import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Card className="border-stone-200 bg-white/90 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <CardContent className="p-8 sm:p-10">
            <p className="text-sm font-semibold tracking-[0.22em] text-stone-500 uppercase dark:text-stone-400">
              404
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50">
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
