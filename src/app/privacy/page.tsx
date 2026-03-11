import { type Metadata } from "next";
import { PRIVACY, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Informativa Privacy | ${SITE_META.title}`,
  description:
    "Informativa privacy ai sensi dell'art. 13 del GDPR. Scopri come AMCO Service tratta i tuoi dati personali.",
  openGraph: {
    title: `Informativa Privacy | ${SITE_META.title}`,
    description:
      "Informativa privacy ai sensi dell'art. 13 del GDPR. Scopri come AMCO Service tratta i tuoi dati personali.",
    url: `${SITE_META.url}/privacy`,
  },
};

export default function PrivacyPage() {
  const { sections, lastUpdate } = PRIVACY;

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-surface border-b border-border">
        <div className="container-custom py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {PRIVACY.hero.title}
            </h1>
            <p className="text-lg text-text-muted">
              {PRIVACY.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container-custom py-12 lg:py-16">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Section 1: Titolare del trattamento */}
          <section className="bg-surface rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.controller.title}
            </h2>
            <address className="not-italic text-text space-y-1">
              {sections.controller.content.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </address>
          </section>

          {/* Section 2: Finalita e base giuridica */}
          <section className="bg-white border border-border rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">
              {sections.purposes.title}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-medium text-foreground">
                      Finalit&agrave;
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Base giuridica
                    </th>
                    <th className="text-left py-3 pl-4 font-medium text-foreground">
                      Dati trattati
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sections.purposes.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 pr-4 text-text align-top">
                        {item.purpose}
                      </td>
                      <td className="py-4 px-4 text-text-muted align-top">
                        {item.basis}
                      </td>
                      <td className="py-4 pl-4 text-text-muted align-top">
                        {item.data}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Categorie di dati personali */}
          <section className="bg-surface rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.categories.title}
            </h2>
            <ul className="space-y-2">
              {sections.categories.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Destinatari dei dati */}
          <section className="bg-white border border-border rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.recipients.title}
            </h2>
            <ul className="space-y-2 mb-4">
              {sections.recipients.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {"note" in sections.recipients && (
              <p className="text-sm text-text-muted leading-relaxed pt-4 border-t border-border">
                {sections.recipients.note}
              </p>
            )}
          </section>

          {/* Section 5: Trasferimenti extra-UE */}
          <section className="bg-surface rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.transfers.title}
            </h2>
            <p className="text-text leading-relaxed">
              {sections.transfers.content}
            </p>
          </section>

          {/* Section 6: Periodo di conservazione */}
          <section className="bg-white border border-border rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.retention.title}
            </h2>
            <ul className="space-y-2">
              {sections.retention.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7: Diritti dell'interessato */}
          <section className="bg-surface rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.rights.title}
            </h2>
            {"intro" in sections.rights && (
              <p className="text-text leading-relaxed mb-6">
                {sections.rights.intro}
              </p>
            )}
            <ul className="space-y-2 mb-6">
              {sections.rights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border space-y-1">
              <p className="text-text font-medium">
                {sections.rights.complaint.label}
              </p>
              {"authority" in sections.rights.complaint && (
                <p className="text-text-muted text-sm">
                  {sections.rights.complaint.authority}
                </p>
              )}
              <p className="text-text-muted text-sm">
                {sections.rights.complaint.address}
              </p>
              {"email" in sections.rights.complaint && (
                <p className="text-text-muted text-sm">
                  Email: {sections.rights.complaint.email}
                </p>
              )}
              <a
                href={`https://${sections.rights.complaint.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark text-sm underline underline-offset-4 inline-block"
              >
                {sections.rights.complaint.website}
              </a>
            </div>
          </section>

          {/* Section 8: Conferimento dei dati */}
          <section className="bg-white border border-border rounded-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
              {sections.provision.title}
            </h2>
            <p className="text-text leading-relaxed">
              {sections.provision.content}
            </p>
          </section>

          {/* Section 9: Processi decisionali automatizzati */}
          {"automatedDecisions" in sections && (
            <section className="bg-surface rounded-xl p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                {sections.automatedDecisions.title}
              </h2>
              <p className="text-text leading-relaxed">
                {sections.automatedDecisions.content}
              </p>
            </section>
          )}

          {/* Last Update */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-text-muted">
              Ultimo aggiornamento: {lastUpdate}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
