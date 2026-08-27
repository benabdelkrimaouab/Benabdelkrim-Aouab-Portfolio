import { useState } from 'react';
import styles from './Contact.module.css';
import { useTranslation } from '../../i18n.js';

const SOCIALS = [
  { name: 'WhatsApp', href: 'https://wa.me/213667675176', icon: 'whatsapp' },
  { name: 'GitHub', href: 'https://github.com/benabdelkrimaouab', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/aouab-benabdelkrim', icon: 'linkedin' },
];

// `company` is a honeypot field: it's hidden from real visitors via CSS,
// so only bots that auto-fill every input will populate it. The server
// rejects the submission if it comes back non-empty.
const initialForm = { name: '', email: '', phone: '', message: '', company: '' };

export default function Contact({ lang }) {
  const t = useTranslation(lang).contact;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || t.genericError);

      setStatus({ state: 'success', message: t.success });
      setForm(initialForm);
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 className={styles.title}>
            {t.titleStart} <span className={styles.highlight}>{t.titleHighlight}</span>
          </h2>
          <p className={styles.description}>
            {t.description.split('\n').map((line, i) => (
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
              <span className={styles.infoIcon}><MailIcon /></span>
              <div>
                <p className={styles.infoLabel}>{t.emailLabel}</p>
                <p className={styles.infoValue}>benabdelkrimaouab@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}><PhoneIcon /></span>
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
              disabled={status.state === 'loading'}
            >
              {status.state === 'loading' ? t.sending : t.send}
            </button>

            {status.state === 'success' && (
              <p className={styles.successMsg}>{status.message}</p>
            )}
            {status.state === 'error' && (
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  // LinkedIn's mark is a solid glyph (dot + two solid shapes), so it's
  // rendered filled rather than stroked like the single-line icons below.
  if (name === 'linkedin') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.1V21H17v-5.3c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.39-2.05 2.82V21H9z" />
      </svg>
    );
  }
  const paths = {
    whatsapp: 'M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z',
    github: 'M12 2C6.5 2 2 6.5 2 12',
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={paths[name] || paths.github} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
