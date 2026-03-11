import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Star, Users, Heart, type LucideIcon } from "lucide-react";
import { CHI_SIAMO, SITE_META } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Chi siamo | ${SITE_META.title}`,
  description:
    "Scopri la storia di AMCO Service, amministrazione condominiale a Verona dal 2002. Professionalità, trasparenza e vicinanza ai clienti.",
  openGraph: {
    title: `Chi siamo | ${SITE_META.title}`,
    description:
      "Scopri la storia di AMCO Service, amministrazione condominiale a Verona dal 2002. Professionalità, trasparenza e vicinanza ai clienti.",
    url: `${SITE_META.url}/chi-siamo`,
    locale: SITE_META.locale,
    siteName: SITE_META.title,
    type: "website",
  },
};

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Star,
  Users,
  Heart,
};

export default function ChiSiamoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] lg:min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-piazza.jpg"
            alt="Piazza di Verona"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="relative z-10 container-custom py-16 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4 opacity-90">
              La nostra storia
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-hero font-bold text-white mb-5 leading-tight tracking-tight">
              {CHI_SIAMO.hero.title}
            </h1>
            <p className="text-base lg:text-xl text-white/85 leading-relaxed">
              {CHI_SIAMO.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="max-w-xl">
              {CHI_SIAMO.story.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base lg:text-lg text-text leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/verona-detail.jpg"
                alt="Dettaglio architettonico veronese"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 lg:py-28 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
              I nostri valori
            </p>
            <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-4 tracking-tight">
              {CHI_SIAMO.pillars.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {CHI_SIAMO.pillars.items.map((pillar) => {
              const IconComponent = iconMap[pillar.icon];
              return (
                <Card
                  key={pillar.title}
                  className="group card-hover border-border/40 bg-white text-center"
                >
                  <CardContent className="pt-6 pb-5 px-4 lg:pt-8 lg:pb-7 lg:px-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-subtle flex items-center justify-center mx-auto mb-5 transition-colors group-hover:bg-brand/15">
                      {IconComponent && (
                        <IconComponent className="w-7 h-7 text-brand" />
                      )}
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-text text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-40 md:h-56 lg:h-72 overflow-hidden">
        <Image
          src="/images/verona-ponte.jpg"
          alt="Ponte di Verona"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Future Section */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
              Guardando avanti
            </p>
            <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-6 tracking-tight">
              {CHI_SIAMO.future.title}
            </h2>
            <p className="text-base lg:text-lg text-text leading-relaxed">
              {CHI_SIAMO.future.content}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
