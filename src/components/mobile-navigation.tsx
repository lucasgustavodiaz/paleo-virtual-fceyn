"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const mobileNavigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/collection", label: "Colección" },
  { href: "/about", label: "Acerca del proyecto" },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 sm:hidden">
      <ThemeToggle />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-stone-800 shadow-sm transition hover:bg-stone-100 focus-visible:ring-2 focus-visible:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-amber-400/12 dark:hover:text-amber-100"
          aria-label="Abrir menú de navegación"
        >
          <Menu aria-hidden="true" className="size-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Paleo Virtual</SheetTitle>
            <SheetDescription>
              Navegación principal del repositorio 3D.
            </SheetDescription>
          </SheetHeader>
          <nav
            aria-label="Navegación mobile"
            className="mt-8 flex flex-col gap-2"
          >
            {mobileNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-visible:ring-ring rounded-xl border border-transparent px-3 py-3 text-base font-semibold text-stone-800 transition hover:bg-stone-100 hover:text-stone-950 focus-visible:ring-2 focus-visible:outline-none dark:text-stone-50 dark:hover:border-stone-700 dark:hover:bg-amber-400/12 dark:hover:text-amber-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
