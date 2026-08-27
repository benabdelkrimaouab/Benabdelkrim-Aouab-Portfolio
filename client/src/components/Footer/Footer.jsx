import styles from './Footer.module.css';
import { useTranslation } from '../../i18n.js';

export default function Footer({ lang }) {
  const t = useTranslation(lang).footer;
  return (
    <footer className={styles.footer}>
      <p>{new Date().getFullYear()} © Benabdelkrim Aouab. {t.rights}</p>
    </footer>
  );
}
