import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

      {/* Description Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-lg text-text">{description}</p>
          </div>

          {/* Credentials Card */}
          <div className="mx-auto max-w-2xl mb-12">
            <Card className="border-border/50 bg-white">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-foreground">
                  {credentials.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {credentials.fields.map((field) => {
                  const IconComponent = credentialIconMap[field.label] || KeyRound;
                  return (
                    <div
                      key={field.label}
                      className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border/50"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle">
                          <IconComponent className="h-5 w-5 text-brand" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{field.label}</p>
                        <p className="text-sm text-muted-foreground">{field.description}</p>
                      </div>
                    </div>
                  );
                })}
                <p className="text-center text-sm text-muted-foreground pt-2">
                  {credentials.note}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mx-auto max-w-4xl mb-12">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              {features.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.items.map((item) => {
                const IconComponent = featureIconMap[item] || CheckCircle2;
                return (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white border border-border/50"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle">
                        <IconComponent className="h-5 w-5 text-brand" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="font-medium text-foreground">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Note */}
          <div className="mx-auto max-w-2xl text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border/50 text-muted-foreground">
              <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{compatibility}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild size="lg" className="text-base">
              <Link
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.label}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
