import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileDown, Download, Info } from "lucide-react";
import { MODULISTICA, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Modulistica | ${SITE_META.title}`,
  description:
    "Scarica i moduli per il tuo condominio. Modulo anagrafica condominiale e altri documenti utili da AMCO Service.",
  openGraph: {
    title: `Modulistica | ${SITE_META.title}`,
    description:
      "Scarica i moduli per il tuo condominio. Modulo anagrafica condominiale e altri documenti utili.",
    url: `${SITE_META.url}/modulistica`,
  },
};

export default function ModulisticaPage() {
  const { hero, documents, note } = MODULISTICA;

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-detail.jpg"
            alt="Dettaglio architettonico veronese"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              Documenti
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-5">
              {hero.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">{hero.subtitle}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Documents Section */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            {/* Section label */}
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
                Download
              </p>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Moduli disponibili
              </h2>
            </div>

            {/* Document Cards */}
            <div className="space-y-5 mb-10">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-border/40 bg-white p-6 lg:p-8 transition-all duration-300 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle transition-colors duration-300 group-hover:bg-brand/15">
                        <FileDown className="h-7 w-7 text-brand" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1.5 tracking-tight">
                        {doc.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {doc.description}
                      </p>
                      <Button asChild size="lg" className="text-base">
                        <Link
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                          Scarica PDF
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="flex items-center justify-center gap-3 text-center rounded-xl bg-white border border-border/40 p-5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-surface">
                <Info className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
