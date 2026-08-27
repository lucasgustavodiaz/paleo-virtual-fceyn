import Link from "next/link";

import { LogoTextoUNLPAM } from "@/components/logo-texto-unlpam";
import { LogoUNLPAM } from "@/components/logo-unlpam";

export function LogoFooter() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label="Inicio - Universidad Nacional de La Pampa"
      >
        <LogoUNLPAM className="h-auto w-[72px]" />
        <LogoTextoUNLPAM className="hidden h-auto w-[190px] invert sm:inline-block" />
      </Link>
    </div>
  );
}
