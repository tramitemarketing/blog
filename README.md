# SOGLIA — Blog del sacerdote

Blog personale realizzato con Next.js 15 + Firebase.

## Setup iniziale (una sola volta)

### 1. Crea il progetto Firebase

1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. Clicca **Aggiungi progetto** → dai un nome (es. `soglia-blog`)
3. Nella sidebar: **Firestore Database** → Crea database → Modalità produzione
4. Nella sidebar: **Authentication** → Inizia → Abilita **Email/password** e **Google**
5. Nella sidebar: **Hosting** → Inizia (segui i passaggi, installa Firebase CLI)

### 2. Configura le variabili d'ambiente

```bash
cp .env.local.example .env.local
```

Apri `.env.local` e incolla le credenziali Firebase:

- Vai su **Impostazioni progetto** → **App web** → Registra app
- Copia i valori `apiKey`, `authDomain`, ecc. nei campi corrispondenti

### 3. Copia le regole Firestore

Nel terminale (con Firebase CLI installato):

```bash
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

### 4. Crea il primo account admin

Nella Console Firebase → **Authentication** → **Utenti** → **Aggiungi utente**
Inserisci email e password. Questo sarà il login per il pannello admin.

### 5. Configura Google Analytics (opzionale)

1. Vai su [analytics.google.com](https://analytics.google.com)
2. Crea una proprietà → scegli **Web** → inserisci l'URL del sito
3. Copia il **Measurement ID** (formato: `G-XXXXXXXXXX`)
4. Incollalo in `.env.local` come `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 6. Configura Brevo per la newsletter

1. Crea account su [brevo.com](https://brevo.com) (gratuito, 300 email/giorno)
2. Vai su **Contacts → Forms → Create a form**
3. Copia il codice embed HTML
4. Incollalo in `src/components/home/BrevoWidget.tsx` al posto del placeholder `[Widget Brevo — da configurare]`

### 7. Caricare immagini con ImgBB

1. Vai su [imgbb.com](https://imgbb.com)
2. Clicca **Start uploading** → carica l'immagine
3. Copia il **Direct link** (es. `https://i.ibb.co/abc123/foto.jpg`)
4. Incollalo nel campo "URL immagine" nell'editor articoli del pannello admin

### 8. Alternativa Cloudinary

1. Crea account su [cloudinary.com](https://cloudinary.com) (gratuito)
2. Upload Media → Upload → copia il link della risorsa
3. Usalo come URL immagine nell'editor

### 9. Collega un dominio custom

1. Nella Console Firebase → **Hosting** → **Aggiungi dominio personalizzato**
2. Segui le istruzioni per configurare i record DNS
3. Firebase gestisce automaticamente il certificato SSL

## Sviluppo locale

```bash
npm install
cp .env.local.example .env.local  # compila con le tue credenziali
npm run dev                        # http://localhost:3000
```

## Deploy

```bash
npm run deploy
```

Questo esegue `npm run build` (genera la cartella `out/`) e poi `firebase deploy --only hosting`.

## Uso quotidiano (per il sacerdote)

1. Vai su `https://tuosito.it/admin`
2. Accedi con email+password oppure con Google
3. **Nuovo articolo**: clicca "+ Nuovo", scrivi, clicca "Pubblica"
4. **Citazione del giorno**: vai su Config → modifica il testo → Salva
5. **Commenti**: vai su Commenti → approva o elimina
