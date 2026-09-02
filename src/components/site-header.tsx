import Link from "next/link";

import { Logo } from "@/components/logo";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationItems = [
  { href: "/", label: "Inicio", className: "hidden lg:inline-flex" },
  { href: "/collection", label: "Colección", className: "inline-flex" },
  { href: "/about", label: "Acerca", className: "hidden sm:inline-flex" },
];

export function SiteHeader() {
  return (
    <header className="bg-background/86 supports-[backdrop-filter]:bg-background/76 sticky top-0 z-50 border-b border-[var(--paleo-border)] backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--paleo-cyan)]/45 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <Link
            href="/"
            className="hidden translate-y-1 border-l border-[var(--paleo-border)] pl-4 sm:flex sm:min-h-12 sm:flex-col sm:justify-center"
            aria-label="Paleo Virtual FCEyN"
          >
            <span className="font-mono text-[0.62rem] font-bold tracking-[0.26em] text-[var(--paleo-aqua)] uppercase">
              Repositorio 3D
            </span>
            <span className="text-foreground text-lg font-semibold tracking-tight">
              Paleo Virtual
            </span>
          </Link>
        </div>
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-3 sm:flex"
        >
          <div className="bg-secondary/70 flex items-center rounded-full border border-[var(--paleo-border)] p-1 shadow-[0_0_32px_rgba(0,229,255,0.08)]">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${item.className} hover:bg-primary/12 hover:text-primary focus-visible:ring-ring text-muted-foreground h-9 items-center rounded-full px-3 font-mono text-xs font-semibold tracking-[0.12em] uppercase transition focus-visible:ring-2 focus-visible:outline-none sm:px-4`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </nav>
        <MobileNavigation />
      </div>
    </header>
  );
}
