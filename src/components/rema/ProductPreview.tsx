"use client";

import { useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, Waves, CalendarDays, Search, ChevronDown } from "lucide-react";
import styles from "./Rema.module.css";

const SCREEN_KEYS = ["journal", "threads", "weekly"] as const;
const DREAM_KEYS = ["dream1", "dream2", "dream3", "dream4"] as const;
const SCREEN_ICONS = { journal: BookOpen, threads: Waves, weekly: CalendarDays };
type Screen = typeof SCREEN_KEYS[number];

export function DreamSource({ dream, namespace = "preview" }: { dream: string; namespace?: "preview" | "next" }) {
  const t = useTranslations(`rema.${namespace}`);
  return (
    <details className={styles.dreamSource}>
      <summary><span><small>{t(`${dream}.date`)}</small>{t(`${dream}.title`)}</span><ChevronDown size={15} aria-hidden="true" /></summary>
      <p>{t(`${dream}.summary`)}</p>
    </details>
  );
}

function JournalPreview() {
  const t = useTranslations("rema.preview");
  return (
    <div className={styles.journalPreview}>
      <h2>{t("journal")}</h2>
      <div className={styles.previewSearch}><Search size={15} aria-hidden="true" />{t("search")}</div>
      <p className={styles.previewMonth}>{t("month")}</p>
      {DREAM_KEYS.slice(0, 3).map((dream) => (
        <article key={dream} className={styles.dreamCard}>
          <time>{t(`${dream}.date`)}</time>
          <h3>{t(`${dream}.title`)}</h3>
          <p>{t(`${dream}.summary`)}</p>
          <span>{t(`${dream}.tags`)}</span>
        </article>
      ))}
    </div>
  );
}

function ThreadsPreview() {
  const t = useTranslations("rema.preview");
  return (
    <div className={styles.readingPreview}>
      <Waves size={28} className={styles.accent} aria-hidden="true" />
      <h2>{t("threadTitle")}</h2>
      <p>{t("threadDescription")}</p>
      <div className={styles.threadTimeline}>{["dream4", "dream3", "dream1"].map((dream) => <DreamSource key={dream} dream={dream} />)}</div>
    </div>
  );
}

function WeeklyPreview() {
  const t = useTranslations("rema.preview");
  return (
    <div className={styles.readingPreview}>
      <p className={styles.previewMonth}>{t("weeklyPeriod")}</p>
      <h2>{t("weeklyTitle")}</h2>
      <p className={styles.serifText}>{t("weeklyBody")}</p>
      <div className={styles.reflection}><span>{t("questionLabel")}</span><p>{t("weeklyQuestion")}</p></div>
      <p className={styles.sourcesLabel}>{t("sources")}</p>
      <DreamSource dream="dream2" /><DreamSource dream="dream1" />
    </div>
  );
}

export default function ProductPreview() {
  const t = useTranslations("rema.preview");
  const [screen, setScreen] = useState<Screen>("journal");
  function changeScreenWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = SCREEN_KEYS.indexOf(screen);
    const index = event.key === "Home" ? 0 : event.key === "End" ? SCREEN_KEYS.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + SCREEN_KEYS.length) % SCREEN_KEYS.length;
    const next = SCREEN_KEYS[index];
    setScreen(next);
    document.getElementById(`product-${next}`)?.focus();
  }
  return (
    <div className={styles.phone}>
      <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><span className={styles.phoneIsland} /><span>▰</span></div>
      <div className={styles.phoneContent}>
        <div id="product-panel" role="tabpanel" aria-labelledby={`product-${screen}`} tabIndex={0} className={styles.phonePanel}>
          {screen === "journal" ? <JournalPreview /> : screen === "threads" ? <ThreadsPreview /> : <WeeklyPreview />}
        </div>
        <div className={styles.phoneNav} role="tablist" aria-label={t("label")} onKeyDown={changeScreenWithKeyboard}>
          {SCREEN_KEYS.map((key) => {
            const Icon = SCREEN_ICONS[key];
            return <button key={key} id={`product-${key}`} type="button" role="tab" tabIndex={screen === key ? 0 : -1} aria-selected={screen === key} aria-controls="product-panel" onClick={() => setScreen(key)}><Icon size={20} aria-hidden="true" /><span>{t(key)}</span></button>;
          })}
        </div>
        <p className={styles.phoneNote}>{t("appNote")}</p>
      </div>
    </div>
  );
}
