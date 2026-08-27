import Link from "next/link";

import { LogoTextoUNLPAM } from "@/components/logo-texto-unlpam";
import { LogoUNLPAM } from "@/components/logo-unlpam";

export function Logo() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label="Inicio - Universidad Nacional de La Pampa"
      >
        <LogoUNLPAM className="h-auto w-[68px] sm:w-[82px]" />
        <LogoTextoUNLPAM className="hidden h-auto w-[170px] sm:inline-block lg:w-[210px] dark:invert" />
      </Link>
    </div>
  );
}
