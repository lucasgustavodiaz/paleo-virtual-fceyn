import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Specimen } from "@/types/specimen";

type SpecimenCardProps = {
  specimen: Specimen;
};

export function SpecimenCard({ specimen }: SpecimenCardProps) {
  const hasModel = specimen.modelUrl.trim().length > 0;

  return (
    <Card className="group/specimen bg-card/88 hover:border-primary/55 h-full border-[var(--paleo-border)] pt-0 transition duration-300 hover:shadow-[0_0_34px_rgba(0,229,255,0.14)]">
      {hasModel ? (
        <Link
          href={`/specimens/${specimen.slug}`}
          className="group/image bg-secondary focus-visible:ring-ring relative block aspect-[4/3] overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
          aria-label={`Ver modelo 3D de ${specimen.name}`}
        >
          <div className="from-background/55 to-primary/8 absolute inset-0 z-10 bg-gradient-to-t via-transparent" />
          <div className="border-primary/30 bg-background/70 text-primary absolute top-3 left-3 z-20 max-w-[calc(100%-1.5rem)] truncate rounded-full border px-2 py-1 font-mono text-[0.58rem] font-bold tracking-[0.14em] uppercase backdrop-blur">
            {specimen.period}
          </div>
          <Image
            src={specimen.thumbnailUrl}
            alt={`Miniatura de ${specimen.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-88 saturate-75 transition duration-500 group-hover/image:scale-[1.035] group-hover/image:opacity-100 group-hover/image:saturate-100"
          />
        </Link>
      ) : (
        <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
          <Image
            src={specimen.thumbnailUrl}
            alt={`Miniatura de ${specimen.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="gap-2">
        <div>
          <CardTitle className="text-foreground w-full min-w-0 truncate text-lg">
            {hasModel ? (
              <Link
                href={`/specimens/${specimen.slug}`}
                className="hover:text-primary block truncate transition"
                title={specimen.name}
              >
                {specimen.name}
              </Link>
            ) : (
              <span className="block truncate" title={specimen.name}>
                {specimen.name}
              </span>
            )}
          </CardTitle>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardDescription className="text-muted-foreground min-w-0 font-mono text-xs tracking-[0.12em] uppercase">
            {specimen.inventoryNumber}
          </CardDescription>
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/8 text-primary max-w-full"
          >
            {specimen.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-6">
          {specimen.description}
        </p>
      </CardContent>
      <CardFooter className="bg-secondary/30 border-[var(--paleo-border)]">
        {hasModel ? (
          <Link
            href={`/specimens/${specimen.slug}`}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Explorar modelo
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ) : (
          <span className="text-muted-foreground text-sm">
            Modelo 3D pendiente de carga
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
