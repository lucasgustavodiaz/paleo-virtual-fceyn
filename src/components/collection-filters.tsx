"use client";

import { useState } from "react";

import { SpecimenCard } from "@/components/specimen-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Specimen } from "@/types/specimen";

type CollectionFiltersProps = {
  specimens: Specimen[];
};

type FilterKey = "category" | "period" | "provenance";
type SortKey = "name" | "period" | "inventoryNumber";

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

function getUniqueValues(specimens: Specimen[], key: FilterKey) {
  return Array.from(new Set(specimens.map((specimen) => specimen[key]))).sort(
    (first, second) => first.localeCompare(second, "es"),
  );
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function getCategoryCounts(specimens: Specimen[]) {
  return specimens.reduce<Record<string, number>>((counts, specimen) => {
    counts[specimen.category] = (counts[specimen.category] ?? 0) + 1;

    return counts;
  }, {});
}

const controlClassName =
  "h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-950 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-3 focus:ring-stone-300/40 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-50 dark:placeholder:text-stone-400 dark:focus:border-amber-300/70 dark:focus:ring-amber-300/15";

export function CollectionFilters({ specimens }: CollectionFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    category: "",
    period: "",
    provenance: "",
  });

  const normalizedSearchQuery = normalizeSearchText(searchQuery.trim());

  const categoryCounts = getCategoryCounts(specimens);
  const filteredSpecimens = specimens.filter((specimen) => {
    const matchesFilters = filterConfig.every(
      ({ key }) => !filters[key] || specimen[key] === filters[key],
    );
    const searchableText = [
      specimen.name,
      specimen.inventoryNumber,
      specimen.category,
      specimen.period,
      specimen.provenance,
      specimen.description,
      specimen.credits,
      specimen.license,
      specimen.taxon,
      specimen.geologicalFormation,
      specimen.estimatedAge,
      specimen.material,
      specimen.dimensions,
      specimen.collector,
      specimen.digitizationDate,
      specimen.digitizationMethod,
      specimen.doi,
      specimen.bibliographicCitation,
    ].join(" ");
    const normalizedSearchableText = normalizeSearchText(searchableText);

    return (
      matchesFilters &&
      (!normalizedSearchQuery ||
        normalizedSearchableText.includes(normalizedSearchQuery))
    );
  });

  const hasActiveFilters =
    Boolean(normalizedSearchQuery) || Object.values(filters).some(Boolean);
  const sortedSpecimens = [...filteredSpecimens].sort((first, second) =>
    first[sortKey].localeCompare(second[sortKey], "es"),
  );

  function updateFilter(key: FilterKey, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function clearFilters() {
    setSearchQuery("");
    setFilters({ category: "", period: "", provenance: "" });
  }

  return (
    <div className="mt-10 space-y-8">
      <Card className="border-stone-200 bg-white/95 shadow-sm dark:border-stone-700 dark:bg-stone-950 dark:ring-1 dark:ring-stone-700/80">
        <CardContent className="space-y-5 p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-start sm:justify-between dark:border-stone-800">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase dark:text-stone-400">
                Explorar catálogo
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                Buscar y filtrar piezas
              </h2>
            </div>
            <p
              className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-100"
              aria-live="polite"
            >
              {filteredSpecimens.length} / {specimens.length} visibles
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-900/70">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="collection-search"
                className="text-sm font-semibold text-stone-800 dark:text-stone-100"
              >
                Buscar en la colección
              </label>
              <input
                id="collection-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Nombre, inventario, procedencia, descripción..."
                className={controlClassName}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filterConfig.map(({ key, label, allLabel }) => (
              <div key={key} className="flex flex-col gap-3">
                <label
                  htmlFor={`collection-filter-${key}`}
                  className="text-sm font-semibold text-stone-800 dark:text-stone-100"
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
                className="text-sm font-semibold text-stone-800 dark:text-stone-100"
              >
                Ordenar por
              </label>
              <select
                id="collection-sort"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className={controlClassName}
              >
                <option value="name">Nombre</option>
                <option value="period">Período</option>
                <option value="inventoryNumber">Inventario</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
            <p className="text-muted-foreground text-sm dark:text-stone-400">
              Combiná búsqueda, filtros y ordenamiento para recorrer el
              catálogo.
            </p>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-11 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
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
                className="dark:bg-stone-800 dark:text-stone-100 dark:ring-1 dark:ring-stone-700"
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
        <div className="rounded-2xl border border-dashed bg-white/75 p-8 text-center dark:border-stone-800 dark:bg-stone-900/70">
          <h2 className="text-lg font-semibold">Sin resultados</h2>
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
