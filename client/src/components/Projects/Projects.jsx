import styles from "./Projects.module.css";
import { useTranslation } from "../../i18n.js";

// None of these projects have a confirmed, individually-verified repo URL
// on hand, so every card links to the GitHub profile rather than guessing
// at a specific repo path that may not exist.
const GITHUB_PROFILE = "https://github.com/benabdelkrimaouab";
const URLS = [GITHUB_PROFILE, GITHUB_PROFILE, GITHUB_PROFILE, GITHUB_PROFILE];
const ACCENTS = ["accentSage", "accentLavender", "accentSky", "accentBlush"];

export default function Projects({ lang }) {
  const t = useTranslation(lang).projects;

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 className={styles.title}>
            {t.titleStart}{" "}
            <span className={styles.scriptWord}>{t.titleHighlight}</span>
          </h2>
          <p className={styles.description}>{t.description}</p>
        </div>

        <div className={styles.grid}>
          {t.items.map((project, i) => (
            <a
              key={i}
              href={URLS[i] || GITHUB_PROFILE}
              className={`${styles.card} ${styles[ACCENTS[i % ACCENTS.length]]} ${i % 2 === 1 ? styles.cardShift : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.imageWrap} aria-hidden="true">
                <ProjectIcon type={project.icon} />
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.cardTitle}>{project.title}</p>
                <p className={styles.cardSubtitle}>{project.subtitle}</p>
                {project.stack && project.stack.length > 0 && (
                  <div className={styles.stackRow}>
                    {project.stack.map((tech, si) => (
                      <span key={si} className={styles.stackChip}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.demonstrates && (
                  <p className={styles.demonstrates}>{project.demonstrates}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Deliberate, on-brand cover art for each project instead of a photo we
// don't have. Each icon is a simple line-drawing that hints at what the
// project actually is (mobile app, automation workflow, SaaS platform,
// meeting pipeline, document tool).
function ProjectIcon({ type }) {
  const common = {
    width: 72,
    height: 72,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M11 18.5h2" />
          <path d="M9.5 7.5a2.5 2.5 0 015 0c0 1.6-2.5 2.6-2.5 4.2" />
          <circle cx="12" cy="14.3" r="0.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.6" />
          <circle cx="18" cy="6" r="2.6" />
          <circle cx="12" cy="18" r="2.6" />
          <path d="M8.2 7.2l7.6-1.2M7 8.4l4 8M17 8.4l-4 8" />
        </svg>
      );
    case "saas":
      return (
        <svg {...common}>
          <rect x="3.5" y="4" width="17" height="6" rx="1.6" />
          <rect x="3.5" y="12.5" width="17" height="6" rx="1.6" />
          <circle cx="7" cy="7" r="0.5" fill="currentColor" stroke="none" />
          <circle cx="7" cy="15.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "meeting":
      return (
        <svg {...common}>
          <path d="M4 6h13a2 2 0 012 2v6a2 2 0 01-2 2H10l-4 3v-3H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
          <path d="M7 10h8M7 13h5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 2.5h7l4 4V21a1 1 0 01-1 1H7a1 1 0 01-1-1V3.5a1 1 0 011-1z" />
          <path d="M14 2.5V7h4" />
          <path d="M9 12.5h6M9 15.5h6M9 18.5h3.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
        </svg>
      );
  }
}
