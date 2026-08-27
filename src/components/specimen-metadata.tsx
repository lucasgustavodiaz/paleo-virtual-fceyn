import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Specimen } from "@/types/specimen";

type SpecimenMetadataProps = {
  specimen: Specimen;
};

type MetadataField = {
  label: string;
  key: keyof Specimen;
};

type MetadataSection = {
  title: string;
  fields: MetadataField[];
};

const metadataSections: MetadataSection[] = [
  {
    title: "Información general",
    fields: [
      { label: "Identificador", key: "inventoryNumber" },
      { label: "Categoría", key: "category" },
      { label: "Procedencia", key: "provenance" },
      { label: "Material", key: "material" },
      { label: "Dimensiones", key: "dimensions" },
    ],
  },
  {
    title: "Contexto paleontológico",
    fields: [
      { label: "Taxón", key: "taxon" },
      { label: "Período", key: "period" },
      { label: "Edad estimada", key: "estimatedAge" },
      { label: "Formación geológica", key: "geologicalFormation" },
      { label: "Colector", key: "collector" },
    ],
  },
  {
    title: "Digitalización 3D",
    fields: [
      { label: "Método", key: "digitizationMethod" },
      { label: "Fecha", key: "digitizationDate" },
      { label: "Archivo 3D", key: "modelUrl" },
    ],
  },
  {
    title: "Créditos y uso",
    fields: [
      { label: "Créditos", key: "credits" },
      { label: "Licencia", key: "license" },
      { label: "DOI", key: "doi" },
      { label: "Cita bibliográfica", key: "bibliographicCitation" },
    ],
  },
];

function getVisibleFields(specimen: Specimen, fields: MetadataField[]) {
  return fields.filter(({ key }) => {
    const value = specimen[key];

    return typeof value === "string" && value.trim().length > 0;
  });
}

export function SpecimenMetadata({ specimen }: SpecimenMetadataProps) {
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm lg:sticky lg:top-24 dark:border-stone-800 dark:bg-stone-900">
      <div className="space-y-3">
        <Badge variant="secondary">{specimen.category}</Badge>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            {specimen.name}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            {specimen.description}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-6">
        {metadataSections.map((section, sectionIndex) => {
          const visibleFields = getVisibleFields(specimen, section.fields);
          const sectionId = `metadata-section-${sectionIndex}`;

          if (visibleFields.length === 0) {
            return null;
          }

          return (
            <section key={section.title} aria-labelledby={sectionId}>
              <Separator className="mb-4" />
              <h2
                id={sectionId}
                className="text-sm font-semibold tracking-[0.18em] text-stone-500 uppercase dark:text-stone-400"
              >
                {section.title}
              </h2>
              <dl className="mt-4 space-y-4">
                {visibleFields.map(({ label, key }) => (
                  <div key={key}>
                    <dt className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase dark:text-stone-400">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 break-words text-stone-800 dark:text-stone-200">
                      {specimen[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
