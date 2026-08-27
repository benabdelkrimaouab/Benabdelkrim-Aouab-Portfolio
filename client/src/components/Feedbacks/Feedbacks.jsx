import styles from './Feedbacks.module.css';
import { useTranslation } from '../../i18n.js';

const ACCENTS = ['accentSage', 'accentLavender', 'accentSky', 'accentBlush'];

export default function Feedbacks({ lang }) {
  const t = useTranslation(lang).feedbacks;

  return (
    <section id="feedbacks" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 className={styles.title}>
            {t.titleStart} <span className={styles.scriptWord}>{t.titleHighlight}</span>
          </h2>
          <p className={styles.description}>{t.description}</p>
        </div>

        <div className={styles.timeline}>
          {t.timeline.map((item, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.markerCol}>
                <span className={`${styles.node} ${styles[ACCENTS[i % ACCENTS.length]]}`} />
                {i < t.timeline.length - 1 && <span className={styles.connector} />}
              </div>
              <div className={`${styles.card} ${styles[ACCENTS[i % ACCENTS.length]]}`}>
                <div className={styles.cardHead}>
                  <span className={styles.badge}>{item.type}</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.place}>{item.place}</p>
                {item.bullets.length > 0 && (
                  <ul className={styles.bullets}>
                    {item.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
