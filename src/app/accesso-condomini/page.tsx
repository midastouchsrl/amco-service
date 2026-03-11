import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  KeyRound,
  MonitorSmartphone,
  FileText,
  MessageSquare,
  Building2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { ACCESSO_CONDOMINI, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Accesso Condomini | ${SITE_META.title}`,
  description:
    "Accedi al portale dedicato per consultare documenti, scadenze e comunicazioni del tuo condominio. Gestisci la tua posizione online con AMCO Service.",
  openGraph: {
    title: `Accesso Condomini | ${SITE_META.title}`,
    description:
      "Accedi al portale dedicato per consultare documenti, scadenze e comunicazioni del tuo condominio.",
    url: `${SITE_META.url}/accesso-condomini`,
  },
};

const credentialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PID: KeyRound,
  Login: KeyRound,
  Password: KeyRound,
};

const featureIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Consultazione scadenze": MonitorSmartphone,
  "Download documenti": FileText,
  "Comunicazioni con l'amministrazione": MessageSquare,
  "Informazioni condominiali": Building2,
};

export default function AccessoCondominiPage() {
  const { hero, description, credentials, features, compatibility, cta } = ACCESSO_CONDOMINI;

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-ponte.jpg"
            alt="Ponte di Verona"
            fill
            className="object-cover object-center opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-16 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              Area riservata
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-hero mb-5">
              {hero.title}
            </h1>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description + CTA */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center mb-10 lg:mb-16">
            <p className="text-base lg:text-lg text-text leading-relaxed">{description}</p>
            <div className="mt-8">
              <Button asChild size="lg" className="text-base px-10 w-full sm:w-auto">
                <Link
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cta.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Credentials Card */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border/40 bg-surface p-4 lg:p-8">
              <div className="text-center mb-5 lg:mb-6">
                <p className="text-sm font-medium text-brand tracking-wider uppercase mb-2">
                  Primo accesso
                </p>
                <h2 className="text-lg lg:text-xl font-bold text-foreground tracking-tight">
                  {credentials.title}
                </h2>
              </div>

              <div className="space-y-3">
                {credentials.fields.map((field) => {
                  const IconComponent = credentialIconMap[field.label] || KeyRound;
                  return (
                    <div
                      key={field.label}
                      className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-white border border-border/40 transition-all duration-200 hover:border-brand/20 hover:shadow-sm"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle">
                          <IconComponent className="h-5 w-5 text-brand" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm lg:text-base">{field.label}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{field.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-5">
                {credentials.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-28 bg-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10 lg:mb-14">
              <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
                Funzionalità
              </p>
              <h2 className="text-xl lg:text-h2 font-bold text-foreground tracking-tight">
                {features.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {features.items.map((item) => {
                const IconComponent = featureIconMap[item] || CheckCircle2;
                return (
                  <div
                    key={item}
                    className="group flex items-center gap-3 lg:gap-4 p-4 lg:p-5 rounded-2xl bg-white border border-border/40 transition-all duration-300 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-brand-subtle transition-colors duration-300 group-hover:bg-brand/15">
                        <IconComponent className="h-5 w-5 text-brand" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="font-medium text-foreground text-sm lg:text-base">{item}</p>
                  </div>
                );
              })}
            </div>

            {/* Compatibility Note */}
            <div className="mt-8 lg:mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full bg-white border border-border/40 text-muted-foreground">
                <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs lg:text-sm">{compatibility}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
