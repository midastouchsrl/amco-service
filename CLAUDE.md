# AMCO Service — Sito Web

## Cosa è questo progetto

Sito web vetrina per AMCO Service SRL, studio di amministrazione condominiale a Verona. Rifacimento completo del sito attuale (WordPress datato) in Next.js 14.

## Documento di riferimento principale

**`PRD.md`** nella root del progetto contiene TUTTO: struttura pagine, contenuti, design system, architettura, specifiche privacy, piano operativo. Leggilo PRIMA di fare qualsiasi cosa.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS 3
- shadcn/ui per design system base
- React Hook Form + Zod per form
- Geist Sans (self-hosted) come font primario
- Deploy su Vercel

## Regole inviolabili

### Design
- Il design deve essere **gold standard 2026** — NON copiare nulla del sito attuale (WordPress datato 2020)
- Riferimenti: Linear.app, Vercel.com, Stripe.com — ma con tono caldo e umano (non tech startup)
- Il verde brand `#5a981d` va mantenuto come accento, la palette completa è nel PRD
- Foto di Verona reali e belle, MAI stock generiche
- Nessun elemento che sembri "template AI" (gradienti arcobaleno, icone enormi decorative, badge senza significato)

### Privacy / GDPR
- **Font self-hosted** via `next/font` — MAI CDN esterni a runtime
- **NIENTE Google** embeddato senza consenso: no Analytics, no Maps embed, no reCAPTCHA
- **Cookie banner** conforme Linee Guida Garante 10/06/2021: "Accetta" e "Rifiuta" con STESSA evidenza, blocco preventivo cookie non tecnici
- **Captcha**: Friendly Captcha (EU-based) o honeypot — MAI Google reCAPTCHA
- **Mappa**: OpenStreetMap o link esterno — MAI Google Maps embed
- Informativa privacy completa art. 13 GDPR con base giuridica per ogni finalità
- Cookie policy con tabella cookie (nome, finalità, durata)

### Codice
- Tutte le stringhe visibili in `lib/constants.ts` — zero hardcoded nei componenti
- **Accenti italiani** corretti in OGNI stringa: è, é, à, ì, ò, ù — MAI "attivita", SEMPRE "attività"
- Componenti piccoli, single-responsibility, riutilizzabili
- Zero TypeScript warning, zero "Lorem ipsum"
- Messaggi di errore form in italiano
- File piccoli, naming coerente, zero monoliti

### Contenuti
- Tutto il contenuto è in italiano
- I testi originali del sito vanno riscritti con tono leggermente più moderno e spendibile online
- MAI inventare servizi o informazioni non presenti nel PRD
- Il sito è per uno studio di amministrazione condominiale a Verona — contesto italiano, tono professionale ma accessibile

## Struttura progetto

```
src/
├── app/          # Pagine (App Router)
├── components/
│   ├── layout/   # Header, Footer, MobileMenu, CookieBanner
│   ├── ui/       # Design system (shadcn/ui customizzato)
│   ├── sections/ # Hero, ServicesGrid, Testimonials, FAQ, CTABanner, ContactInfo
│   └── forms/    # ContactForm, PreventivForm
├── lib/          # constants.ts, validations.ts, cookies.ts, email.ts
├── styles/       # globals.css
└── public/       # images/, documents/, favicon
```

## Piano operativo

5 fasi sequenziali (dettagli nel PRD sezione 11):
1. Setup e Design System
2. Pagine contenuto
3. Form e interattività
4. Privacy e compliance
5. Polish e deploy

Ogni fase lascia il sito funzionante. Verificare prima di passare alla successiva.

## Dati aziendali (in `lib/constants.ts`)

- AMCO Service SRL
- Via Francesco Morosini 7, 37138 Verona (VR)
- P.IVA 04154310231 — REA VR-396836
- Tel: 045 560066 / 045 8186033
- Emergenze: 800 694 988
- Email: info@amcovr.it
- Portale condomini: https://www.miocondominio.eu (link esterno)
