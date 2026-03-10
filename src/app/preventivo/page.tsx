"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react"
import { PREVENTIVO, ERRORS } from "@/lib/constants"

// Schema di validazione
const preventivoSchema = z.object({
  // Honeypot
  website: z.string().max(0),

  // Dati richiedente
  name: z.string().min(2, ERRORS.minLength(2)),
  surname: z.string().min(2, ERRORS.minLength(2)),
  phone: z.string().min(6, ERRORS.phone),
  email: z.string().email(ERRORS.email),

  // Dati stabile
  address: z.string().min(3, ERRORS.minLength(3)),
  city: z.string().min(2, ERRORS.minLength(2)),
  province: z.string().min(2, ERRORS.minLength(2)),
  cap: z.string().min(5, ERRORS.minLength(5)),
  apartments: z.string().min(1, ERRORS.required),
  garages: z.string().optional(),
  commercialSpaces: z.string().optional(),
  elevator: z.enum(["yes", "no"], { message: ERRORS.required }),
  concierge: z.enum(["yes", "no"], { message: ERRORS.required }),
  heating: z.enum(["autonomous", "centralized", "district"], { message: ERRORS.required }),
  cleaning: z.enum(["contractor", "employee", "other"], { message: ERRORS.required }),
  notes: z.string().optional(),

  // Privacy
  privacy: z.boolean().refine((val) => val === true, { message: ERRORS.privacy }),
})

type PreventivoFormData = z.infer<typeof preventivoSchema>

export default function PreventivoPage() {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<PreventivoFormData>({
    resolver: zodResolver(preventivoSchema),
    defaultValues: {
      website: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      province: "",
      cap: "",
      apartments: "",
      garages: "",
      commercialSpaces: "",
      notes: "",
      privacy: false,
    },
  })

  const elevatorValue = watch("elevator")
  const conciergeValue = watch("concierge")
  const heatingValue = watch("heating")
  const cleaningValue = watch("cleaning")

  const onSubmit = async (data: PreventivoFormData) => {
    // Reset errori precedenti
    setSubmitError(null)

    // Honeypot check - se compilato, è uno bot
    if (data.website) {
      // Simula successo per non dare feedback ai bot
      reset()
      return
    }

    try {
      const response = await fetch("/api/preventivo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Reset form dopo successo
        reset()
      } else {
        // Cerca di ottenere il messaggio di errore dall'API
        let errorMessage = PREVENTIVO.error
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch {
          // Ignora errori di parsing JSON
        }
        setSubmitError(errorMessage)
      }
    } catch {
      setSubmitError(PREVENTIVO.error)
    }
  }

  if (isSubmitSuccessful) {
    return (
      <>
        {/* Hero with image */}
        <section className="relative overflow-hidden bg-foreground">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/verona-buildings.jpg"
              alt="Architettura veronese"
              fill
              className="object-cover object-center opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/80" />
          </div>
          <div className="relative z-10 container-custom py-20 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
                Preventivo
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-5">
                {PREVENTIVO.hero.title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                {PREVENTIVO.hero.subtitle}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        </section>

        {/* Success State */}
        <section className="py-20 lg:py-28 bg-surface">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl border border-brand/20 bg-white p-10 lg:p-14 text-center shadow-sm">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-subtle">
                  <CheckCircle2 className="h-10 w-10 text-brand" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 tracking-tight">
                  Richiesta inviata con successo
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                  {PREVENTIVO.success}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => reset({ ...{} } as PreventivoFormData)}
                    size="lg"
                    variant="outline"
                    className="text-base"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Invia un&apos;altra richiesta
                  </Button>
                  <Button asChild size="lg" className="text-base">
                    <Link href="/">
                      Torna alla home
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/verona-buildings.jpg"
            alt="Architettura veronese"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/80" />
        </div>

        <div className="relative z-10 container-custom py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand-light tracking-wider uppercase mb-4">
              Preventivo
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-5">
              {PREVENTIVO.hero.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {PREVENTIVO.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container-custom">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
            {/* Honeypot field - nascosto */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {/* Sezione 1: Dati richiedente */}
            <div className="rounded-2xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium text-brand tracking-wider uppercase mb-2">
                  Passo 1
                </p>
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  {PREVENTIVO.sections.requester.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {PREVENTIVO.sections.requester.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.name.label}
                  </Label>
                  <Input
                    id="name"
                    placeholder={PREVENTIVO.fields.name.placeholder}
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className="h-11"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Cognome */}
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.surname.label}
                  </Label>
                  <Input
                    id="surname"
                    placeholder={PREVENTIVO.fields.surname.placeholder}
                    {...register("surname")}
                    aria-invalid={!!errors.surname}
                    className="h-11"
                  />
                  {errors.surname && (
                    <p className="text-sm text-destructive">{errors.surname.message}</p>
                  )}
                </div>

                {/* Telefono */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.phone.label}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={PREVENTIVO.fields.phone.placeholder}
                    {...register("phone")}
                    aria-invalid={!!errors.phone}
                    className="h-11"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.email.label}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={PREVENTIVO.fields.email.placeholder}
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sezione 2: Dati dello stabile */}
            <div className="rounded-2xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium text-brand tracking-wider uppercase mb-2">
                  Passo 2
                </p>
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  {PREVENTIVO.sections.building.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {PREVENTIVO.sections.building.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                {/* Indirizzo */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.address.label}
                  </Label>
                  <Input
                    id="address"
                    placeholder={PREVENTIVO.fields.address.placeholder}
                    {...register("address")}
                    aria-invalid={!!errors.address}
                    className="h-11"
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address.message}</p>
                  )}
                </div>

                {/* Città, Provincia, CAP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.city.label}
                    </Label>
                    <Input
                      id="city"
                      placeholder={PREVENTIVO.fields.city.placeholder}
                      {...register("city")}
                      aria-invalid={!!errors.city}
                      className="h-11"
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.province.label}
                    </Label>
                    <Input
                      id="province"
                      placeholder={PREVENTIVO.fields.province.placeholder}
                      {...register("province")}
                      aria-invalid={!!errors.province}
                      className="h-11"
                    />
                    {errors.province && (
                      <p className="text-sm text-destructive">{errors.province.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cap" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.cap.label}
                    </Label>
                    <Input
                      id="cap"
                      placeholder={PREVENTIVO.fields.cap.placeholder}
                      {...register("cap")}
                      aria-invalid={!!errors.cap}
                      className="h-11"
                    />
                    {errors.cap && (
                      <p className="text-sm text-destructive">{errors.cap.message}</p>
                    )}
                  </div>
                </div>

                {/* Numero unita */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Appartamenti */}
                  <div className="space-y-2">
                    <Label htmlFor="apartments" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.apartments.label} *
                    </Label>
                    <Input
                      id="apartments"
                      type="number"
                      min="1"
                      placeholder={PREVENTIVO.fields.apartments.placeholder}
                      {...register("apartments")}
                      aria-invalid={!!errors.apartments}
                      className="h-11"
                    />
                    {errors.apartments && (
                      <p className="text-sm text-destructive">{errors.apartments.message}</p>
                    )}
                  </div>

                  {/* Garage */}
                  <div className="space-y-2">
                    <Label htmlFor="garages" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.garages.label}
                    </Label>
                    <Input
                      id="garages"
                      type="number"
                      min="0"
                      placeholder={PREVENTIVO.fields.garages.placeholder}
                      {...register("garages")}
                      className="h-11"
                    />
                  </div>

                  {/* Spazi commerciali */}
                  <div className="space-y-2">
                    <Label htmlFor="commercialSpaces" className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.commercialSpaces.label}
                    </Label>
                    <Input
                      id="commercialSpaces"
                      placeholder={PREVENTIVO.fields.commercialSpaces.placeholder}
                      {...register("commercialSpaces")}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/40 pt-6">
                  <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-5">
                    Caratteristiche dello stabile
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ascensore - Radio */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">
                        {PREVENTIVO.fields.elevator.label} *
                      </Label>
                      <RadioGroup
                        value={elevatorValue}
                        onValueChange={(value) => setValue("elevator", value as "yes" | "no")}
                        className="flex gap-6"
                      >
                        {PREVENTIVO.options.yesNo.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`elevator-${option.value}`} />
                            <Label htmlFor={`elevator-${option.value}`} className="font-normal cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.elevator && (
                        <p className="text-sm text-destructive">{errors.elevator.message}</p>
                      )}
                    </div>

                    {/* Portineria - Radio */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">
                        {PREVENTIVO.fields.concierge.label} *
                      </Label>
                      <RadioGroup
                        value={conciergeValue}
                        onValueChange={(value) => setValue("concierge", value as "yes" | "no")}
                        className="flex gap-6"
                      >
                        {PREVENTIVO.options.yesNo.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`concierge-${option.value}`} />
                            <Label htmlFor={`concierge-${option.value}`} className="font-normal cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.concierge && (
                        <p className="text-sm text-destructive">{errors.concierge.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Riscaldamento - Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.heating.label} *
                    </Label>
                    <Select
                      value={heatingValue}
                      onValueChange={(value) => setValue("heating", value as "autonomous" | "centralized" | "district")}
                    >
                      <SelectTrigger className={`h-11 ${errors.heating ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Seleziona il tipo di riscaldamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {PREVENTIVO.options.heating.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.heating && (
                      <p className="text-sm text-destructive">{errors.heating.message}</p>
                    )}
                  </div>

                  {/* Pulizia scale - Select */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      {PREVENTIVO.fields.cleaning.label} *
                    </Label>
                    <Select
                      value={cleaningValue}
                      onValueChange={(value) => setValue("cleaning", value as "contractor" | "employee" | "other")}
                    >
                      <SelectTrigger className={`h-11 ${errors.cleaning ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Seleziona il tipo di pulizia" />
                      </SelectTrigger>
                      <SelectContent>
                        {PREVENTIVO.options.cleaning.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.cleaning && (
                      <p className="text-sm text-destructive">{errors.cleaning.message}</p>
                    )}
                  </div>
                </div>

                {/* Note */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                    {PREVENTIVO.fields.notes.label}
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder={PREVENTIVO.fields.notes.placeholder}
                    rows={4}
                    {...register("notes")}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer form */}
            <div className="rounded-2xl border border-border/40 bg-white p-6 lg:p-8 shadow-sm space-y-6">
              {/* Nota informativa */}
              <div className="rounded-xl bg-surface border border-border/40 p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {PREVENTIVO.note}
                </p>
              </div>

              {/* Privacy checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={watch("privacy")}
                  onCheckedChange={(checked) => setValue("privacy", checked as boolean)}
                  aria-invalid={!!errors.privacy}
                  className="mt-0.5"
                />
                <div className="space-y-1">
                  <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
                    {PREVENTIVO.fields.privacy}{" "}
                    <a
                      href="/privacy"
                      className="text-brand hover:underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      privacy
                    </a>
                  </Label>
                  {errors.privacy && (
                    <p className="text-sm text-destructive">{errors.privacy.message}</p>
                  )}
                </div>
              </div>

              {/* Errore di submit */}
              {submitError && (
                <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
                  <p className="text-sm text-destructive">{submitError}</p>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto text-base px-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio in corso..." : PREVENTIVO.submit}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
