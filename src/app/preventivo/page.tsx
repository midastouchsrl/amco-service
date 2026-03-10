"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#5a981d]/10">
              <svg
                className="h-8 w-8 text-[#5a981d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Richiesta inviata</h2>
            <p className="text-muted-foreground mb-6">{PREVENTIVO.success}</p>
            <Button onClick={() => reset({ ...{} } as PreventivoFormData)}>
              Invia un&apos;altra richiesta
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{PREVENTIVO.hero.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {PREVENTIVO.hero.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
        {/* Honeypot field - nascosto */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {/* Sezione 1: Dati richiedente */}
        <Card>
          <CardHeader>
            <CardTitle>{PREVENTIVO.sections.requester.title}</CardTitle>
            <CardDescription>{PREVENTIVO.sections.requester.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">{PREVENTIVO.fields.name.label}</Label>
                <Input
                  id="name"
                  placeholder={PREVENTIVO.fields.name.placeholder}
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Cognome */}
              <div className="space-y-2">
                <Label htmlFor="surname">{PREVENTIVO.fields.surname.label}</Label>
                <Input
                  id="surname"
                  placeholder={PREVENTIVO.fields.surname.placeholder}
                  {...register("surname")}
                  aria-invalid={!!errors.surname}
                />
                {errors.surname && (
                  <p className="text-sm text-destructive">{errors.surname.message}</p>
                )}
              </div>

              {/* Telefono */}
              <div className="space-y-2">
                <Label htmlFor="phone">{PREVENTIVO.fields.phone.label}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={PREVENTIVO.fields.phone.placeholder}
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{PREVENTIVO.fields.email.label}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={PREVENTIVO.fields.email.placeholder}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sezione 2: Dati dello stabile */}
        <Card>
          <CardHeader>
            <CardTitle>{PREVENTIVO.sections.building.title}</CardTitle>
            <CardDescription>{PREVENTIVO.sections.building.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Indirizzo */}
            <div className="space-y-2">
              <Label htmlFor="address">{PREVENTIVO.fields.address.label}</Label>
              <Input
                id="address"
                placeholder={PREVENTIVO.fields.address.placeholder}
                {...register("address")}
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            {/* Città, Provincia, CAP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{PREVENTIVO.fields.city.label}</Label>
                <Input
                  id="city"
                  placeholder={PREVENTIVO.fields.city.placeholder}
                  {...register("city")}
                  aria-invalid={!!errors.city}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">{PREVENTIVO.fields.province.label}</Label>
                <Input
                  id="province"
                  placeholder={PREVENTIVO.fields.province.placeholder}
                  {...register("province")}
                  aria-invalid={!!errors.province}
                />
                {errors.province && (
                  <p className="text-sm text-destructive">{errors.province.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cap">{PREVENTIVO.fields.cap.label}</Label>
                <Input
                  id="cap"
                  placeholder={PREVENTIVO.fields.cap.placeholder}
                  {...register("cap")}
                  aria-invalid={!!errors.cap}
                />
                {errors.cap && (
                  <p className="text-sm text-destructive">{errors.cap.message}</p>
                )}
              </div>
            </div>

            {/* Numero unita */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Appartamenti */}
              <div className="space-y-2">
                <Label htmlFor="apartments">{PREVENTIVO.fields.apartments.label} *</Label>
                <Input
                  id="apartments"
                  type="number"
                  min="1"
                  placeholder={PREVENTIVO.fields.apartments.placeholder}
                  {...register("apartments")}
                  aria-invalid={!!errors.apartments}
                />
                {errors.apartments && (
                  <p className="text-sm text-destructive">{errors.apartments.message}</p>
                )}
              </div>

              {/* Garage */}
              <div className="space-y-2">
                <Label htmlFor="garages">{PREVENTIVO.fields.garages.label}</Label>
                <Input
                  id="garages"
                  type="number"
                  min="0"
                  placeholder={PREVENTIVO.fields.garages.placeholder}
                  {...register("garages")}
                />
              </div>

              {/* Spazi commerciali */}
              <div className="space-y-2">
                <Label htmlFor="commercialSpaces">{PREVENTIVO.fields.commercialSpaces.label}</Label>
                <Input
                  id="commercialSpaces"
                  placeholder={PREVENTIVO.fields.commercialSpaces.placeholder}
                  {...register("commercialSpaces")}
                />
              </div>
            </div>

            {/* Ascensore - Radio */}
            <div className="space-y-3">
              <Label>{PREVENTIVO.fields.elevator.label} *</Label>
              <RadioGroup
                value={elevatorValue}
                onValueChange={(value) => setValue("elevator", value as "yes" | "no")}
                className="flex gap-6"
              >
                {PREVENTIVO.options.yesNo.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`elevator-${option.value}`} />
                    <Label htmlFor={`elevator-${option.value}`} className="font-normal">
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
              <Label>{PREVENTIVO.fields.concierge.label} *</Label>
              <RadioGroup
                value={conciergeValue}
                onValueChange={(value) => setValue("concierge", value as "yes" | "no")}
                className="flex gap-6"
              >
                {PREVENTIVO.options.yesNo.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`concierge-${option.value}`} />
                    <Label htmlFor={`concierge-${option.value}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.concierge && (
                <p className="text-sm text-destructive">{errors.concierge.message}</p>
              )}
            </div>

            {/* Riscaldamento - Select */}
            <div className="space-y-2">
              <Label>{PREVENTIVO.fields.heating.label} *</Label>
              <Select
                value={heatingValue}
                onValueChange={(value) => setValue("heating", value as "autonomous" | "centralized" | "district")}
              >
                <SelectTrigger className={errors.heating ? "border-destructive" : ""}>
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
              <Label>{PREVENTIVO.fields.cleaning.label} *</Label>
              <Select
                value={cleaningValue}
                onValueChange={(value) => setValue("cleaning", value as "contractor" | "employee" | "other")}
              >
                <SelectTrigger className={errors.cleaning ? "border-destructive" : ""}>
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

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="notes">{PREVENTIVO.fields.notes.label}</Label>
              <Textarea
                id="notes"
                placeholder={PREVENTIVO.fields.notes.placeholder}
                rows={4}
                {...register("notes")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer form */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Nota informativa */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {PREVENTIVO.note}
            </p>

            {/* Privacy checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={watch("privacy")}
                onCheckedChange={(checked) => setValue("privacy", checked as boolean)}
                aria-invalid={!!errors.privacy}
              />
              <div className="space-y-1">
                <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
                  {PREVENTIVO.fields.privacy}
                </Label>
                {errors.privacy && (
                  <p className="text-sm text-destructive">{errors.privacy.message}</p>
                )}
              </div>
            </div>

            {/* Errore di submit */}
            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Invio in corso..." : PREVENTIVO.submit}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
