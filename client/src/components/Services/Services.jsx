import styles from './Services.module.css';
import { useTranslation } from '../../i18n.js';

const ACCENTS = ['accentSage', 'accentLavender', 'accentSky', 'accentBlush'];

export default function Services({ lang }) {
  const t = useTranslation(lang).services;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 className={styles.title}>
            {t.titleStart} <span className={styles.scriptWord}>{t.titleHighlight}</span>
          </h2>
          <p className={styles.description}>{t.description}</p>
        </div>

        <div className={styles.grid}>
          {t.items.map((service, i) => (
            <div key={i} className={`${styles.card} ${styles[ACCENTS[i % ACCENTS.length]]}`}>
              <span className={styles.iconWrap}>
                <ServiceIcon type={service.icon} />
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'agent':
      return (
        <svg {...common}>
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <path d="M12 7V4M9 4h6" />
        </svg>
      );
    case 'workflow':
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="2.4" />
          <circle cx="19" cy="6" r="2.4" />
          <circle cx="12" cy="18" r="2.4" />
          <path d="M7 7l10-1M6 8l5 8M18 8l-5 8" />
        </svg>
      );
    case 'crm':
      return (
        <svg {...common}>
          <path d="M4 20v-2a4 4 0 014-4h2a4 4 0 014 4v2" />
          <circle cx="9" cy="7" r="3" />
          <path d="M16 4a3 3 0 010 6M19 20v-2a3.5 3.5 0 00-2.5-3.4" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M21 11.5a7.5 7.5 0 01-11.6 6.3L4 19l1.2-5.4A7.5 7.5 0 1121 11.5z" />
        </svg>
      );
    case 'integration':
      return (
        <svg {...common}>
          <rect x="3" y="9" width="7" height="7" rx="2" />
          <rect x="14" y="9" width="7" height="7" rx="2" />
          <path d="M10 12.5h4" />
        </svg>
      );
    case 'web':
    default:
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 4v5" />
        </svg>
      );
  }
}
