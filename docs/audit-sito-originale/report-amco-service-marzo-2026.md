# Verifica Compliance Privacy Sito Web
## AMCO Service SRL — www.amcovr.it

**Data:** 9 marzo 2026
**A cura di:** Midas Touch SRL — Servizio Amministratore Protetto
**Destinatario:** AMCO Service SRL, Via Francesco Morosini 7, 37138 Verona (VR)

---

### Premessa

Il presente documento riporta le osservazioni emerse da una verifica del sito web www.amcovr.it sotto il profilo della normativa privacy vigente (Regolamento UE 2016/679 — GDPR).

Le raccomandazioni sono fornite a titolo collaborativo nell'ambito del rapporto di consulenza privacy in essere per i condomini gestiti dallo studio. Il sito web aziendale resta di esclusiva titolarità e responsabilità di AMCO Service SRL; l'implementazione delle eventuali modifiche è a carico dello studio e del proprio fornitore tecnico.

---

## 1. Quadro generale

Il sito www.amcovr.it è un sito vetrina realizzato in WordPress. Contiene pagine informative sull'attività dello studio, form di contatto e richiesta preventivo con protezione Google reCAPTCHA, accesso all'area condomini (tramite piattaforma esterna miocondominio.eu), e due pagine dedicate alla privacy.

**Elementi positivi già presenti:**
- Informativa privacy e cookie policy linkate nel footer
- Dati aziendali visibili (P.IVA, REA, riferimento L. 4/2013)
- Certificato SSL attivo (connessione HTTPS)
- Nessun tracker di marketing (no Google Analytics, no Facebook Pixel)
- Nessun embed problematico (no YouTube, no widget social)
- Checkbox privacy presente nel form contatti (parziale)

---

## 2. Aspetti da correggere

### 2.1 Cookie banner — Priorità alta

**Situazione:** Il sito non presenta un banner per la raccolta del consenso sui cookie.

**Perché è necessario:** Il sito utilizza Google reCAPTCHA, che installa cookie classificati come non strettamente tecnici. Le Linee Guida del Garante Privacy del 10 giugno 2021 (provvedimento n. 231) richiedono il consenso preventivo dell'utente prima dell'installazione di cookie non tecnici. Questo vale per qualsiasi sito, inclusi i siti vetrina.

**Cosa deve fare il banner:**
- Mostrare pulsante "Accetta" e "Rifiuta" con la stessa evidenza visiva
- Offrire la gestione delle preferenze per categoria
- Bloccare i cookie non tecnici (come quelli di reCAPTCHA) fino al consenso
- Registrare il consenso e non richiederlo prima di 6 mesi

**Come risolvere:** Esistono plugin WordPress dedicati (ad esempio Complianz, Cookiebot, o soluzioni equivalenti) che gestiscono il banner, il blocco preventivo dei cookie e la registrazione del consenso in modo automatico.

*Rif. normativo: Art. 122 D.Lgs. 196/2003; Linee Guida Garante 10/06/2021 (provv. 231); Art. 7 GDPR.*

---

### 2.2 Informativa privacy — Priorità alta

L'informativa attuale (www.amcovr.it/informativa-privacy/) copre diversi aspetti richiesti dal GDPR ma presenta alcune lacune rispetto all'art. 13.

**Elementi da integrare:**

| Elemento | Stato attuale | Cosa serve |
|----------|--------------|------------|
| Titolare del trattamento | Parziale | Aggiungere indirizzo completo nel testo |
| Finalità del trattamento | Presenti | OK |
| Base giuridica | Assente | Indicare per ogni finalità la base giuridica (art. 6 GDPR). Es: form contatto = esecuzione misure precontrattuali; cookie tecnici = legittimo interesse; cookie non tecnici = consenso |
| Destinatari dei dati | Generico | Indicare le categorie: hosting provider, Google (per reCAPTCHA) |
| Trasferimento dati extra-UE | Assente | Da dichiarare: reCAPTCHA trasferisce dati a server Google USA |
| Periodo di conservazione | Vago | "Tempo strettamente necessario" non è sufficiente; servono indicazioni concrete per ogni categoria |
| Diritti dell'interessato | Presenti | OK, correttamente elencati |
| Data di aggiornamento | Assente | Va indicata |

**Nota:** Per uno studio di amministrazione condominiale non sussiste l'obbligo di nominare un DPO (Responsabile della Protezione dei Dati). L'art. 37 GDPR prevede l'obbligo solo per enti pubblici o attività che comportano monitoraggio sistematico su larga scala o trattamento massivo di dati particolari, casi che non si applicano a uno studio di amministrazione.

*Rif. normativo: Art. 13 GDPR; Art. 37 GDPR.*

---

### 2.3 Cookie policy — Priorità media

La cookie policy attuale (www.amcovr.it/utilizzo-cookie/) risale al 30 settembre 2018, quindi è precedente alle Linee Guida del Garante del 2021.

**Cosa manca:**
- Elenco specifico dei cookie installati con nome, finalità, durata e indicazione prima/terza parte
- reCAPTCHA non menzionato tra i servizi di terze parti
- Collegamento con il meccanismo di consenso (banner)

**Soluzione:** La cookie policy può essere generata automaticamente dallo stesso strumento che gestisce il cookie banner (vedi punto 2.1).

*Rif. normativo: Linee Guida Garante 10/06/2021 (provv. 231), sezione "Informativa cookie".*

---

### 2.4 Google reCAPTCHA — Priorità media

I form del sito utilizzano Google reCAPTCHA v3 per la protezione anti-spam. Questo servizio raccoglie dati dell'utente (indirizzo IP, cookie, dati comportamentali) e li trasmette a server Google.

**Situazione normativa:**
- Dal **2 aprile 2026** Google modifica il proprio ruolo per reCAPTCHA: da titolare autonomo diventa responsabile del trattamento. Questo significa che il gestore del sito diventa il titolare dei dati raccolti da reCAPTCHA e dovrà accettare un Data Processing Agreement con Google
- Il trasferimento dati verso server USA va dichiarato nell'informativa con indicazione delle garanzie adottate

**Due possibilità:**
1. **Mantenere reCAPTCHA** → dichiararlo in informativa e cookie policy, bloccarlo fino al consenso nel banner, accettare il DPA Google
2. **Sostituirlo con un'alternativa europea** (es. Friendly Captcha) → nessun cookie aggiuntivo, nessun trasferimento extra-UE, nessun consenso necessario. Per un sito vetrina è la soluzione più lineare

*Rif. normativo: Art. 44-49 GDPR (trasferimenti verso paesi terzi); Provvedimento Garante 9/06/2022 (Google Analytics e trasferimenti USA).*

---

### 2.5 Form di contatto — Priorità bassa

La pagina contatti ha una checkbox privacy, che è una buona prassi. I form di richiesta preventivo dovrebbero avere lo stesso trattamento: un link visibile all'informativa e possibilmente una checkbox di presa visione.

**Precisazione:** La checkbox di consenso per l'informativa non è obbligatoria quando il form serve esclusivamente a rispondere alla richiesta dell'utente (la base giuridica è l'art. 6.1.b GDPR — misure precontrattuali). È tuttavia consigliabile mantenerla come documentazione della presa visione.

*Rif. normativo: Art. 13.1 GDPR.*

---

## 3. Informativa sito vs informativa condomini

Un chiarimento importante: il sito web e la piattaforma Amministratore Protetto hanno **informative diverse** perché riguardano trattamenti diversi.

| | Informativa sito web | Informativa Amministratore Protetto |
|---|---|---|
| **Dove** | www.amcovr.it/informativa-privacy/ | app.amministratoreprotetto.it/informativa |
| **Per chi** | Visitatori del sito, chi compila i form | Condòmini dei condomini gestiti |
| **Cosa copre** | Dati di navigazione, cookie, dati dei form | Trattamenti privacy nella gestione condominiale |
| **Dove usarla** | Sul sito web (footer, form) | Nelle comunicazioni ai condòmini, firma email |

Il link ad Amministratore Protetto che compare nella firma email è corretto in quel contesto (comunicazione con i condòmini). Non va inserito sul sito web al posto dell'informativa del sito.

---

## 4. Riepilogo interventi

| # | Intervento | Priorità |
|---|-----------|----------|
| 1 | Installare cookie banner conforme | Alta |
| 2 | Aggiornare informativa privacy (base giuridica, conservazione, trasferimento extra-UE, data aggiornamento) | Alta |
| 3 | Aggiornare cookie policy con elenco cookie | Media |
| 4 | Gestire correttamente reCAPTCHA o sostituirlo | Media |
| 5 | Uniformare la checkbox privacy su tutti i form | Bassa |

---

## 5. Riferimenti normativi

- **Regolamento UE 2016/679** (GDPR) — artt. 6, 7, 13, 37, 44-49
- **D.Lgs. 196/2003** (Codice Privacy italiano) — art. 122 (cookie e tracciamento)
- **Linee Guida Garante Privacy 10 giugno 2021** (provv. n. 231) — Cookie e altri strumenti di tracciamento
- **Provvedimento Garante 9 giugno 2022** — Utilizzo di Google Analytics e trasferimento dati verso USA

---

*Il presente documento è redatto a titolo informativo e collaborativo nell'ambito del rapporto di consulenza privacy in essere. Non costituisce parere legale vincolante. L'adeguamento del sito web resta nella titolarità e responsabilità di AMCO Service SRL.*

Midas Touch SRL — Servizio Amministratore Protetto
info@midastouch.it
