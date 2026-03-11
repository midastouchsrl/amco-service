# AMCO Service — Contesto e storico del progetto

## Come nasce questo progetto

AMCO Service SRL è uno studio di amministrazione condominiale a Verona che gestisce oltre 130 condomini. È un cliente importante di **Amministratore Protetto** (Midas Touch SRL, titolare: Federico Massoli), il portale attraverso cui gli eroga servizi digitali per la gestione condominiale.

A marzo 2026, Marco di AMCO Service ha chiesto a Federico di verificare il loro sito web (www.amcovr.it) dal punto di vista della compliance privacy/GDPR. Federico ha fatto eseguire un assessment completo e ha riscontrato diverse criticità.

Parallelamente, Federico stava valutando di attivare un **servizio di realizzazione siti web per i suoi clienti amministratori** — molti lo avevano chiesto non avendo chi si occupasse celermente del loro sito. Ha quindi colto l'occasione per fare un test reale: rifare il sito di AMCO Service da zero come prototipo/regalo, senza che fosse stato richiesto e senza nulla a pretendere.

Il sito nuovo è stato realizzato in questa repository ed è pensato per essere offerto ad AMCO a titolo gratuito, come valore aggiunto nel rapporto di collaborazione esistente.

---

## Assessment del sito originale (www.amcovr.it)

L'assessment completo è in `docs/audit-sito-originale/report-amco-service-marzo-2026.md`.

### Sito originale: caratteristiche
- WordPress datato (design ~2020)
- Certificato SSL attivo
- Nessun tracker di marketing (no Google Analytics, no Facebook Pixel)
- Dati aziendali presenti (P.IVA, REA, L. 4/2013)
- Informativa privacy e cookie policy linkate nel footer

### Criticità riscontrate (marzo 2026)

| # | Criticità | Priorità | Dettaglio |
|---|-----------|----------|-----------|
| 1 | **Cookie banner assente** | Alta | Le Linee Guida del Garante 10/06/2021 richiedono un banner con "Accetta" e "Rifiuta" con stessa evidenza visiva. Il sito usa reCAPTCHA che installa cookie non tecnici senza consenso preventivo. |
| 2 | **Informativa privacy incompleta** | Alta | Mancano: base giuridica per ogni finalità (art. 6 GDPR), destinatari specifici, trasferimento dati extra-UE (reCAPTCHA → USA), periodi di conservazione concreti, data di aggiornamento. |
| 3 | **Cookie policy datata 2018** | Media | Non aggiornata alle Linee Guida Garante 2021. Manca elenco cookie con nome/finalità/durata. reCAPTCHA non menzionato. |
| 4 | **Google reCAPTCHA non gestito** | Media | Installa cookie senza consenso. Trasferisce dati a Google USA. Dal 2 aprile 2026 Google diventa responsabile del trattamento, serve DPA. |
| 5 | **Checkbox privacy non uniforme** | Bassa | Presente nel form contatti ma non in tutti i form. |

### Riferimenti normativi
- Regolamento UE 2016/679 (GDPR) — artt. 6, 7, 13, 37, 44-49
- D.Lgs. 196/2003 — art. 122
- Linee Guida Garante Privacy 10/06/2021 (provv. n. 231)
- Provvedimento Garante 9/06/2022 (Google Analytics e trasferimenti USA)

---

## Il nuovo sito: come risolve le criticità

Il sito è stato rifatto da zero in **Next.js 14 + TypeScript + Tailwind CSS**, con design gold standard 2026 ispirato a Linear/Vercel/Stripe ma con tono caldo e professionale.

### Criticità → Risoluzione

| Criticità originale | Come è stata risolta |
|---------------------|---------------------|
| Cookie banner assente | Cookie banner conforme implementato (`CookieBanner.tsx`): "Accetta" e "Rifiuta" con stessa evidenza, gestione preferenze per categoria, blocco preventivo cookie non tecnici, consent registrato per 180 giorni. |
| Informativa privacy incompleta | Informativa completa art. 13 GDPR (`/privacy`): base giuridica per ogni finalità, destinatari specifici (Vercel, Friendly Captcha, Resend/Brevo), trasferimento extra-UE dichiarato, periodi conservazione concreti, data aggiornamento. |
| Cookie policy datata | Cookie policy aggiornata (`/cookie-policy`): tabella cookie con nome/tipo/finalità/durata/parte, collegamento al meccanismo di consenso. |
| Google reCAPTCHA | **Eliminato completamente**. Sostituibile con Friendly Captcha (EU-based) o honeypot. Nessun cookie di terze parti, nessun trasferimento extra-UE. |
| Checkbox privacy non uniforme | Checkbox privacy presente su **tutti** i form (contatto e preventivo) con link all'informativa. |

### Compliance aggiuntiva del nuovo sito
- **Font self-hosted** via `next/font` (Inter) — nessuna chiamata a CDN esterni a runtime
- **Nessun servizio Google** embeddato: no Analytics, no Maps embed, no reCAPTCHA
- **Mappa**: link esterno a OpenStreetMap/Google Maps — nessun embed con cookie
- **Tutte le pagine sono statiche** (SSG): nessun dato utente processato server-side tranne le API dei form
- **HTTPS** ovviamente obbligatorio (gestito da Vercel)

---

## Stack tecnico

| Componente | Tecnologia |
|-----------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguaggio | TypeScript |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Form | React Hook Form + Zod |
| Font | Inter (self-hosted via `next/font`) |
| Deploy | Vercel |
| Captcha | Friendly Captcha (EU) o honeypot |
| Mappa | Link esterno (no embed) |
| Analytics | Nessuno (per ora) |

---

## Struttura del progetto

```
src/
├── app/                    # Pagine (App Router, tutte SSG)
│   ├── layout.tsx          # Layout root con JSON-LD, metadata, Header/Footer
│   ├── page.tsx            # Homepage
│   ├── chi-siamo/          # Chi siamo (= "La nostra storia" del sito originale)
│   ├── servizi/            # Servizi
│   ├── accesso-condomini/  # Accesso al portale MioCondominio
│   ├── modulistica/        # Download moduli + link compilazione online
│   ├── contatti/           # Contatti + form
│   ├── preventivo/         # Form richiesta preventivo
│   ├── emergenze/          # Numero verde emergenze
│   ├── lavora-con-noi/     # Candidature
│   ├── privacy/            # Informativa privacy art. 13 GDPR
│   ├── cookie-policy/      # Cookie policy
│   ├── sitemap.ts          # Sitemap dinamica
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Header, Footer, MobileMenu, CookieBanner
│   ├── ui/                 # Design system (shadcn/ui)
│   ├── sections/           # Hero, ServicesGrid, Testimonials, FAQ, CTABanner
│   └── forms/              # ContactForm, PreventivForm
├── lib/
│   ├── constants.ts        # TUTTE le stringhe visibili (centralizzate)
│   ├── validations.ts      # Schema Zod per form
│   └── utils.ts            # Utility (cn)
public/
├── images/                 # Logo PNG (colori + white), foto Verona
├── documents/              # PDF scaricabili (modulo anagrafica)
└── favicon
```

---

## Design system e colori

| Token | Valore | Uso |
|-------|--------|-----|
| `brand` | `#5a981d` | Verde AMCO — colore primario, CTA, accenti |
| `brand-dark` | `#3d6e0f` | Hover su brand |
| `brand-light` | `#e8f5de` | Background leggeri, selection |
| `foreground` | `#0f172a` | Testo principale, hero scuri |
| `text` | `#334155` | Testo body |
| `text-muted` | `#64748b` | Testo secondario |
| `surface` | `#f8fafc` | Background sezioni alternate |
| `border` | `#e2e8f0` | Bordi |
| Footer | `#384b5a` | Grigio scuro (non usa la variabile foreground) |

---

## Loghi

| File | Uso | Formato |
|------|-----|---------|
| `public/images/logo.png` | Header + Mobile menu | PNG trasparente, colori originali (verde + grigio scuro) |
| `public/images/logo-white.png` | Footer (sfondo scuro) | PNG trasparente, versione bianca |

---

## SEO

- **Metadata** completi su ogni pagina (title, description, OpenGraph)
- **JSON-LD** `LocalBusiness` nel layout root
- **Sitemap** generata automaticamente (`/sitemap.xml`)
- **robots.txt** configurato (`/robots.txt`)
- **Tutte le pagine statiche** (SSG) — First Load JS homepage: ~116KB
- **Immagini** ottimizzate via `next/image` (WebP automatico, lazy loading, responsive)
- **Font** con `display: swap` per evitare FOIT

---

## Modulistica

La pagina `/modulistica` contiene il **Modulo Anagrafica Condominiale** (art. 1130 c.c.) con due opzioni:
1. **Scarica PDF** — scarica il modulo cartaceo (`/documents/modulo-anagrafica-condominiale.pdf`)
2. **Compila online** — link esterno a `https://app.amministratoreprotetto.it/anagrafica-condominiale`

Il PDF è quello ufficiale di AMCO Service (4 pagine, con intestazione AMCO e tutti i campi previsti dalla legge).

---

## Recensioni

Le testimonianze nella sezione "Cosa dicono di noi" sono le recensioni **originali** prese dal sito www.amcovr.it, testo esatto senza parafrasi. Autori: Daria, Roberta, Chiara, Cecilia.

---

## Comunicazione con il cliente

### Situazione
AMCO Service non ha chiesto il rifacimento del sito. Ha chiesto solo una verifica privacy. Il sito è stato rifatto come test interno per un nuovo servizio e come omaggio.

### Tono della comunicazione
- Il sito è un regalo, non una proposta commerciale
- Se il loro attuale fornitore web è una persona di fiducia, non si vuole interferire
- Le criticità privacy restano valide indipendentemente dal sito nuovo
- La bozza della mail di proposta è in `mail-proposta-sito-amco.md` nella root

### Documenti correlati
- `docs/audit-sito-originale/report-amco-service-marzo-2026.md` — Assessment privacy completo
- `docs/audit-sito-originale/mail-amco-service.md` — Bozza mail precedente (non inviata, sostituita da `mail-proposta-sito-amco.md`)
- `mail-proposta-sito-amco.md` — Mail definitiva da inviare

---

## Differenze note con il sito originale

| Elemento sito originale | Stato nel nuovo sito | Note |
|--------------------------|---------------------|------|
| La nostra storia | Presente come "Chi siamo" | Stesso contenuto, nome pagina diverso |
| Servizi | Presente | Elenco completo con icone |
| Accesso Condomini | Presente | Link a miocondominio.eu |
| Modulistica | Presente + migliorata | Aggiunto "Compila online" |
| Contatti | Presente | Form + mappa OpenStreetMap |
| Emergenze | Presente | Numero verde dedicato |
| Lavora con noi | Presente | |
| Scarica presentazione | **Non presente** | Manca il PDF della presentazione aziendale. Se disponibile, va aggiunto. |
| Footer verde (#5a981d) | Footer grigio (#384b5a) | Scelta del cliente |
| reCAPTCHA Google | Rimosso | Sostituito con alternative EU-compliant |

---

*Ultimo aggiornamento: 11 marzo 2026*
