import type { Specimen } from "@/types/specimen";

export type FilterKey = "category" | "period" | "provenance";
export type SortKey = "name" | "period" | "inventoryNumber";
export type CollectionFiltersState = Record<FilterKey, string>;

const searchableKeys = [
  "name",
  "inventoryNumber",
  "category",
  "period",
  "provenance",
  "description",
  "credits",
  "license",
  "taxon",
  "geologicalFormation",
  "estimatedAge",
  "material",
  "dimensions",
  "collector",
  "digitizationDate",
  "digitizationMethod",
  "doi",
  "bibliographicCitation",
] satisfies Array<keyof Specimen>;

export function getUniqueValues(specimens: Specimen[], key: FilterKey) {
  return Array.from(new Set(specimens.map((specimen) => specimen[key]))).sort(
    (first, second) => first.localeCompare(second, "es"),
  );
}

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function getCategoryCounts(specimens: Specimen[]) {
  return specimens.reduce<Record<string, number>>((counts, specimen) => {
    counts[specimen.category] = (counts[specimen.category] ?? 0) + 1;

    return counts;
  }, {});
}

export function filterSpecimens(
  specimens: Specimen[],
  filters: CollectionFiltersState,
  searchQuery: string,
) {
  const normalizedSearchQuery = normalizeSearchText(searchQuery.trim());

  return specimens.filter((specimen) => {
    const matchesFilters = Object.entries(filters).every(
      ([key, value]) => !value || specimen[key as FilterKey] === value,
    );
    const normalizedSearchableText = normalizeSearchText(
      searchableKeys.map((key) => specimen[key] ?? "").join(" "),
    );

    return (
      matchesFilters &&
      (!normalizedSearchQuery ||
        normalizedSearchableText.includes(normalizedSearchQuery))
    );
  });
}

export function sortSpecimens(specimens: Specimen[], sortKey: SortKey) {
  return [...specimens].sort((first, second) =>
    first[sortKey].localeCompare(second[sortKey], "es"),
  );
}
