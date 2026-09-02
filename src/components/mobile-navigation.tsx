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
          className="bg-secondary/65 text-primary hover:border-primary/60 hover:bg-primary/12 focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-xl border border-[var(--paleo-border)] shadow-[0_0_26px_rgba(0,229,255,0.08)] transition focus-visible:ring-2 focus-visible:outline-none"
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
                className="hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:ring-ring text-muted-foreground rounded-xl border border-transparent px-3 py-3 font-mono text-sm font-semibold tracking-[0.12em] uppercase transition focus-visible:ring-2 focus-visible:outline-none"
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
