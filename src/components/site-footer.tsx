import Link from "next/link";

import { LogoFooter } from "@/components/logo-footer";

export function SiteFooter() {
  return (
    <footer className="bg-secondary/45 text-foreground border-t border-(--paleo-border)">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-4">
          <LogoFooter />
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Paleo Virtual FCEyN es una base web para la visualización y difusión
            de objetos paleontológicos digitalizados en 3D.
          </p>
        </div>
        <div className="text-muted-foreground font-mono text-xs leading-6 tracking-[0.08em] uppercase lg:text-right">
          <p>Facultad de Ciencias Exactas y Naturales</p>
          <p>Universidad Nacional de La Pampa</p>
          <nav aria-label="Navegación secundaria" className="mt-3 space-x-4">
            <Link href="/collection" className="hover:text-primary">
              Colección
            </Link>
            <Link href="/about" className="hover:text-primary">
              Acerca del proyecto
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
