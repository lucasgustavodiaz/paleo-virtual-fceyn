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
        <LogoUNLPAM className="h-auto w-[68px] drop-shadow-[0_0_16px_rgba(0,126,150,0.18)] sm:w-[82px] dark:drop-shadow-[0_0_18px_rgba(89,243,255,0.2)]" />
        <LogoTextoUNLPAM className="hidden h-auto w-[170px] drop-shadow-[0_0_14px_rgba(0,126,150,0.12)] sm:inline-block lg:w-[210px] dark:drop-shadow-[0_0_16px_rgba(89,243,255,0.18)] dark:invert" />
      </Link>
    </div>
  );
}
