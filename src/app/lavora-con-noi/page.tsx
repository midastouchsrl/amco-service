import { type Metadata } from "next";
import Image from "next/image";
import { Mail, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LAVORA_CON_NOI, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Lavora con noi | ${SITE_META.title}`,
  description:
    "Unisciti al team di AMCO Service. Siamo sempre alla ricerca di talenti motivati per l'amministrazione condominiale a Verona.",
  openGraph: {
    title: `Lavora con noi | ${SITE_META.title}`,
    description:
      "Unisciti al team di AMCO Service. Siamo sempre alla ricerca di talenti motivati per l'amministrazione condominiale a Verona.",
    url: `${SITE_META.url}/lavora-con-noi`,
  },
};

export default function LavoraConNoiPage() {
  const mailtoLink = `mailto:${LAVORA_CON_NOI.cta.email}?subject=${encodeURIComponent(
    LAVORA_CON_NOI.cta.subject
  )}`;

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-panorama.jpg"
            alt="Panorama di Verona"
            fill
            className="object-cover object-center opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-16 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              Carriere
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-hero mb-5">
              {LAVORA_CON_NOI.hero.title}
            </h1>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed">
              {LAVORA_CON_NOI.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* Intro */}
            <div className="text-center mb-10 lg:mb-14">
              <div className="inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-brand-subtle mb-5">
                <Users className="h-6 w-6 lg:h-7 lg:w-7 text-brand" aria-hidden="true" />
              </div>
              <p className="text-base lg:text-lg text-text leading-relaxed max-w-lg mx-auto">
                {LAVORA_CON_NOI.intro}
              </p>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl border border-border/40 bg-surface p-6 lg:p-10 text-center">
              <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
                Candidati
              </p>
              <h2 className="text-lg lg:text-xl font-bold text-foreground tracking-tight mb-4">
                {LAVORA_CON_NOI.cta.text}
              </h2>

              {/* Email Link */}
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-3 text-lg lg:text-2xl font-semibold text-brand hover:text-brand-dark transition-colors duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle">
                  <Mail className="w-5 h-5 text-brand" aria-hidden="true" />
                </div>
                {LAVORA_CON_NOI.cta.email}
              </a>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="text-base px-10 w-full sm:w-auto"
                >
                  <a href={mailtoLink}>
                    <Send className="w-4 h-4 mr-2" />
                    Invia candidatura
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
