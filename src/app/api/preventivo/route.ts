import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendPreventivoEmail } from "@/lib/email";

// Schema di validazione (lato server)
const preventivoSchema = z.object({
  // Dati richiedente
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  surname: z.string().min(2, "Il cognome deve contenere almeno 2 caratteri"),
  phone: z.string().min(6, "Il numero di telefono non è valido"),
  email: z.string().email("Indirizzo email non valido"),
  // Dati stabile
  address: z.string().min(3, "L'indirizzo deve contenere almeno 3 caratteri"),
  city: z.string().min(2, "La città deve contenere almeno 2 caratteri"),
  province: z.string().length(2, "La provincia deve essere 2 caratteri"),
  cap: z.string().regex(/^\d{5}$/, "Il CAP deve contenere 5 cifre"),
  apartments: z.string().min(1, "Il numero di appartamenti è richiesto"),
  garages: z.string().optional(),
  commercialSpaces: z.string().optional(),
  elevator: z.enum(["yes", "no"], { message: "Seleziona un'opzione per l'ascensore" }),
  concierge: z.enum(["yes", "no"], { message: "Seleziona un'opzione per la portineria" }),
  heating: z.enum(["autonomous", "centralized", "district"], { message: "Seleziona il tipo di riscaldamento" }),
  cleaning: z.enum(["contractor", "employee", "other"], { message: "Seleziona il tipo di pulizia scale" }),
  notes: z.string().optional(),
  // Privacy e honeypot
  privacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa privacy",
  }),
  website: z.string().max(0, "Bot rilevato"),
});

// Rate limiting in-memory (per produzione usare Redis o simili)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // Max richieste
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora in ms

function getRateLimitKey(ip: string): string {
  return `preventivo:${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Reset o nuova entry
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export async function POST(request: NextRequest) {
  try {
    // Ottieni IP del client
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Troppe richieste. Riprova tra un'ora." },
        { status: 429 }
      );
    }

    // Parse del body
    const body = await request.json();

    // Validazione
    const result = preventivoSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Dati non validi", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check (già validato da Zod, ma doppio check)
    if (data.website) {
      // Simula successo per non rivelare che è un honeypot
      return NextResponse.json({ success: true });
    }

    // Invia email
    const emailResult = await sendPreventivoEmail({
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      province: data.province,
      cap: data.cap,
      apartments: data.apartments,
      garages: data.garages,
      commercialSpaces: data.commercialSpaces,
      elevator: data.elevator,
      concierge: data.concierge,
      heating: data.heating,
      cleaning: data.cleaning,
      notes: data.notes,
    });

    if (!emailResult.success) {
      console.error("Errore invio email:", emailResult.error);
      return NextResponse.json(
        { error: "Errore nell'invio della richiesta. Riprova più tardi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Richiesta preventivo inviata con successo",
    });
  } catch (error) {
    console.error("Errore API preventivo:", error);
    return NextResponse.json(
      { error: "Errore del server. Riprova più tardi." },
      { status: 500 }
    );
  }
}
