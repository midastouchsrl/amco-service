import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground">{hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            {/* Document Cards */}
            <div className="space-y-6 mb-10">
              {documents.map((doc, index) => (
                <Card
                  key={index}
                  className="group border-border/50 bg-white card-hover"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-subtle transition-colors group-hover:bg-brand/20">
                          <FileDown className="h-7 w-7 text-brand" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {doc.description}
                        </p>
                        <Button asChild className="group/btn">
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Note */}
            <div className="flex items-center justify-center gap-2 text-center p-4 rounded-lg bg-white border border-border/50">
              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
