import { type Metadata } from "next";
import Image from "next/image";
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
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-detail.jpg"
            alt="Architettura veronese"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              Contattaci
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-5">
              {hero.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">{hero.subtitle}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Contenuto principale - 2 colonne */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Colonna sinistra - Informazioni */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-medium text-brand tracking-wider uppercase mb-2">
                    Informazioni
                  </p>
                  <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                    {info.title}
                  </h2>
                </div>

                {/* Avviso appuntamento */}
                <div className="flex items-start gap-3 rounded-xl bg-brand-light border border-brand/20 p-4">
                  <AlertCircle className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="font-semibold text-foreground text-[15px]">
                    {info.notice}
                  </p>
                </div>

                {/* Indirizzo */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-border/50">
                    <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.address}</p>
                    <a
                      href={map.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline underline-offset-4 mt-2"
                    >
                      {map.linkText}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Telefoni */}
                <div className="space-y-4">
                  {info.phones.map((phone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-border/50">
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
                          <p className="text-sm text-muted-foreground mt-0.5">{phone.hours}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Numero verde emergenze */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20">
                      <Phone className="h-5 w-5 text-destructive" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.emergency.label}</p>
                      <a
                        href={`tel:${info.emergency.number.replace(/\s/g, "")}`}
                        className="font-semibold text-destructive hover:underline underline-offset-4"
                      >
                        {info.emergency.number}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-border/50">
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
