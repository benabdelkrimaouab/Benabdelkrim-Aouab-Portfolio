import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useTranslation } from '../../i18n.js';

export default function Header({ lang, setLang }) {
  const t = useTranslation(lang);
  const NAV_LINKS = [
    { label: t.header.nav.home, href: '#home' },
    { label: t.header.nav.services, href: '#services' },
    { label: t.header.nav.projects, href: '#projects' },
    { label: t.header.nav.feedbacks, href: '#feedbacks' },
    { label: t.header.nav.contact, href: '#contact' },
  ];
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header} dir="ltr">
      <div className={styles.inner}>
        <a href="#home" className={styles.brand}>
          <img
            className={styles.avatar}
            src="/avatar-mark.svg"
            alt="Benabdelkrim Aouab"
          />
          <div>
            <p className={styles.name}>Benabdelkrim Aouab</p>
            <p className={styles.role}>{t.header.role}</p>
          </div>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${active === link.href ? styles.navLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.controls}>
          <button
            className={styles.langToggle}
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
          >
            <span className={styles.langAr}>عربي</span>
            <span className={styles.langPill}>{lang.toUpperCase()}</span>
          </button>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
