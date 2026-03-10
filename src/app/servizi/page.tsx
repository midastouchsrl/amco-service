import { type Metadata } from "next";
import {
  Receipt,
  MonitorSmartphone,
  CreditCard,
  Users,
  FileBarChart,
  CalendarDays,
  HardHat,
  Landmark,
  Phone,
  PiggyBank,
  FileSpreadsheet,
  ArrowLeftRight,
  Wallet,
  FileText,
  FileCheck,
  ShieldAlert,
  Send,
  Banknote,
  Percent,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SERVIZI, SITE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Servizi | ${SITE_META.title}`,
  description:
    "Scopri i servizi di amministrazione condominiale e elaborazione dati offerti da AMCO Service a Verona. Gestione completa del tuo condominio.",
  openGraph: {
    title: `Servizi | ${SITE_META.title}`,
    description:
      "Scopri i servizi di amministrazione condominiale e elaborazione dati offerti da AMCO Service a Verona.",
    url: `${SITE_META.url}/servizi`,
  },
};

// Mappa delle icone
const iconMap: Record<string, LucideIcon> = {
  Receipt,
  MonitorSmartphone,
  CreditCard,
  Users,
  FileBarChart,
  CalendarDays,
  HardHat,
  Landmark,
  Phone,
  PiggyBank,
  FileSpreadsheet,
  ArrowLeftRight,
  Wallet,
  FileText,
  FileCheck,
  ShieldAlert,
  Send,
  Banknote,
  Percent,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className="group h-full border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle transition-colors group-hover:bg-brand/20">
              {IconComponent && (
                <IconComponent className="h-6 w-6 text-brand" aria-hidden="true" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  services: ReadonlyArray<{ title: string; description: string; icon: string }>;
  variant: "white" | "surface";
}

function ServiceSection({ id, title, description, services, variant }: ServiceSectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${variant === "surface" ? "bg-surface" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiziPage() {
  const { hero, categories } = SERVIZI;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground">{hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Sezione Amministrazione Condominiale */}
      <ServiceSection
        id={categories.administration.id}
        title={categories.administration.title}
        description={categories.administration.description}
        services={categories.administration.services}
        variant="surface"
      />

      {/* Sezione Elaborazione Dati */}
      <ServiceSection
        id={categories.dataProcessing.id}
        title={categories.dataProcessing.title}
        description={categories.dataProcessing.description}
        services={categories.dataProcessing.services}
        variant="white"
      />
    </>
  );
}
