/**
 * Helper per l'invio di email
 * Placeholder per servizio email (Resend/Brevo)
 */

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
  // Dati richiedente
  name: string;
  surname: string;
  phone: string;
  email: string;
  // Dati stabile
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
 * Attualmente placeholder - fare console.log finché il servizio non è configurato
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  // Se non c'è un servizio email configurato, logga e ritorna successo
  // Questo permette di testare il flusso senza configurare un servizio reale
  if (!process.env.EMAIL_SERVICE || process.env.EMAIL_SERVICE === "console") {
    console.log("\n========================================");
    console.log("📧 EMAIL (Modalità sviluppo)");
    console.log("========================================");
    console.log(`A: ${payload.to}`);
    console.log(`Da: ${payload.from}`);
    console.log(`Oggetto: ${payload.subject}`);
    console.log("----------------------------------------");
    console.log(payload.text);
    console.log("========================================\n");

    return { success: true };
  }

  // TODO: Implementare invio reale con Resend o Brevo
  // Esempio con Resend:
  // const { data, error } = await resend.emails.send({
  //   from: payload.from,
  //   to: payload.to,
  //   subject: payload.subject,
  //   text: payload.text,
  //   html: payload.html,
  // });

  return {
    success: false,
    error: "Servizio email non configurato. Configurare EMAIL_SERVICE nelle variabili d'ambiente.",
  };
}

/**
 * Invia email di conferma al contatto (form contatto)
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
 * Invia email di conferma al contatto (form preventivo)
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
