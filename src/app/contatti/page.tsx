import { type Metadata } from "next";
import { MapPin, Phone, Mail, AlertCircle, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTATTI, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contatti | ${SITE_META.title}`,
  description:
    "Contatta AMCO Service per informazioni sull'amministrazione condominiale a Verona. Telefono, email e form di contatto.",
  openGraph: {
    title: `Contatti | ${SITE_META.title}`,
    description:
      "Contatta AMCO Service per informazioni sull'amministrazione condominiale a Verona.",
    url: `${SITE_META.url}/contatti`,
  },
};

export default function ContattiPage() {
  const { hero, info, map } = CONTATTI;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground">{hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contenuto principale - 2 colonne */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Colonna sinistra - Informazioni */}
              <div className="space-y-8">
                {/* Titolo sezione info */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {info.title}
                  </h2>
                </div>

                {/* Avviso appuntamento */}
                <div className="flex items-start gap-3 rounded-xl bg-brand-light border border-brand/20 p-4">
                  <AlertCircle className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="font-semibold text-foreground">
                    {info.notice}
                  </p>
                </div>

                {/* Indirizzo */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                    <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.address}</p>
                    {/* Link mappa */}
                    <a
                      href={map.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline mt-2"
                    >
                      {map.linkText}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Telefonate */}
                <div className="space-y-4">
                  {info.phones.map((phone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                        <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
                      </div>
                      <div>
                        <a
                          href={`tel:${phone.number.replace(/\s/g, "")}`}
                          className="font-medium text-foreground hover:text-brand transition-colors"
                        >
                          {phone.number}
                        </a>
                        {phone.hours && (
                          <p className="text-sm text-muted-foreground">{phone.hours}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Numero verde emergenze */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <Phone className="h-5 w-5 text-destructive" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.emergency.label}</p>
                      <a
                        href={`tel:${info.emergency.number.replace(/\s/g, "")}`}
                        className="font-semibold text-destructive hover:underline"
                      >
                        {info.emergency.number}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                    <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <a
                      href={`mailto:${info.email}`}
                      className="font-medium text-foreground hover:text-brand transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Colonna destra - Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
