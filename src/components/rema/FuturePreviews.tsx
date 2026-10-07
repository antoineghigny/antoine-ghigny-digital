"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Sprout, BookOpen } from "lucide-react";
import { DreamSource } from "./ProductPreview";
import styles from "./Rema.module.css";

function MonthlyPreview() {
  const t = useTranslations("rema.next");
  const [month, setMonth] = useState<"september" | "august">("september");
  return (
    <article className={styles.monthlyPreview}>
      <div className={styles.prototypeLabel}><span><CalendarDays size={18} aria-hidden="true" />{t("monthlyLabel")}</span><span className={styles.statusTag}>{t("prototype")}</span></div>
      <h3>{t("monthlyTitle")}</h3>
      <div className={styles.segmented} role="group" aria-label={t("monthSelector")}>
        {(["august", "september"] as const).map((key) => <button key={key} type="button" aria-pressed={month === key} onClick={() => setMonth(key)}>{t(key)}</button>)}
      </div>
      <div className={styles.monthlyReading} aria-live="polite" aria-atomic="true">
        <p className={styles.demoCount}>{t(`${month}Count`)}</p>
        <h4>{t(`${month}Lead`)}</h4>
        <p>{t(`${month}Body`)}</p>
        <div className={styles.reflection}><span>{t("question")}</span><p>{t(`${month}Question`)}</p></div>
      </div>
      <p className={styles.sourcesLabel}><BookOpen size={15} aria-hidden="true" />{t("sources")}</p>
      <div key={month}>
        {month === "september" ? ["dream4", "dream3", "dream2", "dream1"].map((dream) => <DreamSource key={dream} dream={dream} />) : ["augustDream1", "augustDream2"].map((dream) => <DreamSource key={dream} dream={dream} namespace="next" />)}
      </div>
    </article>
  );
}

function GoalPreview() {
  const t = useTranslations("rema.next");
  const [goal, setGoal] = useState<"understand" | "create">("understand");
  return (
    <article className={styles.goalPreview}>
      <div className={styles.prototypeLabel}><span><Sprout size={18} aria-hidden="true" />{t("goalLabel")}</span><span className={styles.statusTag}>{t("prototype")}</span></div>
      <h3>{t("goalTitle")}</h3>
      <div className={styles.goalChoices} role="group" aria-label={t("goalSelector")}>
        {(["understand", "create"] as const).map((key) => <button key={key} type="button" aria-pressed={goal === key} onClick={() => setGoal(key)}>{t(key)}</button>)}
      </div>
      <div className={styles.goalReading} aria-live="polite" aria-atomic="true">
        <h4>{t(`${goal}Question`)}</h4>
        <div className={styles.smallAction}><span><Sprout size={16} aria-hidden="true" />{t("action")}</span><p>{t(`${goal}Action`)}</p></div>
      </div>
      <p className={styles.sourcesLabel}>{t("goalSource")}</p>
      <div key={goal}><DreamSource dream={goal === "understand" ? "dream1" : "dream3"} /></div>
    </article>
  );
}

export default function FuturePreviews() {
  const t = useTranslations("rema.next");
  return <><div className={styles.futurePreviews}><MonthlyPreview /><GoalPreview /></div><p className={styles.demoNote}>{t("note")}</p></>;
}
