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
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-50 border-b backdrop-blur dark:border-stone-800 dark:bg-stone-950/92">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <Link
            href="/"
            className="hidden translate-y-1 border-l border-stone-200 pl-4 text-lg font-semibold tracking-tight text-stone-950 sm:flex sm:min-h-12 sm:items-center dark:border-stone-800 dark:text-stone-50"
            aria-label="Paleo Virtual FCEyN"
          >
            Paleo Virtual
          </Link>
        </div>
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-3 sm:flex"
        >
          <div className="flex items-center rounded-full border border-stone-200 bg-white/80 p-1 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/20">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${item.className} focus-visible:ring-ring h-9 items-center rounded-full px-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-stone-950 focus-visible:ring-2 focus-visible:outline-none sm:px-4 dark:text-stone-100 dark:hover:bg-amber-400/12 dark:hover:text-amber-100`}
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
