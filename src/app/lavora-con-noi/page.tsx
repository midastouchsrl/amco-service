import { type Metadata } from "next";
import { Mail, Send } from "lucide-react";
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
    <main className="min-h-[80vh] flex items-center justify-center bg-surface">
      <div className="container-custom py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-subtle">
              <Mail className="w-10 h-10 text-brand" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {LAVORA_CON_NOI.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-text-muted mb-8">
            {LAVORA_CON_NOI.hero.subtitle}
          </p>

          {/* Intro Text */}
          <p className="text-base text-text mb-12 max-w-lg mx-auto leading-relaxed">
            {LAVORA_CON_NOI.intro}
          </p>

          {/* CTA Card */}
          <div className="bg-white border border-border rounded-2xl p-8 lg:p-10 shadow-sm mb-8">
            <p className="text-text mb-6">
              {LAVORA_CON_NOI.cta.text}
            </p>

            {/* Email Link */}
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 text-2xl font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              <Mail className="w-6 h-6" />
              {LAVORA_CON_NOI.cta.email}
            </a>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-brand hover:bg-brand-dark text-white text-lg px-10 py-6"
          >
            <a href={mailtoLink}>
              <Send className="w-5 h-5" />
              Invia candidatura
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
