# PRD — Sito Web AMCO Service SRL

> **Versione:** 1.0
> **Data:** 2026-03-09
> **Tipo:** Rifacimento completo sito web
> **Stato:** Ready for implementation

---

## 1. Overview

AMCO Service SRL e uno studio di amministrazione condominiale con sede a Verona. Opera sul territorio dal 2002 (storia dal 1973) e gestisce oltre 130 condomini. Il sito attuale (WordPress datato su www.amcovr.it) va rifatto da zero in Next.js 14 con un design moderno, performante e pienamente conforme GDPR.

**Obiettivo:** sito vetrina professionale che comunichi affidabilita, competenza e radicamento nel territorio veronese. Nessun backend/CMS, nessuna area riservata (quella esiste gia su miocondominio.eu).

---

## 2. Dati aziendali

Questi dati vanno centralizzati in `lib/constants.ts` e usati ovunque servano (header, footer, form, pagine legali). MAI duplicarli come stringhe sparse nei componenti.

```
Ragione sociale: AMCO Service SRL
Indirizzo:       Via Francesco Morosini 7, 37138 Verona (VR)
P.IVA:           04154310231
REA:             VR-396836
Telefono 1:      045 560066
Telefono 2:      045 8186033
Numero verde:    800 694 988 (emergenze)
Email:           info@amcovr.it
PEC:             amcoservicesasvr@pec.it
Web:             www.amcovr.it
Rif. legale:     Professione esercitata ai sensi della legge 14 gennaio 2013, n.4
```

---

## 3. Brand e Design System

**ATTENZIONE:** Il sito attuale (WordPress, tema 2020, font Verdana, design piatto) è COMPLETAMENTE SUPERATO. Il nuovo sito NON deve copiare nulla dell'estetica attuale. Deve essere un redesign totale, gold standard 2026, al livello dei migliori siti professionali contemporanei.

**Riferimenti stilistici (studiare prima di progettare):**
- **Linear.app** — pulizia estrema, tipografia come elemento di design, spacing generoso
- **Vercel.com** — gerarchia visiva perfetta, dark/light contrast, micro-interazioni
- **Stripe.com** — storytelling visivo, gradient raffinati, sensazione premium
- **Cal.com** — semplicità, accessibilità, chiarezza
- Ma con un tono più CALDO e UMANO: questo è uno studio di Verona che gestisce condomini, non una startup tech. L'obiettivo è comunicare fiducia, competenza e vicinanza.

### 3.1 Palette colori

Il verde AMCO (#5a981d) è il colore del brand e va mantenuto come identità, ma l'intera palette va modernizzata per un look premium 2026.

**Colori primari:**

| Token | Hex | Uso |
|-------|-----|-----|
| `brand` | `#5a981d` | Accento primario: CTA, link, elementi interattivi, icone |
| `brand-dark` | `#3d6e0f` | Hover bottoni primari, stati attivi |
| `brand-light` | `#e8f5de` | Badge, sfondo highlight, chip, alert success |
| `brand-subtle` | `#f4faf0` | Sfondo sezioni accent, hover leggeri |

**Neutrali (moderni, NON i grigi del vecchio sito):**

| Token | Hex | Uso |
|-------|-----|-----|
| `foreground` | `#0f172a` | Testo heading (slate-900, quasi nero ma più raffinato) |
| `text` | `#334155` | Testo body (slate-700) |
| `text-muted` | `#64748b` | Testo secondario, caption, placeholder (slate-500) |
| `border` | `#e2e8f0` | Bordi card, separatori (slate-200) |
| `surface` | `#f8fafc` | Sfondo sezioni alternate (slate-50) |
| `background` | `#ffffff` | Sfondo pagina |

**Accenti funzionali:**

| Token | Hex | Uso |
|-------|-----|-----|
| `accent-warm` | `#f59e0b` | Stelle recensioni, badge premium (amber-500) |
| `destructive` | `#ef4444` | Errori form, validazione (red-500) |
| `emergency` | `#dc2626` | Pagina emergenze, badge urgenti (red-600) |

Configurazione `tailwind.config.ts`:

```ts
colors: {
  brand: {
    DEFAULT: '#5a981d',
    dark: '#3d6e0f',
    light: '#e8f5de',
    subtle: '#f4faf0',
  },
  foreground: '#0f172a',
  text: {
    DEFAULT: '#334155',
    muted: '#64748b',
  },
  border: '#e2e8f0',
  surface: '#f8fafc',
  // + accent-warm, destructive, emergency
}
```

### 3.2 Logo

Fonte originale: `https://www.amcovr.it/wp-content/uploads/2020/10/image001.jpg`

Il logo è "AMCO" in grigio scuro con "SERVICE" sotto in verde oliva, font maiuscolo geometrico. Scaricare, convertire in **SVG** (vettoriale, nitido a qualsiasi dimensione), salvare in `public/images/logo.svg`. Versioni: logo completo per header desktop, icona sola (la A di AMCO) per favicon e mobile condensato.

### 3.3 Tipografia — Moderna, premium

**Font primario:** **Geist Sans** (il font di Vercel, 2024 — pulito, geometrico, ottimizzato per il web)
- Self-hosted OBBLIGATORIO via `next/font/local` (Geist non è su Google Fonts, va scaricato da https://vercel.com/font)
- Se Geist non è disponibile/integrabile: **Inter** come fallback (via `next/font/google` che fa self-hosting a build time)
- **MAI** caricare font da CDN esterni a runtime (violazione GDPR per trasferimento dati)

**Scala tipografica (fluid, responsive):**

| Elemento | Desktop | Mobile | Peso | Colore |
|----------|---------|--------|------|--------|
| Hero headline | 56-64px | 36-40px | 700 (Bold) | `foreground` |
| H1 pagina | 40-48px | 32-36px | 700 | `foreground` |
| H2 sezione | 32-36px | 24-28px | 600 (Semibold) | `foreground` |
| H3 card title | 20-24px | 18-20px | 600 | `foreground` |
| Body | 16-18px | 16px | 400 (Regular) | `text` |
| Body large (intro) | 20px | 18px | 400 | `text` |
| Small / Caption | 14px | 13px | 400 | `text-muted` |
| Label / Overline | 12-13px | 12px | 500, uppercase, letter-spacing 0.05em | `text-muted` |

**Regola d'oro tipografica:** i titoli devono avere RESPIRO. `line-height` heading: 1.1-1.2. `line-height` body: 1.6-1.7. `letter-spacing` heading: -0.02em (tight). Mai testo compresso o soffocato.

### 3.4 Stile componenti — Design language 2026

**Filosofia:** meno bordi, più spazio. Meno decorazione, più contenuto. Le card si distinguono dallo sfondo grazie a ombra e background, non grazie a bordi pesanti. Transizioni fluide ovunque.

**Card:**
- Background: `white`
- Bordo: `1px solid border` oppure nessun bordo (solo ombra)
- `border-radius: 16px` (più generoso del solito, trend 2026)
- Ombra: `shadow-sm` a riposo → `shadow-lg` on hover (elevazione come linguaggio)
- Transizione: `transition-all duration-300 ease-out`
- Padding interno: `p-6` o `p-8` (generoso)

**Bottoni:**
- Primario: `bg-brand text-white rounded-xl px-6 py-3 font-medium shadow-sm hover:bg-brand-dark hover:shadow-md transition-all duration-200`
- Secondario: `border-2 border-brand text-brand rounded-xl px-6 py-3 font-medium hover:bg-brand-subtle transition-all duration-200`
- Ghost: `text-brand hover:bg-brand-subtle rounded-xl px-6 py-3 transition-all duration-200`
- Dimensione minima touch: 44x44px (accessibilità)
- `border-radius: 12px` (rounded-xl)

**Sezioni pagina:**
- Alternare sfondo `white` e `surface` per creare ritmo
- Padding verticale: `py-24` desktop (96px), `py-16` mobile (64px) — molto più generoso del vecchio sito
- Max-width contenuto: `max-w-6xl` (1152px) per testo, `max-w-7xl` (1280px) per griglie
- Container: `mx-auto px-6 sm:px-8 lg:px-12`

**Hero:**
- Full-width con immagine di Verona
- Overlay: gradient scuro semi-trasparente (non nero piatto: usare `bg-gradient-to-r from-black/70 via-black/40 to-transparent` per effetto cinematografico)
- Testo bianco grande con ombra leggera per leggibilità
- Altezza: `min-h-[70vh]` desktop, `min-h-[50vh]` mobile
- CTA con bottone grande e luminoso (bianco o brand-light su sfondo scuro)

**Effetti e micro-interazioni (sottili, MAI pacchiani):**
- Hover card: leggero `translateY(-2px)` + shadow increase
- Scroll: sezioni che appaiono con fade-in dal basso (CSS `@keyframes` o Intersection Observer, NO librerie pesanti come Framer Motion per un sito vetrina)
- Link: underline che appare on hover con transizione
- Bottoni: leggero scale(1.02) on hover
- Focus visible: ring `brand` per accessibilità

**Separatori tra sezioni:**
- Mai linee orizzontali pesanti. Preferire: cambio di sfondo, spacing generoso, o divider sottilissimo (`border-t border-border/50`)

**Icone:**
- Lucide React (già incluso con shadcn/ui) — set coerente, outline style
- Dimensione: 20-24px per inline, 32-40px per card icons
- Colore: `brand` per accenti, `text-muted` per decorative

### 3.5 Tono del design — Visione creativa

**Il sito deve sembrare progettato da un designer di livello, non generato da AI.**

Immaginare un visitatore (amministratore di condominio o condomino) che arriva sul sito: deve percepire immediatamente professionalità, solidità e modernità. Deve pensare "questi sono seri, sono al passo coi tempi". Non deve pensare "sembra un template".

**Cosa comunica il design:**
- **Competenza** → tipografia curata, gerarchia chiara, nessun elemento fuori posto
- **Affidabilità** → colori solidi, layout ordinato, foto reali del territorio
- **Vicinanza** → tono caldo, foto di Verona (il LORO territorio), testimonial reali
- **Modernità** → design 2026, non 2018. Mostra che lo studio investe in qualità

**Anti-pattern da evitare (sembra template AI):**
- Gradienti arcobaleno o troppo vivaci
- Icone enormi decorative senza significato
- Troppi colori diversi sulla stessa pagina
- Bordi spessi e ombre pesanti (stile Bootstrap 2019)
- Sfondi colorati saturi dietro le sezioni
- Font decorativi o troppo diversi tra loro
- Stock photo generiche (gente in ufficio che sorride, strette di mano)
- Badge e chip decorativi senza contenuto informativo

---

## 4. Immagini

### 4.1 Foto di Verona — Alta qualità editoriale

Le foto sono un elemento chiave del design. Devono comunicare che AMCO è radicata a Verona, ama il suo territorio e lo conosce bene. NO a foto stock generiche di "città italiana qualsiasi".

**Fonti:** Unsplash o Pexels (royalty-free). Cercare specificamente "Verona Italy".

**Soggetti e utilizzo:**

| Soggetto | Dove usarla | Note |
|----------|-------------|------|
| Arena di Verona (esterno, prospettiva ampia) | Hero homepage | Iconica, riconoscibile, suggestiva |
| Ponte Pietra con l'Adige | Pagina chi siamo | Racconta storia e territorio |
| Piazza delle Erbe dall'alto | Sezione servizi o background | Vita quotidiana veronese |
| Panorama skyline al tramonto | CTA banner | Emotiva, calore |
| Lungadige / vie del centro storico | Pagina contatti | Localizzazione, vicinanza |
| Dettaglio architettonico (palazzo, portone, cortile) | Pagina servizi o accesso condomini | Collegamento al mondo condominiale |

**Criteri di selezione:**
- Luce naturale, preferibilmente golden hour o cielo azzurro
- Alta risoluzione (minimo 1920px lato lungo)
- Composizione curata (non foto turistiche amatoriali)
- Colori che si armonizzano con la palette del brand (toni caldi, verdi naturali)

### 4.2 Trattamento immagini

- Formato: **WebP** per il web, ottimizzati con `next/image`
- Hero: full-width, overlay gradient cinematografico (`from-black/70 via-black/40 to-transparent`), testo bianco sovrapposto
- Pagine interne: immagini hero più contenute (`max-h-[400px]`) oppure usate come accent laterale
- Aspect ratio hero: `~21:9` desktop, `~16:9` tablet, `~3:2` mobile
- `object-cover` + `object-center` ovunque
- Lazy loading su tutto tranne hero homepage (`priority`)

---

## 5. Struttura pagine

### 5.1 Homepage (`/`)

**Sezione Hero:**
- Immagine suggestiva di Verona full-width (Arena o Ponte Pietra)
- Overlay gradient scuro (da sinistra o dal basso)
- Tagline: testo evocativo che comunichi competenza e radicamento territoriale
- Sottotitolo: "Oltre 130 condomini gestiti a Verona dal 2002"
- CTA primaria: "Richiedi un preventivo" (link a `/preventivo`)
- CTA secondaria: "Scopri i nostri servizi" (link a `/servizi`)

**Sezione Chi siamo (breve):**
- 2-3 frasi di presentazione dello studio
- Link "Scopri la nostra storia" a `/chi-siamo`
- Opzionale: foto dello studio o elemento grafico

**Sezione Servizi:**
- Griglia 2-3 colonne con card
- Due macro-categorie: Amministrazione Condominiale, Elaborazione Dati
- Ogni card: icona, titolo, breve descrizione (2-3 servizi rappresentativi per categoria)
- Link "Tutti i servizi" a `/servizi`

**Sezione Testimonial:**
- Layout orizzontale scrollabile o griglia 2x2
- 4 recensioni reali:

| Nome | Testo |
|------|-------|
| Daria | "La cortesia e la professionalita di tutti i collaboratori. La disponibilita e la tempestivita degli interventi richiesti" |
| Roberta | "Abbiamo dato la gestione ad AMCO Service fin dalla costruzione dello stabile. Sono attenti, veloci e professionali. A disposizione per ogni necessita/problema" |
| Chiara | "Competenza, affidabilita, gentilezza e disponibilita sono la regola. Non l'eccezione. Consigliati!" |
| Cecilia | "Una gestione sempre puntuale del condominio ed una grande disponibilita in caso di emergenza. Consiglio!" |

**ATTENZIONE ACCENTI:** nelle stringhe finali nel codice, tutti gli accenti devono essere corretti: professionalita -> professionalita' NON serve, usare il carattere corretto: `professionalità`, `disponibilità`, `tempestività`, `necessità`. MAI omettere gli accenti.

**Sezione FAQ:**
- Componente Accordion (shadcn/ui)
- 5 domande:

| Domanda | Risposta |
|---------|----------|
| Quando e obbligatorio l'amministratore? | Quando i condomini sono piu di otto |
| A cosa serve il regolamento condominiale? | Disciplina l'uso delle cose comuni, la ripartizione delle spese e le norme per la tutela del decoro dell'edificio |
| Cosa succede in caso di infrazione del regolamento? | L'amministratore puo irrogare una sanzione pecuniaria fino a 200 euro, elevata a 800 euro in caso di recidiva |
| Posso gestire autonomamente la mia posizione? | Si, con le credenziali fornite da AMCO Service e possibile accedere al portale area riservata per consultare documenti, scadenze e comunicazioni |
| Ho dimenticato la password | La pagina di accesso al portale consente il recupero automatico della password |

**ACCENTI nelle stringhe reali nel codice:** `e obbligatorio` -> `è obbligatorio`, `piu` -> `più`, `puo` -> `può`, `Si` -> `Sì`, `e possibile` -> `è possibile`. Regola: OGNI stringa visibile all'utente DEVE avere gli accenti italiani corretti.

**Sezione CTA Preventivo:**
- Banner con sfondo `amco-green` o gradient
- Testo: invito a richiedere un preventivo senza impegno
- Bottone bianco: "Richiedi un preventivo gratuito" (link a `/preventivo`)

**Footer:** vedi sezione 6.2

### 5.2 La nostra storia (`/chi-siamo`)

Contenuto narrativo da riscrivere in tono professionale ma accessibile, leggermente piu moderno. Mantenere il senso esatto, non inventare.

**Paragrafo storia (fonte da riadattare):**
"Operiamo sul territorio dal 2002 ma la nostra storia e iniziata nel 1973. Inizialmente radicata nel territorio milanese l'attivita di amministrazione immobiliare ha deciso nel tempo di spostarsi a Verona conoscendo qui una nuova realta che ha abbracciato come una seconda madre. La scommessa di inizio millennio era diventare un punto di riferimento indipendente per il complesso mondo dell'amministrazione condominiale e oggi gestiamo oltre 130 stabili puntando ad una crescita progressiva e pianificata."

**I quattro pilastri** (visualizzarli come card o griglia iconica):
1. Essere indipendenti e affermare il proprio marchio
2. Creare e alimentare collaborazioni di qualita con personale, collaboratori, fornitori
3. Investire costantemente nel rapporto con l'utenza
4. Essere una squadra dentro lo studio, fuori e fra le mura domestiche degli stabili

**Sezione futuro (fonte da riadattare):**
"Per quanto riguarda noi la convinzione nella pianificazione ci porta a non vivere l'attesa del domani ma a costruire oggi cio che vogliamo diventare. Siamo abituati a pianificare e investire costantemente in ricerca, formazione, sviluppo tecnologico e risorse umane valorizzando senza sosta ognuno di questi elementi fondamentali."

### 5.3 Servizi (`/servizi`)

Pagina con due sezioni distinte, ciascuna con griglia di card.

**Amministrazione Condominiale:**
- Gestione contabilita
- Gestione integrata tramite software dedicato
- Monitoraggio pagamenti
- Gestione fornitori e contratti di manutenzione
- Preparazione bilanci
- Convocazione assemblee
- Supervisione lavori straordinari
- Gestione fondi su conti correnti dedicati
- Reperibilita multicanale
- Ricerca opportunita di finanziamento

**Elaborazione Dati:**
- Bilanci preventivi, rendiconti, stati patrimoniali
- Riconciliazione bancaria
- Gestione incassi
- Elaborazione F24
- Certificazioni fiscali
- Gestione pratiche sinistri
- Fatturazione informatizzata
- Gestione pagamenti fornitori
- Supporto detrazioni fiscali

Ogni servizio: icona + titolo + eventuale breve descrizione (1 frase). Layout griglia 2-3 colonne responsive.

**ACCENTI:** `contabilita` -> `contabilità`, `reperibilita` -> `reperibilità`, `opportunita` -> `opportunità`. Sempre.

### 5.4 Accesso Condomini (`/accesso-condomini`)

Pagina informativa con:
- Spiegazione: cliccando sul bottone si accede a una piattaforma esterna (miocondominio.eu)
- Informazioni sui campi richiesti: PID, Login, Password (case sensitive)
- Bottone prominente: "Accedi al portale" che apre `https://www.miocondominio.eu` in nuova tab (`target="_blank" rel="noopener noreferrer"`)
- Nota: "Le credenziali vengono fornite da AMCO Service al momento dell'incarico"
- Lista funzionalita accessibili: scadenze, documenti, comunicazioni, informazioni condominiali
- Nota compatibilita: "Accessibile da smartphone, tablet e PC"

### 5.5 Modulistica (`/modulistica`)

Pagina semplice con:
- Un modulo scaricabile: "Modulo Anagrafica Condominiale"
- Link a PDF in `public/documents/modulo-anagrafica-condominiale.pdf`
- Icona download + nome file + descrizione breve
- Spazio predisposto per aggiungere altri moduli in futuro (layout griglia o lista)

**Nota per l'implementatore:** il PDF del modulo va recuperato dal sito attuale o fornito dal cliente. Se non disponibile, creare un placeholder visivo con nota "PDF da caricare".

### 5.6 Contatti (`/contatti`)

**Informazioni di contatto:**
- Indirizzo: Via Francesco Morosini 7, 37138 Verona (VR)
- Telefono: 045 560066 (lun-gio 9:00-12:30)
- Secondo numero: 045 8186033
- Numero verde emergenze: 800 694 988
- Avviso prominente: "SI RICEVE SOLO SU APPUNTAMENTO"

**Mappa:**
- NON usare Google Maps embed (trasferimento dati extra-UE senza consenso)
- Opzione 1: immagine statica della mappa con link a OpenStreetMap
- Opzione 2: embed OpenStreetMap (Leaflet) che non trasferisce dati a Google
- Opzione 3: link semplice "Aprici su Google Maps" che apre in nuova tab (l'utente sceglie consapevolmente)

**Form di contatto:**
- Campi: Nome (obbligatorio), Email (obbligatorio), Oggetto (obbligatorio), Messaggio (obbligatorio)
- Campo honeypot nascosto (anti-spam)
- Checkbox privacy obbligatoria: "Ho preso visione dell'[informativa privacy](/privacy)" (con link)
- Bottone "Invia messaggio"
- Validazione client-side con Zod
- Messaggi errore in italiano

### 5.7 Richiesta Preventivo (`/preventivo`)

Form articolato in due sezioni visive.

**Sezione 1 — Dati richiedente (tutti obbligatori):**

| Campo | Tipo | Validazione |
|-------|------|-------------|
| Nome | text | obbligatorio, min 2 caratteri |
| Cognome | text | obbligatorio, min 2 caratteri |
| Telefono | tel | obbligatorio, formato italiano |
| Email | email | obbligatorio, email valida |

**Sezione 2 — Dati dello stabile:**

| Campo | Tipo | Validazione |
|-------|------|-------------|
| Indirizzo | text | obbligatorio |
| Citta | text | obbligatorio |
| Provincia | text | obbligatorio (select con province italiane, o text libero) |
| CAP | text | obbligatorio, 5 cifre |
| Numero appartamenti | number | obbligatorio, min 1 |
| Numero garage | number | opzionale |
| Spazi commerciali aggiuntivi | text | opzionale (negozi, magazzini, uffici) |
| Ascensore | radio Si/No | obbligatorio |
| Portineria | radio Si/No | obbligatorio |
| Riscaldamento | select | obbligatorio: autonomo / centralizzato / teleriscaldamento |
| Pulizia scale | select | obbligatorio: ditta appaltatrice / dipendente / altro |
| Note | textarea | opzionale (es. contenziosi in corso) |

**Footer form:**
- Nota: "La richiesta non e impegnativa. I dati saranno utilizzati esclusivamente per preparare un preventivo personalizzato. Sarete successivamente contattati per un incontro informale e senza impegno."
- Checkbox privacy obbligatoria (come form contatto)
- Campo honeypot nascosto
- Bottone: "Invia richiesta"

### 5.8 Lavora con noi (`/lavora-con-noi`)

Pagina semplice con:
- Testo di invito: lo studio e sempre alla ricerca di talenti motivati, ecc.
- Invito a inviare il CV a `info@amcovr.it`
- Opzionale: form semplice con Nome, Email, Messaggio, Upload CV
- Se il form e troppo complesso per la prima release, un semplice invito con link `mailto:` e sufficiente

### 5.9 Emergenze (`/emergenze`)

Pagina con messaggio prominente e chiaro:
- Headline grande: "Emergenze"
- Numero verde in evidenza: **800 694 988**
- Testo: "Per interventi urgenti ed emergenze chiama il nostro numero verde, attivo per tutti i condomini gestiti da AMCO Service"
- Stile: numero grande, colore `amco-green`, possibilmente con icona telefono
- Link `tel:800694988` per chiamata diretta da mobile

### 5.10 Informativa Privacy (`/privacy`)

Informativa completa conforme art. 13 Regolamento UE 2016/679 (GDPR). Contenuto legale strutturato, non un muro di testo.

**Struttura obbligatoria:**

1. **Titolare del trattamento**
   - AMCO Service SRL, Via Francesco Morosini 7, 37138 Verona
   - Email: info@amcovr.it — Tel: 045 560066

2. **Finalita e base giuridica del trattamento**

   | Finalita | Base giuridica | Dati trattati |
   |----------|---------------|---------------|
   | Navigazione del sito e sicurezza | Legittimo interesse (art. 6.1.f) | Dati di navigazione (IP, browser, pagine visitate) |
   | Risposta a richieste via form contatto/preventivo | Esecuzione misure precontrattuali (art. 6.1.b) | Dati inseriti nel form (nome, email, telefono, ecc.) |
   | Cookie tecnici necessari al funzionamento | Legittimo interesse (art. 6.1.f) | Identificativi di sessione |
   | Cookie non tecnici (se presenti) | Consenso (art. 6.1.a) | Dipende dal servizio |

3. **Categorie di dati personali**
   - Dati di navigazione (raccolti automaticamente)
   - Dati forniti volontariamente tramite form

4. **Destinatari dei dati**
   - Hosting provider: Vercel Inc. (per il funzionamento del sito)
   - Servizio anti-spam: Friendly Captcha (se configurato — provider europeo, no trasferimento extra-UE)
   - Servizio invio email: Resend/Brevo (per l'invio delle email dei form)

5. **Trasferimenti extra-UE**
   - Vercel: servers in regione EU configurabili. Se non possibile garantire solo EU, menzionare Standard Contractual Clauses
   - Friendly Captcha: provider EU-based, nessun trasferimento extra-UE
   - Specificare per ogni sub-processor

6. **Periodo di conservazione**
   - Dati form contatto/preventivo: 12 mesi dalla richiesta
   - Dati di navigazione: durata della sessione
   - Cookie: secondo tabella nella cookie policy

7. **Diritti dell'interessato**
   - Accesso (art. 15)
   - Rettifica (art. 16)
   - Cancellazione (art. 17)
   - Limitazione (art. 18)
   - Portabilita (art. 20)
   - Opposizione (art. 21)
   - Reclamo all'Autorita Garante: Piazza di Monte Citorio 121, 00186 Roma — www.garanteprivacy.it

8. **Conferimento dei dati**
   - Facoltativo. Il mancato conferimento dei dati nei form impedira di dar seguito alla richiesta.

9. **Aggiornamento:** Marzo 2026

### 5.11 Cookie Policy (`/cookie-policy`)

Conforme Linee Guida Garante Privacy 10 giugno 2021 (provvedimento n. 231).

**Struttura:**

1. **Cosa sono i cookie** — spiegazione accessibile

2. **Cookie utilizzati da questo sito**

   | Nome | Tipo | Finalita | Durata | Prima/Terza parte |
   |------|------|----------|--------|-------------------|
   | `cookie-consent` | Tecnico | Memorizza le preferenze cookie dell'utente | 180 giorni | Prima parte |
   | (eventuali cookie sessione Next.js) | Tecnico | Funzionamento del sito | Sessione | Prima parte |
   | (Friendly Captcha, se presente) | Tecnico/funzionale | Anti-spam sui form | Sessione | Terza parte (EU) |

3. **Come gestire i cookie dal browser** — link alle guide ufficiali:
   - Google Chrome
   - Mozilla Firefox
   - Apple Safari
   - Microsoft Edge

4. **Come revocare il consenso** — "E possibile modificare le preferenze in qualsiasi momento cliccando su 'Gestisci cookie' nel footer del sito"

---

## 6. Componenti layout

### 6.1 Header (`components/layout/Header.tsx`)

- Logo AMCO a sinistra (link a `/`)
- Navigazione desktop a destra:
  - Chi siamo
  - Servizi
  - Accesso Condomini
  - Modulistica
  - Contatti
  - Emergenze (badge rosso o icona per evidenziarlo)
  - Bottone CTA: "Preventivo" (stile primario)
- Mobile: hamburger menu con slide-in da destra (`MobileMenu.tsx`)
- Sticky on scroll con sfondo blur/bianco
- Altezza: ~64-72px

### 6.2 Footer (`components/layout/Footer.tsx`)

Layout a colonne (3-4 colonne desktop, stacked mobile):

**Colonna 1 — Azienda:**
- Logo AMCO
- Breve tagline (1 frase)

**Colonna 2 — Link rapidi:**
- Chi siamo
- Servizi
- Accesso Condomini
- Modulistica
- Contatti
- Lavora con noi

**Colonna 3 — Contatti:**
- Indirizzo
- Telefono
- Email
- Numero verde emergenze

**Colonna 4 — Legale:**
- Informativa Privacy
- Cookie Policy
- Gestisci cookie (apre il pannello preferenze cookie)

**Barra inferiore (copyright):**
- `(c) 2026 AMCO Service SRL — P.IVA 04154310231 — REA VR-396836`
- `Professione esercitata ai sensi della legge 14 gennaio 2013, n.4`

### 6.3 Cookie Banner (`components/layout/CookieBanner.tsx`)

Conforme Linee Guida Garante 10/06/2021. Specifiche dettagliate:

**Prima apertura del sito (nessun consenso salvato):**

Banner in overlay fisso in basso, sfondo bianco con ombra, z-index elevato.

Contenuto:
- Testo: "Questo sito utilizza cookie tecnici necessari al funzionamento." (Se ci sono cookie non tecnici: aggiungere "Utilizziamo inoltre cookie di [tipo] per [finalita].")
- Pulsante "Accetta" — verde (`amco-green`), prominente
- Pulsante "Rifiuta" — STESSA dimensione e STESSA visibilita del pulsante Accetta (OBBLIGATORIO per linee guida Garante)
- Link "Gestisci preferenze" — apre pannello dettagliato
- Link "Cookie Policy" — link a `/cookie-policy`
- Icona X per chiudere = equivale a "Rifiuta" (cookie non tecnici bloccati)

**Pannello "Gestisci preferenze":**
- Toggle per categoria:
  - Cookie tecnici: sempre attivo, toggle disabilitato (non disattivabile), con spiegazione
  - Cookie di terze parti: toggle attivo/disattivo, con spiegazione
- Pulsante "Salva preferenze"

**Comportamento tecnico:**
- Consenso salvato in `localStorage` con chiave `cookie-consent` e timestamp
- Durata: 180 giorni (6 mesi). Dopo scadenza il banner riappare
- Cookie non tecnici: bloccati fino a consenso esplicito (blocco preventivo)
- Logica in `lib/cookies.ts`:
  - `getCookieConsent()`: legge stato consenso
  - `setCookieConsent(preferences)`: salva con timestamp
  - `hasConsentExpired()`: verifica scadenza 180 giorni
  - `resetCookieConsent()`: resetta (usato da "Gestisci cookie" nel footer)
- Link "Gestisci cookie" nel footer riapre il pannello preferenze

---

## 7. Architettura tecnica

### 7.1 Stack

| Tecnologia | Versione | Scopo |
|------------|---------|-------|
| Next.js | 14 (App Router) | Framework |
| TypeScript | 5.x | Linguaggio |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | Design system base |
| React Hook Form | 7.x | Gestione form |
| Zod | 3.x | Validazione |
| Friendly Captcha | latest | Anti-spam (EU-based) |
| Resend o Brevo | latest | Invio email form |

### 7.2 Struttura file

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Header, Footer, CookieBanner, font, metadata)
│   ├── page.tsx                      # Homepage
│   ├── chi-siamo/
│   │   └── page.tsx
│   ├── servizi/
│   │   └── page.tsx
│   ├── accesso-condomini/
│   │   └── page.tsx
│   ├── modulistica/
│   │   └── page.tsx
│   ├── contatti/
│   │   └── page.tsx
│   ├── preventivo/
│   │   └── page.tsx
│   ├── lavora-con-noi/
│   │   └── page.tsx
│   ├── emergenze/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── cookie-policy/
│   │   └── page.tsx
│   ├── sitemap.ts                    # Sitemap generata
│   ├── robots.ts                     # robots.txt generato
│   └── api/
│       ├── contact/
│       │   └── route.ts              # POST — riceve form contatto, invia email
│       └── preventivo/
│           └── route.ts              # POST — riceve form preventivo, invia email
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── CookieBanner.tsx
│   ├── ui/                           # shadcn/ui customizzato con colori AMCO
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── label.tsx
│   │   └── radio-group.tsx
│   ├── sections/
│   │   ├── Hero.tsx                  # Hero homepage
│   │   ├── ServicesGrid.tsx          # Griglia servizi (homepage + pagina servizi)
│   │   ├── Testimonials.tsx          # Recensioni clienti
│   │   ├── FAQ.tsx                   # Accordion FAQ
│   │   ├── CTABanner.tsx             # Banner call-to-action
│   │   └── ContactInfo.tsx           # Info contatto riutilizzabile
│   └── forms/
│       ├── ContactForm.tsx           # Form contatto
│       └── PreventivForm.tsx         # Form preventivo
├── lib/
│   ├── constants.ts                  # TUTTI i dati aziendali, testi, configurazione
│   ├── validations.ts               # Schemi Zod per tutti i form
│   ├── cookies.ts                    # Logica gestione consenso cookie
│   └── email.ts                      # Helper invio email (Resend/Brevo o placeholder)
├── styles/
│   └── globals.css                   # @tailwind + custom CSS minimale
└── public/
    ├── images/
    │   ├── logo.svg                  # Logo AMCO
    │   ├── hero-verona.webp          # Foto hero
    │   └── ...                       # Altre foto Verona
    ├── documents/
    │   └── modulo-anagrafica-condominiale.pdf
    └── favicon.ico
```

### 7.3 Centralizzazione testi (`lib/constants.ts`)

TUTTE le stringhe visibili all'utente DEVONO essere centralizzate in `lib/constants.ts`. Nessuna stringa hardcoded nei componenti.

Struttura suggerita:

```ts
export const COMPANY = {
  name: 'AMCO Service SRL',
  address: 'Via Francesco Morosini 7, 37138 Verona (VR)',
  vatId: '04154310231',
  rea: 'VR-396836',
  phone1: '045 560066',
  phone2: '045 8186033',
  emergency: '800 694 988',
  email: 'info@amcovr.it',
  pec: 'amcoservicesasvr@pec.it',
  website: 'www.amcovr.it',
  legalRef: 'Professione esercitata ai sensi della legge 14 gennaio 2013, n.4',
  portalUrl: 'https://www.miocondominio.eu',
} as const

export const TESTIMONIALS = [ ... ] as const
export const FAQ_ITEMS = [ ... ] as const
export const SERVICES = { administration: [...], dataProcessing: [...] } as const
export const NAV_ITEMS = [ ... ] as const
// etc.
```

### 7.4 Validazione form (`lib/validations.ts`)

Schemi Zod per entrambi i form. Messaggi di errore in italiano.

```ts
// Esempio struttura (non codice finale)
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  subject: z.string().min(2, 'L\'oggetto deve contenere almeno 2 caratteri'),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Devi accettare l\'informativa privacy' }) }),
  honeypot: z.string().max(0), // campo nascosto anti-bot
})

export const preventivoFormSchema = z.object({
  // ... tutti i campi dalla sezione 5.7
})
```

### 7.5 API Routes

**`app/api/contact/route.ts`:**
- Riceve POST con dati form contatto
- Valida server-side con Zod (stessa validazione del client)
- Controlla honeypot (se compilato = bot, rispondere 200 ma non inviare)
- Rate limiting base: max 5 richieste per IP per ora (implementazione semplice con Map in memoria, o header-based)
- Invia email a `info@amcovr.it` tramite Resend/Brevo
- Se servizio email non configurato: `console.log` dei dati (placeholder)
- Risponde 200 con messaggio di conferma o 429/400 con errore

**`app/api/preventivo/route.ts`:**
- Stessa logica del form contatto
- Email formattata con tutti i dati dello stabile
- Subject email: "Richiesta preventivo da [Nome Cognome] - [Indirizzo stabile]"

### 7.6 Font self-hosted

```ts
// app/layout.tsx
import { Inter } from 'next/font/google'
// next/font/google fa self-hosting automatico (scarica e serve dal proprio dominio)
// NON aggiunge link a fonts.googleapis.com

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

Nota: `next/font/google` e `next/font/local` fanno entrambi self-hosting. Il font viene scaricato a build time e servito dal dominio del sito. Non c'e trasferimento dati a Google a runtime.

---

## 8. SEO e Performance

### 8.1 Meta tag

Ogni pagina deve avere metadata Next.js (`export const metadata`) con:
- `title`: "[Nome pagina] | AMCO Service SRL"
- `description`: descrizione unica per pagina (max 160 caratteri)
- `openGraph`: title, description, url, siteName, locale ('it_IT'), type, images
- `twitter`: card summary_large_image (se applicabile)

### 8.2 Sitemap e robots

- `app/sitemap.ts`: genera `/sitemap.xml` con tutte le pagine e data ultimo aggiornamento
- `app/robots.ts`: genera `/robots.txt` che permette il crawling di tutte le pagine e punta alla sitemap

### 8.3 Schema.org

Nel layout principale, aggiungere JSON-LD `LocalBusiness`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AMCO Service SRL",
  "description": "Studio di amministrazione condominiale a Verona",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Francesco Morosini 7",
    "addressLocality": "Verona",
    "postalCode": "37138",
    "addressRegion": "VR",
    "addressCountry": "IT"
  },
  "telephone": "+39045560066",
  "email": "info@amcovr.it",
  "url": "https://www.amcovr.it",
  "vatID": "IT04154310231"
}
```

### 8.4 Performance

- Tutte le pagine staticamente generate (SSG) — nessuna pagina richiede dati dinamici a runtime
- Immagini: `next/image` con `priority` sull'hero, lazy loading per il resto, formato WebP
- Target Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

---

## 9. Responsive Design

- Approccio mobile-first
- Breakpoints Tailwind standard: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Header: menu completo su `lg+`, hamburger su `< lg`
- Griglie servizi: 1 colonna mobile, 2 colonne tablet, 3 colonne desktop
- Form: full-width su mobile, max-width ~640px su desktop centrato
- Hero: aspect ratio piu alto su mobile (~4:3) per visibilita contenuto
- Footer: colonne stacked su mobile, affiancate su desktop
- Testare: iPhone SE (375px), iPhone 14 (390px), iPad (768px), desktop (1280px+)

---

## 10. Requisiti di qualita

| Requisito | Specifica |
|-----------|-----------|
| TypeScript | Zero warning, strict mode |
| Accenti italiani | OGNI stringa visibile: a/e/i/o/u con accento dove necessario |
| Contenuto | ZERO placeholder "Lorem ipsum" — tutto contenuto reale |
| Stringhe | Centralizzate in `lib/constants.ts` |
| Componenti | Piccoli, single-responsibility, riutilizzabili |
| Naming | Coerente: PascalCase componenti, camelCase funzioni, kebab-case file pagine |
| Commenti | Solo dove la logica non e auto-esplicativa |
| GDPR | Zero servizi extra-UE senza consenso. Font self-hosted. No Google Analytics/Maps embed |
| Accessibilita | Tag semantici (main, nav, section, article), alt text su immagini, aria-label in italiano, focus visible, contrasto colori sufficiente |

---

## 11. Piano operativo suggerito

Ogni fase lascia il sito funzionante. Deploy incrementale possibile.

### Fase 1 — Setup e Design System
1. `npx create-next-app@14` con TypeScript, Tailwind, App Router
2. Installare e configurare shadcn/ui
3. Configurare `tailwind.config.ts` con colori AMCO e font
4. Self-host font Inter via `next/font`
5. Scaricare e ottimizzare logo AMCO (SVG o PNG trasparente)
6. Creare `lib/constants.ts` con tutti i dati aziendali
7. Creare layout root (`Header`, `Footer`, metadata base)
8. Creare `MobileMenu.tsx`

**Verifica fase 1:** sito si avvia, header e footer visibili, navigazione funzionante, colori corretti, font caricato, responsive.

### Fase 2 — Pagine contenuto
9. Homepage: Hero, sezione chi siamo breve, griglia servizi, testimonial, FAQ, CTA
10. Chi siamo: contenuto narrativo + pilastri + sezione futuro
11. Servizi: due sezioni con griglie card
12. Accesso Condomini: info + bottone link esterno
13. Modulistica: card download PDF
14. Emergenze: numero verde prominente

**Verifica fase 2:** tutte le pagine contenuto navigabili, contenuto reale (no placeholder), responsive su mobile.

### Fase 3 — Form e interattivita
15. `lib/validations.ts` con schemi Zod
16. `ContactForm.tsx` con React Hook Form + validazione
17. `PreventivForm.tsx` con tutti i campi
18. API route `contact/route.ts`
19. API route `preventivo/route.ts`
20. Anti-spam: honeypot su entrambi i form
21. Pagina Lavora con noi
22. Feedback utente post-invio (messaggio di conferma)

**Verifica fase 3:** form si compilano, validazione funzionante con messaggi in italiano, invio funzionante (almeno console.log), honeypot blocca bot.

### Fase 4 — Privacy e compliance
23. `CookieBanner.tsx` conforme linee guida Garante
24. `lib/cookies.ts` con logica consenso/scadenza
25. Pagina `/privacy` con informativa completa
26. Pagina `/cookie-policy` con tabella cookie
27. Link "Gestisci cookie" nel footer funzionante
28. Checkbox privacy su tutti i form con link a informativa

**Verifica fase 4:** banner appare al primo accesso, "Rifiuta" e "Accetta" stessa evidenza, pannello preferenze funzionante, consenso persiste, scade dopo 180 giorni, pagine legali complete e accurate.

### Fase 5 — Polish e deploy
29. SEO: metadata per ogni pagina, Open Graph, JSON-LD LocalBusiness
30. `sitemap.ts` e `robots.ts`
31. Ottimizzazione immagini (WebP, dimensioni corrette, priority su hero)
32. Friendly Captcha (o conferma honeypot come sufficiente per ora)
33. Configurazione servizio email (Resend/Brevo) o documentare come farlo
34. Test responsive completo (mobile, tablet, desktop)
35. Test accessibilita base (navigazione tastiera, screen reader, contrasto)
36. Deploy su Vercel
37. Verifica finale: tutti i link funzionano, form inviano, banner cookie conforme, pagine legali presenti e linkate

**Verifica fase 5:** Lighthouse score > 90 su tutte le metriche, nessun link rotto, GDPR compliance verificata.

---

## 12. Checklist finale pre-lancio

- [ ] Tutte le 11 pagine presenti e con contenuto reale
- [ ] Header e footer con tutti i dati richiesti
- [ ] Form contatto funzionante con validazione e invio email
- [ ] Form preventivo funzionante con tutti i campi e invio email
- [ ] Cookie banner conforme (Accetta/Rifiuta stessa evidenza, blocco preventivo)
- [ ] Pagina privacy completa con tutte le sezioni obbligatorie
- [ ] Pagina cookie policy con tabella cookie
- [ ] Link "Gestisci cookie" nel footer funzionante
- [ ] Checkbox privacy su tutti i form
- [ ] Footer con P.IVA, REA, L. 4/2013, link privacy, link cookie policy
- [ ] Font self-hosted (nessun caricamento da CDN esterni)
- [ ] Nessun servizio Google embeddato senza consenso
- [ ] Logo AMCO presente e nitido
- [ ] Foto Verona reali, alta qualita, non generiche
- [ ] Responsive: testato su mobile (375px), tablet (768px), desktop (1280px)
- [ ] Accenti italiani corretti in ogni stringa visibile
- [ ] Metadata SEO su ogni pagina
- [ ] Sitemap.xml e robots.txt presenti
- [ ] Schema.org LocalBusiness nel layout
- [ ] Lighthouse Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90
- [ ] Nessun warning TypeScript
- [ ] Nessun "Lorem ipsum" o placeholder visibile

---

## 13. Cosa NON fare

- **NON usare Google Fonts CDN** — self-host via next/font
- **NON usare Google Analytics** — se serve analytics, usare alternativa EU (Plausible, Fathom)
- **NON usare Google Maps embed** — usare OpenStreetMap o link esterno
- **NON usare reCAPTCHA** — usare Friendly Captcha (EU) o honeypot
- **NON usare Iubenda/Cookiebot** per il cookie banner — implementazione custom leggera
- **NON inventare servizi o informazioni** non presenti in questo PRD
- **NON lasciare placeholder** — ogni testo deve essere definitivo
- **NON dimenticare gli accenti** — è/é/à/ì/ò/ù in ogni stringa italiana
- **NON usare colori non definiti nel design system** — attenersi alla palette
- **NON creare file monolitici** — componenti piccoli e single-responsibility
