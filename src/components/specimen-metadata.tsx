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
    <aside className="paleo-panel rounded-3xl p-5 lg:sticky lg:top-24">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="default">{specimen.category}</Badge>
          <span className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
            Ficha científica
          </span>
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-semibold tracking-[-0.03em]">
            {specimen.name}
          </h1>
          <p className="text-primary mt-2 font-mono text-xs tracking-[0.14em] uppercase">
            {specimen.inventoryNumber}
          </p>
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            {specimen.description}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {metadataSections.map((section, sectionIndex) => {
          const visibleFields = getVisibleFields(specimen, section.fields);
          const sectionId = `metadata-section-${sectionIndex}`;

          if (visibleFields.length === 0) {
            return null;
          }

          return (
            <section key={section.title} aria-labelledby={sectionId}>
              <Separator className="mb-4 bg-[var(--paleo-border)]" />
              <h2
                id={sectionId}
                className="text-primary font-mono text-[0.68rem] font-semibold tracking-[0.2em] uppercase"
              >
                {section.title}
              </h2>
              <dl className="mt-4 grid gap-3">
                {visibleFields.map(({ label, key }) => (
                  <div
                    key={key}
                    className="bg-secondary/35 rounded-2xl border border-[var(--paleo-border)] p-3"
                  >
                    <dt className="text-muted-foreground font-mono text-[0.62rem] font-semibold tracking-[0.16em] uppercase">
                      {label}
                    </dt>
                    <dd className="text-foreground/86 mt-1 text-sm leading-6 break-words">
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
