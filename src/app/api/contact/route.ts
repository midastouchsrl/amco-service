import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

// Schema di validazione (lato server)
const contactSchema = z.object({
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  email: z.string().email("Indirizzo email non valido"),
  subject: z.string().min(2, "L'oggetto deve contenere almeno 2 caratteri"),
  message: z.string().min(10, "Il messaggio deve contenere almeno 10 caratteri"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa privacy",
  }),
  honeypot: z.string().max(0, "Bot rilevato"),
});

// Rate limiting in-memory (per produzione usare Redis o simili)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // Max richieste
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora in ms

function getRateLimitKey(ip: string): string {
  return `contact:${ip}`;
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
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Dati non validi", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check (già validato da Zod, ma doppio check)
    if (data.honeypot) {
      // Simula successo per non rivelare che è un honeypot
      return NextResponse.json({ success: true });
    }

    // Invia email
    const emailResult = await sendContactEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (!emailResult.success) {
      console.error("Errore invio email:", emailResult.error);
      return NextResponse.json(
        { error: "Errore nell'invio del messaggio. Riprova più tardi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Messaggio inviato con successo",
    });
  } catch (error) {
    console.error("Errore API contact:", error);
    return NextResponse.json(
      { error: "Errore del server. Riprova più tardi." },
      { status: 500 }
    );
  }
}
