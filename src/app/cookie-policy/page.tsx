import { COOKIE_POLICY, SITE_META } from "@/lib/constants";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_META.title}`,
  description:
    "Informazioni sui cookie utilizzati dal sito AMCO Service. Scopri come gestire le tue preferenze sui cookie.",
  openGraph: {
    title: `Cookie Policy | ${SITE_META.title}`,
    description:
      "Informazioni sui cookie utilizzati dal sito AMCO Service. Scopri come gestire le tue preferenze sui cookie.",
    url: `${SITE_META.url}/cookie-policy`,
    locale: SITE_META.locale,
    siteName: SITE_META.title,
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-hero font-bold text-foreground mb-4 leading-tight">
              {COOKIE_POLICY.hero.title}
            </h1>
            <p className="text-lg text-text">
              {COOKIE_POLICY.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {COOKIE_POLICY.intro.title}
            </h2>
            <p className="text-text leading-relaxed">
              {COOKIE_POLICY.intro.content}
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Table Section */}
      <section className="section-padding bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">
              {COOKIE_POLICY.cookies.title}
            </h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground bg-muted rounded-tl-lg">
                      Nome
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground bg-muted">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground bg-muted">
                      Finalità
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground bg-muted">
                      Durata
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground bg-muted rounded-tr-lg">
                      Parte
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_POLICY.cookies.items.map((cookie, index) => (
                    <tr
                      key={cookie.name}
                      className={`border-b border-border last:border-b-0 ${
                        index % 2 === 0 ? "bg-white" : "bg-muted/50"
                      }`}
                    >
                      <td className="py-3 px-4 text-sm text-foreground font-medium">
                        {cookie.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-text">
                        {cookie.type}
                      </td>
                      <td className="py-3 px-4 text-sm text-text">
                        {cookie.purpose}
                      </td>
                      <td className="py-3 px-4 text-sm text-text">
                        {cookie.duration}
                      </td>
                      <td className="py-3 px-4 text-sm text-text">
                        {cookie.party}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Management Section */}
      <section className="section-padding bg-white">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {COOKIE_POLICY.manage.title}
            </h2>
            <p className="text-text leading-relaxed mb-6">
              Puoi gestire le preferenze dei cookie direttamente dalle impostazioni del tuo browser. Ecco le guide ufficiali per i browser più comuni:
            </p>

            <ul className="space-y-3">
              {COOKIE_POLICY.manage.browsers.map((browser) => (
                <li key={browser.name}>
                  <a
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand hover:text-brand-dark transition-colors link-underline"
                  >
                    <span>{browser.name}</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Revoke Consent Section */}
      <section className="section-padding bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {COOKIE_POLICY.revoke.title}
            </h2>
            <p className="text-text leading-relaxed">
              {COOKIE_POLICY.revoke.content}
            </p>
          </div>
        </div>
      </section>

      {/* Last Update Section */}
      <section className="py-8 bg-white border-t border-border">
        <div className="container-text">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground">
              Ultimo aggiornamento: {COOKIE_POLICY.lastUpdate}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
