import { type Metadata } from "next";
import { Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMERGENZE, COMPANY, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Emergenze | ${SITE_META.title}`,
  description:
    "Numero verde emergenze per i condomini gestiti da AMCO Service. Assistenza immediata per interventi urgenti.",
  openGraph: {
    title: `Emergenze | ${SITE_META.title}`,
    description:
      "Numero verde emergenze per i condomini gestiti da AMCO Service. Assistenza immediata per interventi urgenti.",
    url: `${SITE_META.url}/emergenze`,
  },
};

export default function EmergenzePage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-surface">
      <div className="container-custom py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Alert Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {EMERGENZE.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-text-muted mb-6">
            {EMERGENZE.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-base text-text mb-12 max-w-lg mx-auto">
            {EMERGENZE.description}
          </p>

          {/* Emergency Number - Prominent */}
          <div className="bg-white border-2 border-red-200 rounded-2xl p-8 lg:p-12 shadow-lg mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Phone className="w-8 h-8 text-red-600" />
              <span className="text-sm font-medium text-red-600 uppercase tracking-wide">
                Numero verde
              </span>
            </div>

            {/* Giant Phone Number */}
            <a
              href={EMERGENZE.cta.href}
              className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-red-600 hover:text-red-700 transition-colors tracking-tight"
            >
              {EMERGENZE.number}
            </a>

            <p className="mt-4 text-sm text-text-muted">
              Attivo per tutti i condomini gestiti da {COMPANY.name}
            </p>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6"
          >
            <a href={EMERGENZE.cta.href}>
              <Phone className="w-6 h-6" />
              {EMERGENZE.cta.label}
            </a>
          </Button>

          {/* Additional Info */}
          <p className="mt-12 text-sm text-text-muted">
            Per comunicazioni non urgenti, visita la pagina{" "}
            <a
              href="/contatti"
              className="text-brand hover:text-brand-dark underline underline-offset-4"
            >
              Contatti
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
