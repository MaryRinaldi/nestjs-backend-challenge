# API per il Monitoraggio di Progetti Ingegneristici

Questa è un'API backend costruita con **NestJS** che fornisce una piattaforma per monitorare e gestire progetti High TECH/ AI. Consente agli utenti (ingegneri, project manager, stakeholder) di registrarsi, gestire i propri profili e tenere traccia di progetti di loro interesse, aggiungendo note personali.

L'API è strutturata per essere sicura, scalabile e ben documentata, con un sistema di autenticazione basato su ruoli per proteggere le operazioni sensibili.

---

## Funzionalità Principali

* **Gestione Utenti**: Registrazione, login e operazioni CRUD complete sul profilo utente.
* **Autenticazione Sicura**: Sistema di login basato su token **JWT** (JSON Web Token).
* **Autorizzazione Basata su Ruoli (RBAC)**: Distinzione tra ruoli `USER` e `ADMIN`, con endpoint protetti accessibili solo a utenti autorizzati.
* **Gestione Progetti**: Elenco, ricerca e visualizzazione dei dettagli dei progetti. La creazione di nuovi progetti è un'operazione riservata agli `ADMIN`.
* **Lista di Monitoraggio Personale (Preferiti)**: Ogni utente può aggiungere e rimuovere progetti dalla propria lista di monitoraggio, allegando note personali.
* **Documentazione API Interattiva**: Endpoint `/api-docs` generato automaticamente con **Swagger (OpenAPI)** per una facile esplorazione e test dell'API.
* **Validazione dei Dati**: Validazione automatica delle richieste in ingresso (DTOs) tramite `class-validator`.

---

## Tecnologie Utilizzate

* **Framework**: [NestJS](https://nestjs.com/)
* **Linguaggio**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/) come ODM
* **Autenticazione**: [Passport.js](http://www.passportjs.org/) (strategie `passport-jwt`)
* **Documentazione**: [Swagger (OpenAPI)](https://swagger.io/)

---

## Prerequisiti

Prima di iniziare, assicurati di avere installato:
* [Node.js](https://nodejs.org/) (versione 16.x o successiva consigliata)
* npm (generalmente incluso con Node.js)
* Un'istanza di **MongoDB** in esecuzione (locale o su un servizio cloud come MongoDB Atlas).

---

## Installazione e Configurazione

1.  **Clona il repository:**
    ```bash
    git clone <URL_DEL_TUO_REPOSITORY>
    cd <NOME_DELLA_CARTELLA>
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Configura le variabili d'ambiente:**
    Crea un file `.env` nella cartella principale del progetto e copia il contenuto di seguito, sostituendo i valori con le tue configurazioni.

    ```env
    # .env.example

    # Porta su cui l'applicazione sarà in ascolto
    PORT=3000

    # Stringa di connessione al tuo database MongoDB
    MONGODB_URI=mongodb://localhost:27017/engineering_tracker

    # Chiave segreta per la firma dei token JWT (usa una stringa lunga e complessa)
    JWT_SECRET=LA_TUA_CHIAVE_SEGRETA_256_Bits

    # Durata di validità del token (es. 60s, 1h, 7d)
    JWT_EXPIRATION=7d
    ```

---

## Esecuzione

* **Modalità Sviluppo (con hot-reload):**
    ```bash
    npm run start:dev
    ```
    L'applicazione sarà disponibile all'indirizzo `http://localhost:3000`.

* **Modalità Produzione:**
    ```bash
    npm run build
    npm run start
    ```

---

## Documentazione e Utilizzo delle API

La documentazione completa e interattiva delle API è generata da Swagger ed è disponibile all'indirizzo:

**`http://localhost:3000/api-docs`**

Da questa interfaccia è possibile visualizzare tutti gli endpoint, i modelli di dati e testare ogni singola operazione.

### Guida Rapida al Primo Utilizzo

Per poter testare appieno l'API, è necessario creare dei progetti, operazione riservata agli admin. Segui questi passaggi:

1.  **Avvia l'applicazione** con `npm run start:dev`.
2.  **Registra un utente**: Usa l'endpoint `POST /users/register` per creare il tuo primo account.
3.  **Promuovi l'utente ad Admin**: Connettiti al tuo database MongoDB, trova la collezione `users` e modifica il documento appena creato, impostando il campo `ruolo` da `"USER"` a `"ADMIN"`.
4.  **Effettua il Login**: Usa l'endpoint `POST /auth/login` con le credenziali del tuo utente (ora admin) per ottenere un `access_token` JWT.
5.  **Autorizzati in Swagger**: Clicca sul pulsante "Authorize" in alto a destra, inserisci il token nel formato `Bearer <IL_TUO_TOKEN>` e autorizzati.
6.  **Crea un Progetto**: Ora, come admin, puoi usare l'endpoint `POST /projects` per inserire uno o più progetti nel sistema.
7.  **Testa le altre funzionalità**: Con dei progetti nel database, puoi ora testare la ricerca, l'aggiunta ai preferiti e tutte le altre funzionalità come utente normale.

---

## Autrice

*Maria Carolina Rinaldi*