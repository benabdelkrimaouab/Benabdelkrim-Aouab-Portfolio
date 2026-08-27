# Benabdelkrim Aouab — Portfolio

A recreation of the amin.ambyte-agency.com portfolio, built with:
- **Frontend:** React (Vite) + CSS Modules
- **Backend:** Node.js + Express (handles the contact form via email)

## Project structure

```
portfolio-project/
├── client/          React frontend (Vite)
│   ├── public/       static assets (avatar, profile photo, project images)
│   └── src/
│       ├── components/   Header, Home, Projects, Feedbacks, Contact, Footer, WhatsAppButton
│       ├── App.jsx
│       └── main.jsx
└── server/          Express backend
    ├── routes/contact.js   POST /api/contact — sends an email via nodemailer
    └── index.js
```

## Getting started

### 1. Install dependencies

```bash
# from the project root
npm run install:all
```

Or manually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure the backend

Copy `server/.env.example` to `server/.env` and fill in your SMTP credentials
(Gmail app password, SendGrid, Mailgun, etc.) so the contact form can send
emails:

```bash
cd server
cp .env.example .env
# edit .env with your SMTP_USER / SMTP_PASS / CONTACT_RECEIVER
```

### 3. Run in development

Open two terminals:

```bash
# terminal 1 — backend on http://localhost:5000
cd server
npm run dev

# terminal 2 — frontend on http://localhost:3000
cd client
npm run dev
```

The Vite dev server proxies `/api/*` requests to the Express server (see
`client/vite.config.js`), so the contact form works out of the box in dev.

### 4. Build for production

```bash
cd client
npm run build
```

This outputs static files to `client/dist`. Serve them with any static
host, or add `express.static` in `server/index.js` to serve the built
client from Express directly.

## Customizing

- **Photos:** replace `client/public/avatar-placeholder.jpg`,
  `profile-placeholder.jpg`, and the images in `client/public/projects/`
  with your real photos.
- **CV file:** drop your résumé at `client/public/cv.pdf` — the "Download CV"
  button already links to it.
- **Content:** edit the arrays at the top of `Projects.jsx` and
  `Feedbacks.jsx` to update your project list and experience timeline.
- **Colors/fonts:** design tokens live in `client/src/index.css`
  (`:root` variables) — change `--accent-purple` / `--accent-blue` /
  fonts there to re-theme the whole site.
- **Social links:** update the `SOCIALS` array in `Contact.jsx` and the
  WhatsApp number in `WhatsAppButton.jsx`.
- **Arabic toggle:** the language button in the header currently just
  flips the `dir` attribute; wire it up to real translated copy (e.g. with
  `react-i18next`) if you want full bilingual content.
