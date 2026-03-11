import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <>
      {/* Hero Section with dramatic background */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-street.webp"
            alt="Verona"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
        </div>

        <div className="relative z-10 container-custom py-16 lg:py-32 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Alert badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-500/25 px-4 py-1.5 mb-6 lg:mb-8">
              <AlertTriangle className="w-4 h-4 text-red-400" aria-hidden="true" />
              <span className="text-sm font-medium text-red-400 tracking-wide">
                {EMERGENZE.hero.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-hero font-bold text-white mb-6 tracking-tight">
              {EMERGENZE.hero.title}
            </h1>

            {/* Description */}
            <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10 lg:mb-14">
              {EMERGENZE.description}
            </p>

            {/* Emergency Number Card */}
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 lg:p-12 mb-8 lg:mb-10">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/5 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15">
                    <Phone className="w-5 h-5 text-red-400" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-red-400 tracking-wider uppercase">
                    Numero verde
                  </span>
                </div>

                {/* Giant Phone Number */}
                <a
                  href={EMERGENZE.cta.href}
                  className="block text-3xl sm:text-5xl lg:text-7xl font-bold text-white hover:text-red-300 transition-colors duration-300 tracking-tight"
                >
                  {EMERGENZE.number}
                </a>

                <p className="mt-4 lg:mt-6 text-xs lg:text-sm text-white/50">
                  Attivo per tutti i condomini gestiti da {COMPANY.name}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-base px-10 shadow-lg shadow-red-900/20 w-full sm:w-auto"
            >
              <a href={EMERGENZE.cta.href}>
                <Phone className="w-5 h-5 mr-2" />
                {EMERGENZE.cta.label}
              </a>
            </Button>

            {/* Additional Info */}
            <p className="mt-10 lg:mt-14 text-xs lg:text-sm text-white/40">
              Per comunicazioni non urgenti, visita la pagina{" "}
              <Link
                href="/contatti"
                className="text-white/60 hover:text-white underline underline-offset-4 transition-colors"
              >
                Contatti
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
