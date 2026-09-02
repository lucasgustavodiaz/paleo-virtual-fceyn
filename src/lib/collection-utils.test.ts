import { describe, expect, it } from "vitest";

import {
  filterSpecimens,
  getCategoryCounts,
  getUniqueValues,
  normalizeSearchText,
  sortSpecimens,
  type CollectionFiltersState,
} from "@/lib/collection-utils";
import { specimens } from "@/data/specimens";

const emptyFilters: CollectionFiltersState = {
  category: "",
  period: "",
  provenance: "",
};

describe("collection-utils", () => {
  it("normalizes search text without accents", () => {
    expect(normalizeSearchText("Cráneo FÓSIL")).toBe("craneo fosil");
  });

  it("filters specimens by accent-insensitive search", () => {
    const results = filterSpecimens(specimens, emptyFilters, "craneo");

    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("craneo-fosil-referencia");
  });

  it("combines field filters and search query", () => {
    const results = filterSpecimens(
      specimens,
      { ...emptyFilters, category: "Diente" },
      "vertebrado",
    );

    expect(results.map((specimen) => specimen.slug)).toEqual([
      "diente-aislado-vertebrado",
    ]);
  });

  it("returns sorted unique values for a filter", () => {
    expect(getUniqueValues(specimens, "category")).toEqual(
      [...new Set(specimens.map((specimen) => specimen.category))].sort(
        (first, second) => first.localeCompare(second, "es"),
      ),
    );
  });

  it("counts specimens by category", () => {
    expect(getCategoryCounts(specimens)).toMatchObject({
      Cráneo: 1,
      Mandíbula: 1,
      Diente: 1,
    });
  });

  it("sorts specimens without mutating the source array", () => {
    const source = specimens.slice(0, 3);
    const sorted = sortSpecimens(source, "inventoryNumber");

    expect(sorted.map((specimen) => specimen.inventoryNumber)).toEqual(
      source
        .map((specimen) => specimen.inventoryNumber)
        .sort((first, second) => first.localeCompare(second, "es")),
    );
    expect(sorted).not.toBe(source);
  });
});
