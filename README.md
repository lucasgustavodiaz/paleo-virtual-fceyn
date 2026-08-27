# Paleo Virtual FCEyN

Visualizador web para objetos 3D del repositorio paleontológico de la Facultad de Ciencias Exactas y Naturales.

La primera versión incluye home institucional, colección navegable, búsqueda, filtros, ficha de detalle y visualizador 3D para modelos `.glb` o `.gltf`.

## Stack

- Next.js App Router
- TypeScript estricto
- Tailwind CSS
- shadcn/ui
- three.js con React Three Fiber y Drei
- Prettier con `prettier-plugin-tailwindcss`
- ESLint recomendado para Next.js

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
npm run check
```

## Variables de entorno

Crear `.env.local` a partir de `.env.example` si se necesita configurar la URL pública del sitio:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

En producción, usar el dominio institucional final. Esta variable se usa para metadata y Open Graph.

## Estructura principal

```txt
src/app/
src/components/
src/components/ui/
src/data/specimens.ts
src/types/specimen.ts
src/lib/utils.ts
public/specimens/
```

## Carga de modelos reales

Cada pieza se declara en `src/data/specimens.ts` siguiendo el tipo `Specimen` definido en `src/types/specimen.ts`.

Campos mínimos recomendados:

```ts
{
  id: "pvf-001",
  name: "Nombre de la pieza",
  slug: "nombre-de-la-pieza",
  inventoryNumber: "FCEyN-PV-001",
  description: "Descripción pública y clara de la pieza.",
  category: "Cráneo",
  period: "Pleistoceno tardío",
  provenance: "Procedencia institucional o geográfica",
  modelUrl: "/models/nombre-de-la-pieza.glb",
  thumbnailUrl: "/specimens/nombre-de-la-pieza.jpg",
  credits: "Créditos curatoriales y de digitalización.",
  license: "Condiciones de uso.",
}
```

Campos científicos opcionales:

- `taxon`
- `geologicalFormation`
- `estimatedAge`
- `material`
- `dimensions`
- `collector`
- `digitizationDate`
- `digitizationMethod`
- `doi`
- `bibliographicCitation`

Los campos opcionales pueden omitirse. La ficha de detalle solo muestra los metadatos que tienen contenido.

## Dónde guardar archivos 3D

Para una demo o catálogo chico, se pueden guardar modelos en `public/models/` y referenciarlos como `/models/archivo.glb`.

Para un repositorio institucional con modelos pesados, conviene usar almacenamiento externo o CDN institucional y guardar la URL absoluta en `modelUrl`.

Recomendaciones para `.glb`:

- Usar `.glb` como formato principal para web.
- Optimizar peso antes de publicar.
- Mantener texturas comprimidas cuando sea posible.
- Evitar nombres con espacios o caracteres especiales.
- Usar slugs estables, por ejemplo `craneo-fosil-fceyn-001.glb`.
- Verificar que el servidor exponga correctamente el archivo y permita acceso público.

## Miniaturas

Las miniaturas se referencian con `thumbnailUrl`.

Para archivos locales, usar `public/specimens/`:

```txt
public/specimens/craneo-fosil-fceyn-001.jpg
```

Y en datos:

```ts
thumbnailUrl: "/specimens/craneo-fosil-fceyn-001.jpg";
```

## Buenas prácticas curatoriales

- Diferenciar datos confirmados de datos preliminares.
- No publicar procedencias sensibles si pueden comprometer sitios paleontológicos.
- Incluir créditos de digitalización y curaduría.
- Definir condiciones de uso antes de abrir descargas o reutilización.
- Mantener identificadores institucionales estables.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.
