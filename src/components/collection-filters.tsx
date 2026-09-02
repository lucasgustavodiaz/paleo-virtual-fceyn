"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search, SlidersHorizontal } from "lucide-react";

import { SpecimenCard } from "@/components/specimen-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  filterSpecimens,
  getCategoryCounts,
  getUniqueValues,
  sortSpecimens,
  type CollectionFiltersState,
  type FilterKey,
  type SortKey,
} from "@/lib/collection-utils";
import type { Specimen } from "@/types/specimen";

type CollectionFiltersProps = {
  specimens: Specimen[];
};

const filterConfig: Array<{ key: FilterKey; label: string; allLabel: string }> =
  [
    { key: "category", label: "Categoría", allLabel: "Todas las categorías" },
    { key: "period", label: "Período", allLabel: "Todos los períodos" },
    {
      key: "provenance",
      label: "Procedencia",
      allLabel: "Todas las procedencias",
    },
  ];

const controlClassName =
  "h-12 w-full rounded-xl border border-(--paleo-border) bg-background/82 px-3 font-mono text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition placeholder:text-muted-foreground/72 focus:border-primary/75 focus:ring-3 focus:ring-primary/14";

const defaultFilters: CollectionFiltersState = {
  category: "",
  period: "",
  provenance: "",
};

const validSortKeys: SortKey[] = ["name", "period", "inventoryNumber"];

export function CollectionFilters({ specimens }: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const initialSortKey = searchParams.get("sort");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [sortKey, setSortKey] = useState<SortKey>(
    validSortKeys.includes(initialSortKey as SortKey)
      ? (initialSortKey as SortKey)
      : "name",
  );
  const [filters, setFilters] = useState<CollectionFiltersState>({
    category: searchParams.get("category") ?? "",
    period: searchParams.get("period") ?? "",
    provenance: searchParams.get("provenance") ?? "",
  });

  const categoryCounts = getCategoryCounts(specimens);
  const filteredSpecimens = filterSpecimens(specimens, filters, searchQuery);

  const hasActiveFilters =
    Boolean(searchQuery.trim()) || Object.values(filters).some(Boolean);
  const sortedSpecimens = sortSpecimens(filteredSpecimens, sortKey);
  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    Object.values(filters).filter(Boolean).length;

  function syncUrl(
    nextSearchQuery: string,
    nextFilters: CollectionFiltersState,
    nextSortKey: SortKey,
  ) {
    const nextSearchParams = new URLSearchParams();

    if (nextSearchQuery.trim()) {
      nextSearchParams.set("q", nextSearchQuery.trim());
    }

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) {
        nextSearchParams.set(key, value);
      }
    });

    if (nextSortKey !== "name") {
      nextSearchParams.set("sort", nextSortKey);
    }

    const nextQueryString = nextSearchParams.toString();
    const nextUrl = nextQueryString
      ? `${pathname}?${nextQueryString}`
      : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function updateFilter(key: FilterKey, value: string) {
    const nextFilters = { ...filters, [key]: value };

    setFilters(nextFilters);
    syncUrl(searchQuery, nextFilters, sortKey);
  }

  function updateSearchQuery(value: string) {
    setSearchQuery(value);
    syncUrl(value, filters, sortKey);
  }

  function updateSortKey(value: SortKey) {
    setSortKey(value);
    syncUrl(searchQuery, filters, value);
  }

  function clearFilters() {
    setSearchQuery("");
    setFilters(defaultFilters);
    setSortKey("name");
    syncUrl("", defaultFilters, "name");
  }

  return (
    <div className="space-y-8">
      <Card className="paleo-panel py-0">
        <CardContent className="space-y-5 p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-(--paleo-border) pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="paleo-kicker flex items-center gap-2">
                <SlidersHorizontal aria-hidden="true" className="size-3.5" />
                Explorar catálogo
              </p>
              <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight">
                Buscar y filtrar piezas
              </h2>
            </div>
            <p
              className="border-primary/30 bg-primary/10 text-primary rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-[0.12em] uppercase"
              aria-live="polite"
            >
              {filteredSpecimens.length} / {specimens.length} visibles
            </p>
          </div>

          <div className="bg-secondary/35 rounded-2xl border border-(--paleo-border) p-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="collection-search"
                className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.16em] uppercase"
              >
                Buscar en la colección
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="text-primary pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <input
                  id="collection-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => updateSearchQuery(event.target.value)}
                  placeholder="Nombre, inventario, procedencia, descripción..."
                  className={`${controlClassName} pl-10`}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filterConfig.map(({ key, label, allLabel }) => (
              <div key={key} className="flex flex-col gap-3">
                <label
                  htmlFor={`collection-filter-${key}`}
                  className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  {label}
                </label>
                <select
                  id={`collection-filter-${key}`}
                  value={filters[key]}
                  onChange={(event) => updateFilter(key, event.target.value)}
                  className={controlClassName}
                >
                  <option value="">{allLabel}</option>
                  {getUniqueValues(specimens, key).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="collection-sort"
                className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.16em] uppercase"
              >
                Ordenar por
              </label>
              <select
                id="collection-sort"
                value={sortKey}
                onChange={(event) =>
                  updateSortKey(event.target.value as SortKey)
                }
                className={controlClassName}
              >
                <option value="name">Nombre</option>
                <option value="period">Período</option>
                <option value="inventoryNumber">Inventario</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-(--paleo-border) pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              {activeFilterCount > 0
                ? `${activeFilterCount} filtro${activeFilterCount === 1 ? "" : "s"} activo${activeFilterCount === 1 ? "" : "s"}. La URL refleja esta búsqueda para compartirla.`
                : "Combiná búsqueda, filtros y ordenamiento para recorrer el catálogo."}
            </p>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-11"
            >
              Limpiar filtros
            </Button>
          </div>
          <div
            className="flex flex-wrap gap-2"
            aria-label="Conteo por categoría"
          >
            {Object.entries(categoryCounts).map(([category, count]) => (
              <Badge
                key={category}
                variant="secondary"
                className="border-primary/20 bg-primary/8 text-primary"
              >
                {category}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {sortedSpecimens.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedSpecimens.map((specimen) => (
            <SpecimenCard key={specimen.id} specimen={specimen} />
          ))}
        </div>
      ) : (
        <div className="paleo-panel rounded-2xl border border-dashed p-8 text-center">
          <h2 className="text-foreground text-lg font-semibold">
            Sin resultados
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm leading-6">
            No hay objetos que coincidan con los filtros seleccionados. Probá
            ampliar la búsqueda o limpiar los filtros.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
