import { type Metadata } from "next";
import Image from "next/image";
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
    <div className="group relative h-full rounded-2xl border border-border/60 bg-white p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-subtle transition-colors duration-300 group-hover:bg-brand/15">
            {IconComponent && (
              <IconComponent className="h-5 w-5 text-brand" aria-hidden="true" />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1.5 leading-snug">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  services: ReadonlyArray<{ title: string; description: string; icon: string }>;
  variant: "white" | "surface";
  imagePosition?: "left" | "right";
}

function ServiceSection({ id, title, description, services, variant }: ServiceSectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${variant === "surface" ? "bg-surface" : "bg-white"}`}
    >
      <div className="container-custom">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
            I nostri servizi
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-5">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Services grid - 3 columns with centered orphan items */}
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 services-grid">
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
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-panorama.jpg"
            alt="Panorama di Verona"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              AMCO Service
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-hero mb-6">
              {hero.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Amministrazione Condominiale */}
      <ServiceSection
        id={categories.administration.id}
        title={categories.administration.title}
        description={categories.administration.description}
        services={categories.administration.services}
        variant="surface"
        imagePosition="left"
      />

      {/* Divider with image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/verona-buildings.jpg"
          alt="Architettura veronese"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-brand/20" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Elaborazione Dati */}
      <ServiceSection
        id={categories.dataProcessing.id}
        title={categories.dataProcessing.title}
        description={categories.dataProcessing.description}
        services={categories.dataProcessing.services}
        variant="white"
        imagePosition="right"
      />
    </>
  );
}
