import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  Calculator,
  Star,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import {
  HERO,
  HOME_ABOUT,
  HOME_SERVICES,
  TESTIMONIALS,
  TESTIMONIALS_SECTION,
  FAQ_ITEMS,
  FAQ_SECTION,
  CTA_BANNER,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] lg:min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-arena.webp"
            alt="Arena di Verona"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-16 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4 opacity-90">
              Amministrazione condominiale a Verona
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-hero font-bold text-white mb-6 leading-tight tracking-tight">
              {HERO.tagline}
            </h1>
            <p className="text-base lg:text-xl text-white/85 mb-10 leading-relaxed max-w-xl">
              {HERO.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link href={HERO.cta.primary.href}>
                  {HERO.cta.primary.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-white/10 border-white/25 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Link href={HERO.cta.secondary.href}>
                  {HERO.cta.secondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Text content */}
            <div className="max-w-xl">
              <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
                Chi siamo
              </p>
              <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-6 tracking-tight">
                {HOME_ABOUT.title}
              </h2>
              <p className="text-base lg:text-lg text-text leading-relaxed mb-8">{HOME_ABOUT.description}</p>
              <Button asChild variant="secondary" className="group">
                <Link href={HOME_ABOUT.cta.href}>
                  {HOME_ABOUT.cta.label}
                  <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/verona-piazza.jpg"
                alt="Piazza delle Erbe, Verona"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-28 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
              Servizi
            </p>
            <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-4 tracking-tight">
              {HOME_SERVICES.title}
            </h2>
            <p className="text-base lg:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              {HOME_SERVICES.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-4xl mx-auto">
            {HOME_SERVICES.categories.map((category) => (
              <Card
                key={category.title}
                className="group card-hover border-border/50 bg-white overflow-hidden"
              >
                <CardHeader className="pb-2 p-4 lg:p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-subtle flex items-center justify-center mb-4 transition-colors group-hover:bg-brand/15">
                    {category.icon === "Building2" ? (
                      <Building2 className="w-6 h-6 text-brand" />
                    ) : (
                      <Calculator className="w-6 h-6 text-brand" />
                    )}
                  </div>
                  <CardTitle className="text-lg lg:text-xl tracking-tight">{category.title}</CardTitle>
                  <CardDescription className="text-sm lg:text-base leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
                  <ul className="space-y-2.5 mb-6">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm lg:text-base text-text"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="text-brand group/btn -ml-3">
                    <Link href={category.href}>
                      {HOME_SERVICES.cta.label}
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-12 lg:py-28 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
              Testimonianze
            </p>
            <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-4 tracking-tight">
              {TESTIMONIALS_SECTION.title}
            </h2>
            <p className="text-base lg:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              {TESTIMONIALS_SECTION.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {TESTIMONIALS.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-border/40 bg-surface/80 hover:bg-surface transition-colors duration-300"
              >
                <CardContent className="p-4 pt-5 lg:pt-6 lg:p-6">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent-warm text-accent-warm"
                      />
                    ))}
                  </div>
                  <p className="text-text italic mb-5 text-sm lg:text-[15px] leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border/40">
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-40 md:h-56 lg:h-72 overflow-hidden">
        <Image
          src="/images/verona-ponte.jpg"
          alt="Ponte Pietra, Verona"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* FAQ Section */}
      <section className="py-12 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 lg:mb-14">
              <p className="text-sm font-medium text-brand tracking-wider uppercase mb-3">
                FAQ
              </p>
              <h2 className="text-xl lg:text-h2 font-bold text-foreground mb-4 tracking-tight">
                {FAQ_SECTION.title}
              </h2>
              <p className="text-base lg:text-lg text-text-muted leading-relaxed">{FAQ_SECTION.subtitle}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-surface border border-border/40 rounded-xl px-4 lg:px-6 data-[state=open]:border-brand/20 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-brand py-4 lg:py-5 text-sm lg:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text leading-relaxed pb-4 lg:pb-5 text-sm lg:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-rooftops.jpg"
            alt="Veduta di Verona"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand/85" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/90 to-brand-dark/95" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <h2 className="text-xl lg:text-h2 font-bold text-white mb-5 tracking-tight">
            {CTA_BANNER.title}
          </h2>
          <p className="text-base lg:text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {CTA_BANNER.description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand hover:bg-white/90 text-base px-10 shadow-lg shadow-black/10"
          >
            <Link href={CTA_BANNER.cta.href}>
              {CTA_BANNER.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
