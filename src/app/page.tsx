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
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-arena.webp"
            alt="Arena di Verona"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-20 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-hero font-bold text-white mb-6 leading-tight">
              {HERO.tagline}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8">
              {HERO.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href={HERO.cta.primary.href}>
                  {HERO.cta.primary.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-white/10 border-white/30 text-white hover:bg-white/20"
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-6">
              {HOME_ABOUT.title}
            </h2>
            <p className="text-lg text-text mb-8">{HOME_ABOUT.description}</p>
            <Button asChild variant="secondary">
              <Link href={HOME_ABOUT.cta.href}>
                {HOME_ABOUT.cta.label}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-4">
              {HOME_SERVICES.title}
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {HOME_SERVICES.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {HOME_SERVICES.categories.map((category) => (
              <Card
                key={category.title}
                className="card-hover border-border/50 bg-white"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-brand-subtle flex items-center justify-center mb-4">
                    {category.icon === "Building2" ? (
                      <Building2 className="w-6 h-6 text-brand" />
                    ) : (
                      <Calculator className="w-6 h-6 text-brand" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-text"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="text-brand">
                    <Link href={category.href}>
                      {HOME_SERVICES.cta.label}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-4">
              {TESTIMONIALS_SECTION.title}
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {TESTIMONIALS_SECTION.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-border/50 bg-surface"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent-warm text-accent-warm"
                      />
                    ))}
                  </div>
                  <p className="text-text italic mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-h2 font-bold text-foreground mb-4">
                {FAQ_SECTION.title}
              </h2>
              <p className="text-lg text-text-muted">{FAQ_SECTION.subtitle}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-border/50 rounded-card px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-brand">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 lg:py-24 bg-brand overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark opacity-90" />
        <div className="relative z-10 container-custom text-center">
          <h2 className="text-2xl lg:text-h2 font-bold text-white mb-4">
            {CTA_BANNER.title}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {CTA_BANNER.description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand hover:bg-white/90 text-base"
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
