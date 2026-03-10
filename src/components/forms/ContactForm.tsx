"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTATTI, ERRORS } from "@/lib/constants";

// Schema di validazione
const contactSchema = z.object({
  name: z.string().min(2, ERRORS.minLength(2)),
  email: z.string().email(ERRORS.email),
  subject: z.string().min(2, ERRORS.minLength(2)),
  message: z.string().min(10, ERRORS.minLength(10)),
  privacy: z.boolean().refine((val) => val === true, {
    message: ERRORS.privacy,
  }),
  honeypot: z.string().max(0), // Campo honeypot anti-spam
});

type ContactFormData = z.infer<typeof contactSchema>;
type SubmitStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacy: false,
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Se il honeypot è compilato, probabilmente è un bot
    if (data.honeypot) {
      console.log("Honeypot triggered - possible bot");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          privacy: data.privacy,
          honeypot: data.honeypot,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  // Mostra messaggio di successo se inviato correttamente
  if (submitStatus === "success") {
    return (
      <Card className="border-border/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4 py-8">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-brand"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-foreground text-lg font-medium">
              {CONTATTI.form.success}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          {CONTATTI.form.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Messaggio di errore */}
        {submitStatus === "error" && (
          <div className="mb-5 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{CONTATTI.form.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Campo honeypot nascosto */}
          <input
            type="text"
            {...register("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">{CONTATTI.form.fields.name.label}</Label>
            <Input
              id="name"
              type="text"
              placeholder={CONTATTI.form.fields.name.placeholder}
              {...register("name")}
              aria-invalid={!!errors.name}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{CONTATTI.form.fields.email.label}</Label>
            <Input
              id="email"
              type="email"
              placeholder={CONTATTI.form.fields.email.placeholder}
              {...register("email")}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Oggetto */}
          <div className="space-y-2">
            <Label htmlFor="subject">{CONTATTI.form.fields.subject.label}</Label>
            <Input
              id="subject"
              type="text"
              placeholder={CONTATTI.form.fields.subject.placeholder}
              {...register("subject")}
              aria-invalid={!!errors.subject}
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          {/* Messaggio */}
          <div className="space-y-2">
            <Label htmlFor="message">{CONTATTI.form.fields.message.label}</Label>
            <Textarea
              id="message"
              placeholder={CONTATTI.form.fields.message.placeholder}
              rows={5}
              {...register("message")}
              aria-invalid={!!errors.message}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Checkbox Privacy */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Controller
                name="privacy"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="privacy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="privacy" className="text-sm leading-relaxed font-normal cursor-pointer">
                {CONTATTI.form.fields.privacy}{" "}
                <a
                  href="/privacy"
                  className="text-brand hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy
                </a>
              </Label>
            </div>
            {errors.privacy && (
              <p className="text-sm text-destructive">{errors.privacy.message}</p>
            )}
          </div>

          {/* Bottone Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Invio in corso..." : CONTATTI.form.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
