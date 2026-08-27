import styles from './Home.module.css';
import { useTranslation } from '../../i18n.js';

export default function Home({ lang }) {
  const t = useTranslation(lang).home;

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div className={styles.blob}>
            <img
              src="/profile-photo.jpg"
              alt="Benabdelkrim Aouab"
              className={styles.profileImage}
            />
          </div>
          <span className={`${styles.sticker} ${styles.stickerOne}`}>{t.role}</span>
          <span className={`${styles.sticker} ${styles.stickerTwo}`}>✦</span>
        </div>

        <div className={styles.textCol}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>

          <h1 className={styles.title}>
            {t.firstName} <span className={styles.scriptName}>{t.lastName}</span>
          </h1>
          <p className={styles.roleLine}>{t.role}</p>

          <p className={styles.description}>{t.description}</p>

          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryBtn}>
              <MessageIcon /> {t.primaryCta}
            </a>
            <a href="#projects" className={styles.secondaryBtn}>
              {t.viewWorks} <ArrowIcon />
            </a>
            <a href="/cv.pdf" download className={styles.secondaryBtn}>
              {t.downloadCv || 'Download CV'} <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a7.5 7.5 0 01-11.6 6.3L4 19l1.2-5.4A7.5 7.5 0 1121 11.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
