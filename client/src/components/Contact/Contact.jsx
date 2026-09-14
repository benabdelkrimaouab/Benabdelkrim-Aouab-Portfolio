import { useState } from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "../../i18n.js";

const SOCIALS = [
  { name: "WhatsApp", href: "https://wa.me/213667675176", icon: "whatsapp" },
  {
    name: "GitHub",
    href: "https://github.com/benabdelkrimaouab",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/aouab-benabdelkrim",
    icon: "linkedin",
  },
];

// `company` is a honeypot field: it's hidden from real visitors via CSS,
// so only bots that auto-fill every input will populate it. The server
// rejects the submission if it comes back non-empty.
const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export default function Contact({ lang }) {
  const t = useTranslation(lang).contact;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || t.genericError);

      setStatus({ state: "success", message: t.success });
      setForm(initialForm);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 className={styles.title}>
            {t.titleStart}{" "}
            <span className={styles.highlight}>{t.titleHighlight}</span>
          </h2>
          <p className={styles.description}>
            {t.description.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <MailIcon />
              </span>
              <div>
                <p className={styles.infoLabel}>{t.emailLabel}</p>
                <p className={styles.infoValue}>benabdelkrimaouab@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <PhoneIcon />
              </span>
              <div>
                <p className={styles.infoLabel}>{t.phoneLabel}</p>
                <p className={styles.infoValue}>06-67-67-51-76</p>
              </div>
            </div>

            <div className={styles.socialCard}>
              <p className={styles.infoLabel}>{t.socialLabel}</p>
              <div className={styles.socialRow}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={s.name}
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Honeypot: invisible to real visitors, catches simple bots */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <label className={styles.field}>
              <span className={styles.label}>{t.formName}</span>
              <input
                type="text"
                name="name"
                placeholder={t.formNamePh}
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span className={styles.label}>{t.formEmail}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={t.formEmailPh}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{t.formPhone}</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.formPhonePh}
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>{t.formMessage}</span>
              <textarea
                name="message"
                rows={5}
                placeholder={t.formMessagePh}
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status.state === "loading"}
            >
              {status.state === "loading" ? t.sending : t.send}
            </button>

            {status.state === "success" && (
              <p className={styles.successMsg}>{status.message}</p>
            )}
            {status.state === "error" && (
              <p className={styles.errorMsg}>{status.message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }) {
  // Only the socials actually linked in SOCIALS above get an icon here —
  // unused placeholder icon paths were removed rather than kept as dead code.
  // All three marks are solid/filled glyphs (this renders more crisply at
  // small sizes than a stroked outline would).
  if (name === "linkedin") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.1V21H17v-5.3c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.39-2.05 2.82V21H9z" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.77.37-.26.29-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.95.15.2 2.03 3.1 4.92 4.34.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.12L2 22l5.13-1.35a9.86 9.86 0 004.91 1.31h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06h-.01a8.15 8.15 0 01-4.15-1.14l-.3-.18-3.05.8.81-2.97-.19-.3a8.15 8.15 0 01-1.25-4.36c0-4.52 3.68-8.19 8.15-8.19 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 012.39 5.75c0 4.52-3.68 8.2-8.16 8.2z" />
      </svg>
    );
  }
  // github
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.51-3.5-.7-3.72-1.34-.13-.33-.68-1.34-1.16-1.62-.4-.22-.97-.76-.01-.77.9-.01 1.54.84 1.76 1.19 1.03 1.75 2.67 1.26 3.32.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.29-5.23-5.71 0-1.26.44-2.29 1.16-3.1-.12-.29-.5-1.47.11-3.06 0 0 .95-.31 3.12 1.18a10.6 10.6 0 015.68 0c2.17-1.49 3.12-1.18 3.12-1.18.61 1.59.23 2.77.11 3.06.72.81 1.16 1.83 1.16 3.1 0 4.43-2.69 5.42-5.25 5.71.42.37.78 1.09.78 2.2 0 1.59-.01 2.87-.01 3.26 0 .27.18.6.69.49A10.02 10.02 0 0022 12.2C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}
