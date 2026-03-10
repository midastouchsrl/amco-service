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

// Icon mapping for pillars
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
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-street.webp"
            alt="Strada di Verona"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-20 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-hero font-bold text-white mb-4 leading-tight">
              {CHI_SIAMO.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              {CHI_SIAMO.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {CHI_SIAMO.story.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-text leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-4">
              {CHI_SIAMO.pillars.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHI_SIAMO.pillars.items.map((pillar) => {
              const IconComponent = iconMap[pillar.icon];
              return (
                <Card
                  key={pillar.title}
                  className="card-hover border-border/50 bg-white text-center"
                >
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-subtle flex items-center justify-center mx-auto mb-5">
                      {IconComponent && (
                        <IconComponent className="w-7 h-7 text-brand" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
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

      {/* Future Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-6">
              {CHI_SIAMO.future.title}
            </h2>
            <p className="text-lg text-text leading-relaxed">
              {CHI_SIAMO.future.content}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
