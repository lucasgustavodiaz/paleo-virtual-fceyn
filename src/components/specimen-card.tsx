import Image from "next/image";
import Link from "next/link";

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
    <Card className="h-full border-stone-200 bg-white/90 pt-0 shadow-sm transition hover:border-stone-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-950 dark:ring-1 dark:ring-stone-700/70 dark:hover:border-amber-300/40">
      {hasModel ? (
        <Link
          href={`/specimens/${specimen.slug}`}
          className="group/image focus-visible:ring-ring relative block aspect-[4/3] overflow-hidden bg-stone-100 focus-visible:ring-2 focus-visible:outline-none dark:bg-stone-800"
          aria-label={`Ver modelo 3D de ${specimen.name}`}
        >
          <Image
            src={specimen.thumbnailUrl}
            alt={`Miniatura de ${specimen.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover/image:scale-105 dark:brightness-90 dark:contrast-110"
          />
        </Link>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
          <Image
            src={specimen.thumbnailUrl}
            alt={`Miniatura de ${specimen.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="min-w-0 flex-1 truncate text-lg text-stone-950 dark:text-stone-50">
            {hasModel ? (
              <Link
                href={`/specimens/${specimen.slug}`}
                className="block truncate hover:underline"
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
          <Badge
            variant="secondary"
            className="dark:bg-stone-800 dark:text-stone-100 dark:ring-1 dark:ring-stone-700"
          >
            {specimen.category}
          </Badge>
        </div>
        <CardDescription>{specimen.inventoryNumber}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-6 dark:text-stone-300">
          {specimen.description}
        </p>
      </CardContent>
      <CardFooter>
        {hasModel ? (
          <Link
            href={`/specimens/${specimen.slug}`}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Ver modelo 3D
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
