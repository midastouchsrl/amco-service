/**
 * Servizio email con Resend
 * In sviluppo logga in console, in produzione invia tramite Resend
 */

import { Resend } from "resend";

interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface PreventivoFormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  cap: string;
  apartments: string;
  garages?: string;
  commercialSpaces?: string;
  elevator: string;
  concierge: string;
  heating: string;
  cleaning: string;
  notes?: string;
}

/**
 * Formatta i dati del form contatto in testo leggibile
 */
export function formatContactEmail(data: ContactFormData): string {
  return `
NUOVA RICHIESTA DAL SITO WEB - AMCO SERVICE
============================================

DA: ${data.name}
EMAIL: ${data.email}
OGGETTO: ${data.subject}

MESSAGGIO:
${data.message}

---
Inviato il: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}
`.trim();
}

/**
 * Formatta i dati del form preventivo in testo leggibile
 */
export function formatPreventivoEmail(data: PreventivoFormData): string {
  const heatingLabels: Record<string, string> = {
    autonomous: "Autonomo",
    centralized: "Centralizzato",
    district: "Teleriscaldamento",
  };

  const cleaningLabels: Record<string, string> = {
    contractor: "Ditta appaltatrice",
    employee: "Dipendente",
    other: "Altro",
  };

  return `
NUOVA RICHIESTA PREVENTIVO - AMCO SERVICE
==========================================

DATI RICHIEDENTE
----------------
Nome: ${data.name} ${data.surname}
Telefono: ${data.phone}
Email: ${data.email}

DATI STABILE
------------
Indirizzo: ${data.address}
Città: ${data.city} (${data.province})
CAP: ${data.cap}

Unità:
- Appartamenti: ${data.apartments}
- Garage/Posti auto: ${data.garages || "Non specificato"}
- Spazi commerciali: ${data.commercialSpaces || "Non specificato"}

Caratteristiche:
- Ascensore: ${data.elevator === "yes" ? "Sì" : "No"}
- Portineria: ${data.concierge === "yes" ? "Sì" : "No"}
- Riscaldamento: ${heatingLabels[data.heating] || data.heating}
- Pulizia scale: ${cleaningLabels[data.cleaning] || data.cleaning}

${data.notes ? `NOTE AGGIUNTIVE:\n${data.notes}\n` : ""}
---
Inviato il: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}
`.trim();
}

/**
 * Invia un'email usando il servizio configurato
 * In sviluppo (EMAIL_SERVICE=console o non impostato): logga in console
 * In produzione (EMAIL_SERVICE=resend): invia tramite Resend
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  // Modalità sviluppo: logga in console
  if (!process.env.EMAIL_SERVICE || process.env.EMAIL_SERVICE === "console") {
    console.log("\n========================================");
    console.log("EMAIL (Modalità sviluppo)");
    console.log("========================================");
    console.log(`A: ${payload.to}`);
    console.log(`Da: ${payload.from}`);
    console.log(`Oggetto: ${payload.subject}`);
    console.log("----------------------------------------");
    console.log(payload.text);
    console.log("========================================\n");

    return { success: true };
  }

  // Produzione: invio con Resend
  if (process.env.EMAIL_SERVICE === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY non configurata");
      return { success: false, error: "Servizio email non configurato correttamente." };
    }

    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      });

      if (error) {
        console.error("Errore Resend:", error);
        return { success: false, error: "Errore nell'invio dell'email." };
      }

      return { success: true };
    } catch (err) {
      console.error("Errore invio email Resend:", err);
      return { success: false, error: "Errore nell'invio dell'email." };
    }
  }

  return {
    success: false,
    error: "Servizio email non configurato. Impostare EMAIL_SERVICE nelle variabili d'ambiente.",
  };
}

/**
 * Invia notifica email per form contatto
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const text = formatContactEmail(data);

  return sendEmail({
    to: process.env.EMAIL_TO || "info@amcovr.it",
    from: process.env.EMAIL_FROM || "noreply@amcovr.it",
    subject: `Richiesta dal sito: ${data.subject}`,
    text,
  });
}

/**
 * Invia notifica email per form preventivo
 */
export async function sendPreventivoEmail(data: PreventivoFormData): Promise<{ success: boolean; error?: string }> {
  const text = formatPreventivoEmail(data);

  return sendEmail({
    to: process.env.EMAIL_TO || "info@amcovr.it",
    from: process.env.EMAIL_FROM || "noreply@amcovr.it",
    subject: `Richiesta preventivo: ${data.address}, ${data.city}`,
    text,
  });
}
