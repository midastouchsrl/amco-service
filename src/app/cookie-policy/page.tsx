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
      <section className="py-20 lg:py-28 bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
              Legale
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-hero font-bold text-foreground mb-5 leading-tight tracking-tight">
              {COOKIE_POLICY.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {COOKIE_POLICY.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 tracking-tight">
              {COOKIE_POLICY.intro.title}
            </h2>
            <p className="text-text leading-relaxed">
              {COOKIE_POLICY.intro.content}
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Table Section */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-8 tracking-tight">
              {COOKIE_POLICY.cookies.title}
            </h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-2xl border border-border/40 bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-surface/50">
                      Nome
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-surface/50">
                      Tipo
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-surface/50">
                      Finalità
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-surface/50">
                      Durata
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-surface/50">
                      Parte
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_POLICY.cookies.items.map((cookie, index) => (
                    <tr
                      key={cookie.name}
                      className={`border-b border-border/30 last:border-b-0 ${
                        index % 2 === 1 ? "bg-surface/30" : ""
                      }`}
                    >
                      <td className="py-4 px-5 text-sm text-foreground font-medium">
                        <code className="rounded-md bg-surface px-2 py-0.5 text-xs font-mono">
                          {cookie.name}
                        </code>
                      </td>
                      <td className="py-4 px-5 text-sm text-text">
                        <span className="inline-flex items-center rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand">
                          {cookie.type}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-sm text-text leading-relaxed">
                        {cookie.purpose}
                      </td>
                      <td className="py-4 px-5 text-sm text-text">
                        {cookie.duration}
                      </td>
                      <td className="py-4 px-5 text-sm text-text">
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
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 tracking-tight">
              {COOKIE_POLICY.manage.title}
            </h2>
            <p className="text-text leading-relaxed mb-8">
              Puoi gestire le preferenze dei cookie direttamente dalle impostazioni del tuo browser. Ecco le guide ufficiali per i browser più comuni:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {COOKIE_POLICY.manage.browsers.map((browser) => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/40 bg-surface/50 p-4 transition-all duration-200 hover:border-brand/20 hover:bg-surface"
                >
                  <span className="font-medium text-foreground group-hover:text-brand transition-colors">
                    {browser.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-brand transition-colors ml-auto" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revoke Consent Section */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="container-text">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 tracking-tight">
              {COOKIE_POLICY.revoke.title}
            </h2>
            <p className="text-text leading-relaxed">
              {COOKIE_POLICY.revoke.content}
            </p>
          </div>
        </div>
      </section>

      {/* Last Update Section */}
      <section className="py-8 bg-white border-t border-border/40">
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
