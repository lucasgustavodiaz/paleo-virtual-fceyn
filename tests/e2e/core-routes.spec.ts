import { expect, test } from "@playwright/test";

test("home exposes the collection call to action", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Paleo Virtual/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Explorar colección/i }),
  ).toBeVisible();
});

test("collection search is reflected in the URL", async ({ page }) => {
  await page.goto("/collection");

  await page
    .getByRole("searchbox", { name: /Buscar en la colección/i })
    .fill("craneo");

  await expect(page).toHaveURL(/q=craneo/);
  await expect(page.getByText("Cráneo fósil de referencia")).toBeVisible();
});

test("specimen detail includes metadata and navigation", async ({ page }) => {
  await page.goto("/specimens/craneo-fosil-referencia");

  await expect(
    page.getByRole("heading", { name: "Cráneo fósil de referencia" }).first(),
  ).toBeVisible();
  await expect(page.getByText("Ficha científica")).toBeVisible();
  await expect(page.getByRole("link", { name: /Siguiente/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Descargar ficha JSON/i }),
  ).toBeVisible();
});
