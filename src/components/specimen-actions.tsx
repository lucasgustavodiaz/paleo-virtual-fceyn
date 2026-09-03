"use client";

import { useEffect, useState } from "react";

import { BarChart3, Code2, Copy, Download, Heart, Share2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Specimen } from "@/types/specimen";

type SpecimenActionsProps = {
  specimen: Specimen;
};

type LocalMetrics = {
  views: number;
  downloads: number;
  liked: boolean;
};

function getMetricKey(specimenId: string) {
  return `paleo-virtual:specimen:${specimenId}:metrics`;
}

function readMetrics(specimenId: string): LocalMetrics {
  if (typeof window === "undefined") {
    return { views: 0, downloads: 0, liked: false };
  }

  const storedMetrics = window.localStorage.getItem(getMetricKey(specimenId));

  if (!storedMetrics) {
    return { views: 0, downloads: 0, liked: false };
  }

  try {
    return {
      views: 0,
      downloads: 0,
      liked: false,
      ...JSON.parse(storedMetrics),
    };
  } catch {
    return { views: 0, downloads: 0, liked: false };
  }
}

function saveMetrics(specimenId: string, metrics: LocalMetrics) {
  window.localStorage.setItem(
    getMetricKey(specimenId),
    JSON.stringify(metrics),
  );
}

export function SpecimenActions({ specimen }: SpecimenActionsProps) {
  const [metrics, setMetrics] = useState<LocalMetrics>({
    views: 0,
    downloads: 0,
    liked: false,
  });
  const [showEmbed, setShowEmbed] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState("");
  const hasModel = specimen.modelUrl.trim().length > 0;
  const pageUrl =
    typeof window === "undefined" ? "" : window.location.href.split("#")[0];
  const specimenJsonHref = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(specimen, null, 2))}`;
  const embedCode = `<iframe title="${specimen.name}" src="${pageUrl}" width="100%" height="640" loading="lazy" allowfullscreen></iframe>`;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextMetrics = readMetrics(specimen.id);

      nextMetrics.views += 1;
      saveMetrics(specimen.id, nextMetrics);
      setMetrics(nextMetrics);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [specimen.id]);

  async function copyToClipboard(value: string, message: string) {
    if (!value || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setClipboardStatus(message);
  }

  async function shareSpecimen() {
    if (!pageUrl) {
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: specimen.name, url: pageUrl });
      return;
    }

    await copyToClipboard(pageUrl, "Enlace copiado");
  }

  function updateMetrics(
    updater: (currentMetrics: LocalMetrics) => LocalMetrics,
  ) {
    setMetrics((currentMetrics) => {
      const nextMetrics = updater(currentMetrics);

      saveMetrics(specimen.id, nextMetrics);

      return nextMetrics;
    });
  }

  function toggleLike() {
    updateMetrics((currentMetrics) => ({
      ...currentMetrics,
      liked: !currentMetrics.liked,
    }));
  }

  function registerDownload() {
    updateMetrics((currentMetrics) => ({
      ...currentMetrics,
      downloads: currentMetrics.downloads + 1,
    }));
  }

  return (
    <section
      className="paleo-panel rounded-3xl p-4 sm:p-5"
      aria-label="Acciones del modelo"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="paleo-kicker">Compartir y reutilizar</p>
            <h2 className="text-foreground text-lg font-semibold tracking-[-0.02em]">
              Acciones del modelo
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-xs leading-5 sm:text-right">
            Enlaces, embed y descargas para clases, repositorios y material
            institucional.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={shareSpecimen}
          >
            <Share2 aria-hidden="true" />
            Compartir
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => copyToClipboard(pageUrl, "Enlace copiado")}
          >
            <Copy aria-hidden="true" />
            Copiar enlace
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setShowEmbed((currentValue) => !currentValue);
              setClipboardStatus("");
            }}
            aria-expanded={showEmbed}
          >
            <Code2 aria-hidden="true" />
            Embed
          </Button>
          <a
            href={specimenJsonHref}
            download={`${specimen.slug}.json`}
            onClick={registerDownload}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            <Download aria-hidden="true" />
            Ficha JSON
          </a>
          {hasModel ? (
            <a
              href={specimen.modelUrl}
              target="_blank"
              rel="noreferrer"
              onClick={registerDownload}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
              )}
            >
              <Download aria-hidden="true" />
              Modelo GLB
            </a>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-(--paleo-border) pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={metrics.liked ? "default" : "outline"}
              size="sm"
              onClick={toggleLike}
              aria-pressed={metrics.liked}
            >
              <Heart aria-hidden="true" />
              {metrics.liked ? "Te gusta" : "Me gusta"}
            </Button>
            <span className="bg-background/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border border-(--paleo-border) px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
              <BarChart3 aria-hidden="true" className="text-primary size-4" />
              {metrics.views} vistas
            </span>
            <span className="bg-background/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border border-(--paleo-border) px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
              <Download aria-hidden="true" className="text-primary size-4" />
              {metrics.downloads} descargas
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-5 lg:max-w-xs lg:text-right">
            Métricas guardadas solo en este navegador.
          </p>
        </div>

        {showEmbed ? (
          <div className="bg-background/55 mt-4 space-y-3 rounded-2xl border border-(--paleo-border) p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label className="text-primary block font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Código para embeber
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(embedCode, "Embed copiado")}
              >
                <Copy aria-hidden="true" />
                Copiar embed
              </Button>
            </div>
            <textarea
              readOnly
              value={embedCode}
              className="bg-background/80 text-foreground h-24 w-full resize-none rounded-xl border border-(--paleo-border) p-3 font-mono text-xs outline-none"
            />
          </div>
        ) : null}
        {clipboardStatus ? (
          <p
            className="text-primary mt-3 text-sm font-medium"
            aria-live="polite"
          >
            {clipboardStatus}
          </p>
        ) : null}
      </div>
    </section>
  );
}
