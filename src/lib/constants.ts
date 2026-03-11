/**
 * Costanti centralizzate per il sito AMCO Service
 * Tutte le stringhe visibili all'utente sono definite qui
 */

// ============================================
// DATI AZIENDALI
// ============================================
export const COMPANY = {
  name: "AMCO Service SRL",
  address: "Via Francesco Morosini 7, 37138 Verona (VR)",
  vatId: "04154310231",
  rea: "VR-396836",
  phone1: "045 560066",
  phone2: "045 8186033",
  emergency: "800 694 988",
  email: "info@amcovr.it",
  pec: "amcoservicesasvr@pec.it",
  website: "www.amcovr.it",
  legalRef: "Professione esercitata ai sensi della legge 14 gennaio 2013, n.4",
  portalUrl: "https://www.miocondominio.eu",
  founded: "2002",
  historySince: "1973",
  managedCondos: "130+",
} as const;

// ============================================
// NAVIGAZIONE
// ============================================
export const NAV_ITEMS = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Accesso Condomini", href: "/accesso-condomini" },
  { label: "Modulistica", href: "/modulistica" },
  { label: "Contatti", href: "/contatti" },
] as const;

export const NAV_CTA = {
  label: "Preventivo",
  href: "/preventivo",
} as const;

export const EMERGENCY_NAV = {
  label: "Emergenze",
  href: "/emergenze",
} as const;

// ============================================
// HEADER
// ============================================
export const HEADER = {
  mobileMenuLabel: "Menu",
  closeMenuLabel: "Chiudi menu",
} as const;

// ============================================
// FOOTER
// ============================================
export const FOOTER = {
  tagline: "Amministrazione condominiale a Verona dal 2002",
  columns: {
    company: {
      title: "Azienda",
    },
    links: {
      title: "Link rapidi",
      items: [
        { label: "Chi siamo", href: "/chi-siamo" },
        { label: "Servizi", href: "/servizi" },
        { label: "Accesso Condomini", href: "/accesso-condomini" },
        { label: "Modulistica", href: "/modulistica" },
        { label: "Contatti", href: "/contatti" },
        { label: "Lavora con noi", href: "/lavora-con-noi" },
      ],
    },
    contacts: {
      title: "Contatti",
    },
    legal: {
      title: "Legale",
      items: [
        { label: "Informativa Privacy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Gestisci cookie", href: "#cookie-preferences" },
      ],
    },
  },
  copyright: `© ${new Date().getFullYear()} ${COMPANY.name} — P.IVA ${COMPANY.vatId} — REA ${COMPANY.rea}`,
} as const;

// ============================================
// HOMEPAGE
// ============================================
export const HERO = {
  tagline: "Il tuo partner di fiducia per l'amministrazione condominiale a Verona",
  subtitle: `Oltre ${COMPANY.managedCondos} condomini gestiti con cura e professionalità`,
  cta: {
    primary: {
      label: "Richiedi un preventivo",
      href: "/preventivo",
    },
    secondary: {
      label: "Scopri i nostri servizi",
      href: "/servizi",
    },
  },
} as const;

export const HOME_ABOUT = {
  title: "Chi siamo",
  description:
    "AMCO Service gestisce condomini a Verona dal 2002, con una storia che affonda le radici nel 1973. Professionalità, trasparenza e vicinanza ai clienti sono i nostri valori fondamentali.",
  cta: {
    label: "Scopri la nostra storia",
    href: "/chi-siamo",
  },
} as const;

export const HOME_SERVICES = {
  title: "I nostri servizi",
  subtitle: "Soluzioni complete per la gestione del tuo condominio",
  categories: [
    {
      title: "Amministrazione Condominiale",
      description: "Gestione completa del condominio, dalla contabilità alle assemblee",
      icon: "Building2",
      items: [
        "Gestione contabilità",
        "Convocazione assemblee",
        "Supervisione lavori",
        "Reperibilità multicanale",
      ],
      href: "/servizi#amministrazione",
    },
    {
      title: "Elaborazione Dati",
      description: "Supporto amministrativo completo con strumenti digitali avanzati",
      icon: "Calculator",
      items: [
        "Bilanci e rendiconti",
        "Gestione incassi",
        "Certificazioni fiscali",
        "Fatturazione elettronica",
      ],
      href: "/servizi#elaborazione-dati",
    },
  ],
  cta: {
    label: "Tutti i servizi",
    href: "/servizi",
  },
} as const;

// ============================================
// TESTIMONIALS
// ============================================
export const TESTIMONIALS = [
  {
    name: "Daria",
    text: "Conosco questa realtà da diversi anni e, avendo avuto a che fare con altri studi di amministrazione condominiale, sento di poter dire che AMCO Service si distingue dagli altri sia per l'elevata professionalità, sia per la presenza e disponibilità nei confronti dei condomini. Sempre reattivi e rapidi nel dare riscontro oltre che chiari nel fornire informazioni e spiegazioni. Consigliato!",
  },
  {
    name: "Roberta",
    text: "Persone gentili e disponibili, e un servizio professionale e tempestivo. Consigliati.",
  },
  {
    name: "Chiara",
    text: "Finalmente un amministratore con la A maiuscola. Professionali, competenti ma soprattutto veloci nel risponderti e sempre disponibili. Grazie mille!",
  },
  {
    name: "Cecilia",
    text: "Amministrazione estremamente competente e attenta. Ottima capacità di mediazione e di gestione di situazioni condominiali complesse. La loro reperibilità è ottima: sono sempre reperibili, 24h/24h per qualsiasi emergenza.",
  },
] as const;

export const TESTIMONIALS_SECTION = {
  title: "Cosa dicono di noi",
  subtitle: "Le opinioni dei nostri clienti sono la nostra migliore referenza",
} as const;

// ============================================
// FAQ
// ============================================
export const FAQ_ITEMS = [
  {
    question: "Quando è obbligatorio l'amministratore?",
    answer: "Quando i condomini sono più di otto.",
  },
  {
    question: "A cosa serve il regolamento condominiale?",
    answer:
      "Disciplina l'uso delle cose comuni, la ripartizione delle spese e le norme per la tutela del decoro dell'edificio.",
  },
  {
    question: "Cosa succede in caso di infrazione del regolamento?",
    answer:
      "L'amministratore può irrogare una sanzione pecuniaria fino a 200 euro, elevata a 800 euro in caso di recidiva.",
  },
  {
    question: "Posso gestire autonomamente la mia posizione?",
    answer:
      "Sì, con le credenziali fornite da AMCO Service è possibile accedere al portale area riservata per consultare documenti, scadenze e comunicazioni.",
  },
  {
    question: "Ho dimenticato la password",
    answer: "La pagina di accesso al portale consente il recupero automatico della password.",
  },
] as const;

export const FAQ_SECTION = {
  title: "Domande frequenti",
  subtitle: "Le risposte alle domande più comuni sui condomini",
} as const;

// ============================================
// CTA BANNER
// ============================================
export const CTA_BANNER = {
  title: "Richiedi un preventivo gratuito",
  description:
    "Scopri come AMCO Service può prendersi cura del tuo condominio. Nessun impegno, solo un confronto costruttivo.",
  cta: {
    label: "Richiedi un preventivo",
    href: "/preventivo",
  },
} as const;

// ============================================
// PAGINA CHI SIAMO
// ============================================
export const CHI_SIAMO = {
  hero: {
    title: "La nostra storia",
    subtitle: "Dal 1973 al servizio dei condomini, dal 2002 a Verona",
  },
  story: [
    "Operiamo sul territorio dal 2002 ma la nostra storia è iniziata nel 1973. Inizialmente radicata nel territorio milanese, l'attività di amministrazione immobiliare ha deciso nel tempo di spostarsi a Verona conoscendo qui una nuova realtà che ha abbracciato come una seconda madre.",
    "La scommessa di inizio millennio era diventare un punto di riferimento indipendente per il complesso mondo dell'amministrazione condominiale e oggi gestiamo oltre 130 stabili puntando ad una crescita progressiva e pianificata.",
  ],
  pillars: {
    title: "I nostri pilastri",
    items: [
      {
        title: "Indipendenza",
        description: "Essere indipendenti e affermare il proprio marchio",
        icon: "Shield",
      },
      {
        title: "Qualità",
        description:
          "Creare e alimentare collaborazioni di qualità con personale, collaboratori e fornitori",
        icon: "Star",
      },
      {
        title: "Relazioni",
        description: "Investire costantemente nel rapporto con l'utenza",
        icon: "Users",
      },
      {
        title: "Squadra",
        description:
          "Essere una squadra dentro lo studio, fuori e fra le mura domestiche degli stabili",
        icon: "Heart",
      },
    ],
  },
  future: {
    title: "Il nostro futuro",
    content:
      "Per quanto riguarda noi, la convinzione nella pianificazione ci porta a non vivere l'attesa del domani ma a costruire oggi ciò che vogliamo diventare. Siamo abituati a pianificare e investire costantemente in ricerca, formazione, sviluppo tecnologico e risorse umane valorizzando senza sosta ognuno di questi elementi fondamentali.",
  },
} as const;

// ============================================
// PAGINA SERVIZI
// ============================================
export const SERVIZI = {
  hero: {
    title: "I nostri servizi",
    subtitle: "Soluzioni complete per ogni esigenza del condominio",
  },
  categories: {
    administration: {
      id: "amministrazione",
      title: "Amministrazione Condominiale",
      description: "Gestione completa e professionale del tuo condominio",
      services: [
        {
          title: "Gestione contabilità",
          description: "Amministrazione trasparente e puntuale delle finanze condominiali",
          icon: "Receipt",
        },
        {
          title: "Gestione integrata",
          description: "Software dedicato per un controllo costante e accessibile",
          icon: "MonitorSmartphone",
        },
        {
          title: "Monitoraggio pagamenti",
          description: "Controllo continuo dei flussi finanziari e delle morosità",
          icon: "CreditCard",
        },
        {
          title: "Gestione fornitori",
          description: "Selezione e coordinamento dei migliori fornitori per il condominio",
          icon: "Users",
        },
        {
          title: "Preparazione bilanci",
          description: "Bilanci preventivi e consuntivi chiari e dettagliati",
          icon: "FileBarChart",
        },
        {
          title: "Convocazione assemblee",
          description: "Organizzazione e verbalizzazione delle assemblee condominiali",
          icon: "CalendarDays",
        },
        {
          title: "Supervisione lavori",
          description: "Gestione e controllo dei lavori straordinari",
          icon: "HardHat",
        },
        {
          title: "Conti dedicati",
          description: "Gestione fondi su conti correnti dedicati per massima trasparenza",
          icon: "Landmark",
        },
        {
          title: "Reperibilità multicanale",
          description: "Disponibilità via telefono, email e portale web",
          icon: "Phone",
        },
        {
          title: "Finanziamenti",
          description: "Ricerca opportunità di finanziamento per interventi importanti",
          icon: "PiggyBank",
        },
      ],
    },
    dataProcessing: {
      id: "elaborazione-dati",
      title: "Elaborazione Dati",
      description: "Supporto amministrativo con strumenti digitali all'avanguardia",
      services: [
        {
          title: "Bilanci e rendiconti",
          description: "Bilanci preventivi, rendiconti e stati patrimoniali",
          icon: "FileSpreadsheet",
        },
        {
          title: "Riconciliazione bancaria",
          description: "Verifica e allineamento costante dei conti bancari",
          icon: "ArrowLeftRight",
        },
        {
          title: "Gestione incassi",
          description: "Monitoraggio e registrazione di tutti gli incassi",
          icon: "Wallet",
        },
        {
          title: "Elaborazione F24",
          description: "Preparazione e invio dei modelli F24",
          icon: "FileText",
        },
        {
          title: "Certificazioni fiscali",
          description: "Certificazioni fiscali per condomini e fornitori",
          icon: "FileCheck",
        },
        {
          title: "Pratiche sinistri",
          description: "Gestione completa delle pratiche assicurative",
          icon: "ShieldAlert",
        },
        {
          title: "Fatturazione elettronica",
          description: "Emissione e gestione fatture elettroniche",
          icon: "Send",
        },
        {
          title: "Pagamenti fornitori",
          description: "Gestione puntuale dei pagamenti ai fornitori",
          icon: "Banknote",
        },
        {
          title: "Detrazioni fiscali",
          description: "Supporto per le detrazioni fiscali e bonus edilizi",
          icon: "Percent",
        },
      ],
    },
  },
} as const;

// ============================================
// PAGINA ACCESSO CONDOMINI
// ============================================
export const ACCESSO_CONDOMINI = {
  hero: {
    title: "Accesso Condomini",
    subtitle: "Gestisci il tuo condominio online",
  },
  description:
    "Accedi al portale dedicato per consultare documenti, scadenze e comunicazioni del tuo condominio.",
  credentials: {
    title: "Credenziali di accesso",
    fields: [
      { label: "PID", description: "Codice identificativo del condominio" },
      { label: "Login", description: "Il tuo nome utente personale" },
      { label: "Password", description: "La tua password (case sensitive)" },
    ],
    note: "Le credenziali vengono fornite da AMCO Service al momento dell'incarico.",
  },
  features: {
    title: "Funzionalità del portale",
    items: [
      "Consultazione scadenze",
      "Download documenti",
      "Comunicazioni con l'amministrazione",
      "Informazioni condominiali",
    ],
  },
  compatibility: "Accessibile da smartphone, tablet e PC",
  cta: {
    label: "Accedi al portale",
    href: COMPANY.portalUrl,
  },
} as const;

// ============================================
// PAGINA MODULISTICA
// ============================================
export const MODULISTICA = {
  hero: {
    title: "Modulistica",
    subtitle: "Scarica i moduli per il tuo condominio",
  },
  documents: [
    {
      title: "Modulo Anagrafica Condominiale",
      description: "Registro di anagrafe condominiale ai sensi dell'art. 1130 c.c. — Dichiarazione sostitutiva dell'atto di notorietà per la comunicazione dei dati anagrafici, catastali e di sicurezza dell'unità immobiliare.",
      file: "/documents/modulo-anagrafica-condominiale.pdf",
      formUrl: "https://app.amministratoreprotetto.it/anagrafica-condominiale",
      icon: "FileDown",
    },
  ],
  note: "Altri moduli saranno disponibili a breve.",
} as const;

// ============================================
// PAGINA CONTATTI
// ============================================
export const CONTATTI = {
  hero: {
    title: "Contatti",
    subtitle: "Siamo a tua disposizione",
  },
  info: {
    title: "Informazioni",
    address: COMPANY.address,
    phones: [
      { number: COMPANY.phone1, hours: "lun-gio 9:00-12:30" },
      { number: COMPANY.phone2, hours: "" },
    ],
    emergency: {
      label: "Numero verde emergenze",
      number: COMPANY.emergency,
    },
    email: COMPANY.email,
    notice: "SI RICEVE SOLO SU APPUNTAMENTO",
  },
  map: {
    title: "Dove siamo",
    osmUrl: `https://www.openstreetmap.org/search?query=${encodeURIComponent(COMPANY.address)}`,
    googleUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`,
    linkText: "Apri in Google Maps",
  },
  form: {
    title: "Scrivici",
    fields: {
      name: { label: "Nome", placeholder: "Il tuo nome" },
      email: { label: "Email", placeholder: "La tua email" },
      subject: { label: "Oggetto", placeholder: "Oggetto del messaggio" },
      message: { label: "Messaggio", placeholder: "Scrivi il tuo messaggio..." },
      privacy: "Ho preso visione dell'informativa privacy",
    },
    submit: "Invia messaggio",
    success: "Messaggio inviato con successo. Ti risponderemo al più presto.",
    error: "Si è verificato un errore. Riprova più tardi.",
  },
} as const;

// ============================================
// PAGINA PREVENTIVO
// ============================================
export const PREVENTIVO = {
  hero: {
    title: "Richiedi un preventivo",
    subtitle: "Compila il form per ricevere un preventivo personalizzato",
  },
  sections: {
    requester: {
      title: "Dati richiedente",
      subtitle: "Tutti i campi sono obbligatori",
    },
    building: {
      title: "Dati dello stabile",
      subtitle: "Informazioni sul condominio",
    },
  },
  fields: {
    name: { label: "Nome", placeholder: "Il tuo nome" },
    surname: { label: "Cognome", placeholder: "Il tuo cognome" },
    phone: { label: "Telefono", placeholder: "Es. 345 1234567" },
    email: { label: "Email", placeholder: "La tua email" },
    address: { label: "Indirizzo dello stabile", placeholder: "Via/Piazza e numero civico" },
    city: { label: "Città", placeholder: "Città" },
    province: { label: "Provincia", placeholder: "Provincia" },
    cap: { label: "CAP", placeholder: "CAP" },
    apartments: { label: "Numero appartamenti", placeholder: "Quanti appartamenti?" },
    garages: { label: "Numero garage/posti auto", placeholder: "Opzionale" },
    commercialSpaces: {
      label: "Spazi commerciali",
      placeholder: "Negozi, magazzini, uffici (opzionale)",
    },
    elevator: { label: "Ascensore" },
    concierge: { label: "Portineria" },
    heating: { label: "Riscaldamento" },
    cleaning: { label: "Pulizia scale" },
    notes: {
      label: "Note aggiuntive",
      placeholder: "Eventuali contenziosi in corso o informazioni rilevanti (opzionale)",
    },
    privacy: "Ho preso visione dell'informativa privacy",
  },
  options: {
    yesNo: [
      { value: "yes", label: "Sì" },
      { value: "no", label: "No" },
    ],
    heating: [
      { value: "autonomous", label: "Autonomo" },
      { value: "centralized", label: "Centralizzato" },
      { value: "district", label: "Teleriscaldamento" },
    ],
    cleaning: [
      { value: "contractor", label: "Ditta appaltatrice" },
      { value: "employee", label: "Dipendente" },
      { value: "other", label: "Altro" },
    ],
  },
  note: "La richiesta non è impegnativa. I dati saranno utilizzati esclusivamente per preparare un preventivo personalizzato. Sarete successivamente contattati per un incontro informale e senza impegno.",
  submit: "Invia richiesta",
  success: "Richiesta inviata con successo. Ti contatteremo al più presto.",
  error: "Si è verificato un errore. Riprova più tardi.",
} as const;

// ============================================
// PAGINA LAVORA CON NOI
// ============================================
export const LAVORA_CON_NOI = {
  hero: {
    title: "Lavora con noi",
    subtitle: "Unisciti al nostro team",
  },
  intro:
    "AMCO Service è sempre alla ricerca di talenti motivati che condividano la nostra passione per l'amministrazione condominiale e il servizio al cliente.",
  cta: {
    text: "Invia il tuo CV a",
    email: COMPANY.email,
    subject: "Candidatura spontanea",
  },
} as const;

// ============================================
// PAGINA EMERGENZE
// ============================================
export const EMERGENZE = {
  hero: {
    title: "Emergenze",
    subtitle: "Assistenza immediata per i condomini gestiti",
  },
  description:
    "Per interventi urgenti ed emergenze chiama il nostro numero verde, attivo per tutti i condomini gestiti da AMCO Service.",
  number: COMPANY.emergency,
  cta: {
    label: "Chiama ora",
    href: `tel:${COMPANY.emergency.replace(/\s/g, "")}`,
  },
} as const;

// ============================================
// PAGINA PRIVACY
// ============================================
export const PRIVACY = {
  hero: {
    title: "Informativa Privacy",
    subtitle: "Ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)",
  },
  lastUpdate: "Marzo 2026",
  sections: {
    controller: {
      title: "1. Titolare del trattamento",
      content: [
        `${COMPANY.name}`,
        `${COMPANY.address}`,
        `Email: ${COMPANY.email}`,
        `PEC: ${COMPANY.pec}`,
        `Tel: ${COMPANY.phone1}`,
      ],
    },
    purposes: {
      title: "2. Finalità e base giuridica del trattamento",
      items: [
        {
          purpose: "Navigazione del sito e sicurezza",
          basis: "Legittimo interesse (art. 6.1.f)",
          data: "Dati di navigazione (IP, browser, pagine visitate)",
        },
        {
          purpose: "Risposta a richieste via form contatto/preventivo",
          basis: "Esecuzione misure precontrattuali (art. 6.1.b)",
          data: "Dati inseriti nel form (nome, email, telefono, ecc.)",
        },
        {
          purpose: "Cookie tecnici necessari al funzionamento",
          basis: "Legittimo interesse (art. 6.1.f)",
          data: "Identificativi di sessione",
        },
        {
          purpose: "Cookie non tecnici (se presenti)",
          basis: "Consenso (art. 6.1.a)",
          data: "Dipende dal servizio",
        },
      ],
    },
    categories: {
      title: "3. Categorie di dati personali",
      items: [
        "Dati di navigazione (raccolti automaticamente)",
        "Dati forniti volontariamente tramite form",
      ],
    },
    recipients: {
      title: "4. Destinatari dei dati",
      items: [
        "Hosting provider: Vercel Inc. (per il funzionamento del sito)",
        "Servizio anti-spam: Friendly Captcha (se configurato — provider europeo)",
        "Servizio invio email: Resend/Brevo (per l'invio delle email dei form)",
        "Portale condomini: MioCondominio.eu (per l'accesso all'area riservata)",
      ],
    },
    transfers: {
      title: "5. Trasferimenti extra-UE",
      content:
        "Vercel utilizza server in regione EU configurabili. Friendly Captcha è un provider EU-based senza trasferimento extra-UE. Per ogni sub-processor, vengono adottate le misure appropriate.",
    },
    retention: {
      title: "6. Periodo di conservazione",
      items: [
        "Dati form contatto/preventivo: 12 mesi dalla richiesta",
        "Dati di navigazione: durata della sessione",
        "Cookie: secondo tabella nella cookie policy",
      ],
    },
    rights: {
      title: "7. Diritti dell'interessato",
      items: [
        "Accesso (art. 15)",
        "Rettifica (art. 16)",
        "Cancellazione (art. 17)",
        "Limitazione (art. 18)",
        "Portabilità (art. 20)",
        "Opposizione (art. 21)",
        "Revoca del consenso (art. 7.3)",
      ],
      complaint: {
        label: "Reclamo all'Autorità Garante:",
        address: "Piazza di Monte Citorio 121, 00186 Roma",
        website: "www.garanteprivacy.it",
      },
    },
    provision: {
      title: "8. Conferimento dei dati",
      content:
        "Facoltativo. Il mancato conferimento dei dati nei form impedirà di dar seguito alla richiesta.",
    },
  },
} as const;

// ============================================
// PAGINA COOKIE POLICY
// ============================================
export const COOKIE_POLICY = {
  hero: {
    title: "Cookie Policy",
    subtitle: "Informazioni sui cookie utilizzati da questo sito",
  },
  lastUpdate: "Marzo 2026",
  intro: {
    title: "Cosa sono i cookie",
    content:
      "I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Servono a migliorare l'esperienza di navigazione e a fornire funzionalità personalizzate.",
  },
  cookies: {
    title: "Cookie utilizzati da questo sito",
    items: [
      {
        name: "cookie-consent",
        type: "Tecnico",
        purpose: "Memorizza le preferenze cookie dell'utente",
        duration: "180 giorni",
        party: "Prima parte",
      },
      {
        name: "cookie-sessione",
        type: "Tecnico",
        purpose: "Funzionamento del sito",
        duration: "Sessione",
        party: "Prima parte",
      },
    ],
  },
  manage: {
    title: "Come gestire i cookie dal browser",
    browsers: [
      { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
      { name: "Mozilla Firefox", url: "https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" },
      { name: "Apple Safari", url: "https://support.apple.com/it-it/guide/safari/sfri11471/mac" },
      { name: "Microsoft Edge", url: "https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
    ],
  },
  revoke: {
    title: "Come revocare il consenso",
    content:
      "È possibile modificare le preferenze in qualsiasi momento cliccando su 'Gestisci cookie' nel footer del sito.",
  },
} as const;

// ============================================
// COOKIE BANNER
// ============================================
export const COOKIE_BANNER = {
  title: "Utilizzo dei cookie",
  description:
    "Questo sito utilizza cookie tecnici necessari al funzionamento. Puoi accettarli o rifiutarli.",
  accept: "Accetta",
  reject: "Rifiuta",
  manage: "Gestisci preferenze",
  policy: "Cookie Policy",
  close: "Chiudi",
  panel: {
    title: "Gestisci preferenze cookie",
    categories: [
      {
        id: "technical",
        name: "Cookie tecnici",
        description: "Necessari per il funzionamento del sito. Non possono essere disattivati.",
        required: true,
      },
    ],
    save: "Salva preferenze",
  },
} as const;

// ============================================
// MESSAGGI DI ERRORE
// ============================================
export const ERRORS = {
  required: "Questo campo è obbligatorio",
  email: "Inserisci un indirizzo email valido",
  phone: "Inserisci un numero di telefono valido",
  minLength: (min: number) => `Il campo deve contenere almeno ${min} caratteri`,
  maxLength: (max: number) => `Il campo può contenere al massimo ${max} caratteri`,
  privacy: "Devi accettare l'informativa privacy",
  generic: "Si è verificato un errore. Riprova più tardi.",
} as const;

// ============================================
// META SEO
// ============================================
export const SITE_META = {
  title: "AMCO Service SRL",
  description:
    "Studio di amministrazione condominiale a Verona. Gestiamo oltre 130 condomini con professionalità e cura dal 2002.",
  url: "https://www.amcovr.it",
  locale: "it_IT",
  ogImage: "/images/verona-arena.webp",
} as const;
