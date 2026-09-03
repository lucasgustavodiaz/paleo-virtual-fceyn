# Paleo Virtual FCEyN

Visualizador web para objetos 3D del repositorio paleontológico de la Facultad de Ciencias Exactas y Naturales.

La primera versión incluye home institucional, colección navegable, búsqueda, filtros, ficha de detalle y visualizador 3D para modelos `.glb` o `.gltf`.

La interfaz usa una identidad visual dark-first con modo claro equivalente, acentos cyan/aqua, miniaturas SVG generadas para el catálogo inicial, favicon propio y preview Open Graph integrado al mismo sistema visual.

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
npm run e2e
npm run start
npm run lint
npm run test
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

## Validación visual

Antes de publicar cambios de interfaz, revisar manualmente:

- Modo claro y oscuro en `/`, `/collection`, `/about` y `/specimens/[slug]`.
- Navegación mobile, sheet lateral y cards de colección.
- Viewer 3D con modelo disponible, URL inválida, modelo pendiente y botón VR en un dispositivo WebXR compatible.
- Preview generado en `/opengraph-image`.
- Favicon generado en `/icon.svg` y su lectura a tamaño de pestaña.

## Funcionalidades de interfaz

- La colección persiste búsqueda, filtros y ordenamiento en la URL para compartir vistas filtradas.
- Las fichas de espécimen incluyen navegación anterior/siguiente y descarga del registro actual en JSON.
- El viewer 3D incluye pantalla completa, reset de cámara, ayuda contextual, auto-giro, selector de iluminación y fallback cuando WebGL no está disponible.
- Las acciones externas del modelo incluyen compartir, copiar enlace, copiar código embed, abrir/descargar GLB, descargar JSON, like local y métricas locales de vistas/descargas.
- El inspector del viewer puede iniciar una sesión VR real vía WebXR cuando el navegador y el dispositivo soportan `immersive-vr`; si no hay soporte, el botón queda deshabilitado.
- El sitio expone `/sitemap.xml`, `/robots.txt`, `/opengraph-image` y `/icon.svg` desde App Router.

## Tests

Los tests unitarios cubren la lógica pura de búsqueda, filtros, conteos y ordenamiento de colección en `src/lib/collection-utils.test.ts`.

```bash
npm run test
```

Los tests e2e base cubren rutas principales, búsqueda compartible y ficha de detalle:

```bash
npm run e2e
```

En una máquina nueva puede ser necesario instalar navegadores de Playwright antes de ejecutar e2e:

```bash
npx playwright install
```

## CI

El workflow `.github/workflows/ci.yml` corre instalación limpia, lint, tests unitarios, typecheck, format check y build en push a `main` y pull requests.

## Nota sobre Three.js

`@react-three/fiber@9.7.0` todavía instancia `THREE.Clock` internamente, por eso Three.js puede emitir el warning `THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.`. El código de la app no instancia `THREE.Clock` directamente. Se prioriza mantener `three` actualizado y conservar `Environment preset="studio"` porque aporta iluminación/reflejos importantes al visor 3D. Revisar upgrades de Fiber/Drei cuando migren internamente a `THREE.Timer`.

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
