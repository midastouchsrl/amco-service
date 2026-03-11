# Handoff Document - AMCO Service Website

**Data:** 2026-03-09
**Stato:** Fase 2 completata, pronta per Fase 3

---

## Stato del Progetto

### Completato (Fase 1 + 2)

**Setup & Design System:**
- [x] Next.js 14 + TypeScript + Tailwind CSS + App Router
- [x] shadcn/ui configurato con componenti custom
- [x] Tailwind con colori brand AMCO (`#5a981d` verde primario)
- [x] Font Inter self-hosted via `next/font/google`
- [x] `lib/constants.ts` con tutte le stringhe centralizzate
- [x] Build production funzionante

**Layout Components:**
- [x] `Header.tsx` - Navigazione sticky con blur on scroll
- [x] `Footer.tsx` - 4 colonne, link rapidi, contatti, legale
- [x] `MobileMenu.tsx` - Slide-in da destra

**Pagine create (11 totali):**
- [x] `/` - Homepage con Hero, About, Servizi, Testimonials, FAQ, CTA
- [x] `/chi-siamo` - Storia, 4 pilastri, futuro
- [x] `/servizi` - Amministrazione + Elaborazione Dati (19 servizi)
- [x] `/accesso-condomini` - Credenziali, funzionalità portale
- [x] `/modulistica` - Download moduli
- [x] `/contatti` - Info + ContactForm
- [x] `/preventivo` - Form completo dati richiedente + stabile
- [x] `/lavora-con-noi` - Invio CV via email
- [x] `/emergenze` - Numero verde prominente
- [x] `/privacy` - Informativa GDPR completa
- [x] `/cookie-policy` - Cookie policy con tabella

**Componenti Form:**
- [x] `ContactForm.tsx` - React Hook Form + Zod, honeypot, checkbox privacy

---

## Da Completare (Fase 3 + 4 + 5)

### Fase 3 - Form e Interattività
- [ ] **API Route `/api/contact`** - Riceve form contatto, invia email
  - Validazione server-side con Zod
  - Rate limiting base (max 5 richieste/IP/ora)
  - Honeypot check (se compilato = bot)
  - Se servizio email non configurato: `console.log` placeholder

- [ ] **API Route `/api/preventivo`** - Riceve form preventivo, invia email
  - Stessa logica del form contatto
  - Email formattata con tutti i dati stabile

- [ ] **Logica invio email** (`lib/email.ts`)
  - Placeholder per Resend/Brevo
  - Configurare quando si avranno le credenziali

### Fase 4 - Privacy e Compliance
- [ ] **Cookie Banner** (`components/layout/CookieBanner.tsx`)
  - Conforme Linee Guida Garante 10/06/2021
  - "Accetta" e "Rifiuta" con STESSA evidenza (OBBLIGATORIO)
  - Link "Gestisci preferenze" con pannello toggle
  - Blocco preventivo cookie non tecnici

- [ ] **Logica Cookie** (`lib/cookies.ts`)
  - `getCookieConsent()` - legge stato
  - `setCookieConsent(preferences)` - salva con timestamp
  - `hasConsentExpired()` - verifica scadenza 180 giorni
  - `resetCookieConsent()` - reset da "Gestisci cookie" footer

- [ ] **Integrazione checkbox privacy** - Già presente nei form, verifica funzionamento

### Fase 5 - Polish e Deploy
- [ ] **SEO:** Sitemap (`app/sitemap.ts`), robots (`app/robots.ts`)
- [ ] **Immagini:** Scaricare foto Verona aggiuntive (Ponte Pietra, Piazza Erbe)
- [ ] **Logo:** Convertire `logo-source.jpg` in SVG
- [ ] **Test responsive** (mobile 375px, tablet 768px, desktop 1280px)
- [ ] **Test accessibilita** base (navigazione tastiera, contrasto)
- [ ] **Deploy Vercel**

---

## Struttura File Corrente

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Homepage
│   ├── chi-siamo/page.tsx
│   ├── servizi/page.tsx
│   ├── accesso-condomini/page.tsx
│   ├── modulistica/page.tsx
│   ├── contatti/page.tsx
│   ├── preventivo/page.tsx
│   ├── lavora-con-noi/page.tsx
│   ├── emergenze/page.tsx
│   ├── privacy/page.tsx
│   ├── cookie-policy/page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── forms/
│   │   └── ContactForm.tsx
│   └── ui/                  # shadcn/ui components
└── lib/
    ├── constants.ts         # TUTTE le stringhe centralizzate
    └── utils.ts
```

---

## Comandi Utili

```bash
# Avvia dev server
npm run dev

# Build production
npm run build

# Avvia production server
npm run start
```

---

## Note Tecniche Importanti

1. **Accenti italiani**: Tutte le stringhe in `constants.ts` hanno accenti corretti (è, é, à, ì, ò, ù)

2. **Zod 4.x**: La sintassi per `z.enum()` e' cambiata:
   ```ts
   // CORRETTO in Zod 4.x
   z.enum(["yes", "no"], { message: ERRORS.required })
   // NON funziona piu
   z.enum(["yes", "no"], { required_error: ERRORS.required })
   ```

3. **Button component**: Riscritto per supportare `asChild` con `@radix-ui/react-slot`

4. **Accordion component**: Riscritto per usare `@radix-ui/react-accordion`

5. **GDPR**:
   - Font self-hosted (Inter via next/font/google)
   - NO Google Analytics/Maps embed senza consenso
   - Cookie banner deve avere Accetta/Rifiuta con STESSA evidenza

---

## Prossimi Passi (per continuare)

1. **Creare API routes:**
   ```
   src/app/api/contact/route.ts
   src/app/api/preventivo/route.ts
   ```

2. **Creare Cookie Banner:**
   ```
   src/components/layout/CookieBanner.tsx
   src/lib/cookies.ts
   ```

3. **Integrare Cookie Banner nel layout:**
   ```tsx
   // In layout.tsx, aggiungere dopo <Footer />
   <CookieBanner />
   ```

4. **Testare form submission** (verificare console.log placeholder)

5. **Deploy su Vercel**

---

## Contatti & Riferimenti

- **PRD completo:** `/PRD.md`
- **Istruzioni progetto:** `/CLAUDE.md`
- **Dev server:** `http://localhost:3000`
