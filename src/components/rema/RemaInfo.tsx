import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FAQ_KEYS, REMA_EMAIL } from "@/lib/rema";
import RemaShell from "./RemaShell";
import styles from "./Rema.module.css";

export async function RemaAbout({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.about" });
  return (
    <RemaShell locale={locale} path="/about">
      <div className={`${styles.infoPage} ${styles.container}`}>
        <header className={styles.infoHeading}><h1>{t("title")}</h1><p>{t("intro")}</p></header>
        <div className={styles.aboutGrid}>
          <figure><Image src="/images/antoine.jpg" width={640} height={800} alt={t("portrait")} className={styles.portrait} priority /><figcaption>Antoine Ghigny · Nivelles, {locale === "fr" ? "Belgique" : "Belgium"}</figcaption></figure>
          <div className={styles.prose}>
            <section><h2>{t("whyTitle")}</h2><p>{t("whyBody")}</p></section>
            <section><h2>{t("nowTitle")}</h2><p>{t("nowBody")}</p><p>{t("nextBody")}</p></section>
            <section><h2>{t("companyTitle")}</h2><p>{t("companyBody")}</p></section>
            <div className={styles.infoActions}><a href={`mailto:${REMA_EMAIL}`} className={styles.button}>{t("contact")}</a><Link href={`/${locale}#next`} className={styles.textLink}>{t("preview")}</Link></div>
          </div>
        </div>
      </div>
    </RemaShell>
  );
}

export async function RemaFAQ({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.faq" });
  return (
    <RemaShell locale={locale} path="/faq">
      <div className={`${styles.infoPage} ${styles.container}`}>
        <header className={styles.infoHeading}><h1>{t("title")}</h1><p>{t("intro")}</p></header>
        <div className={styles.faq}>{FAQ_KEYS.map((key) => <details key={key}><summary>{t(`items.${key}.question`)}<span aria-hidden="true">+</span></summary><p>{t(`items.${key}.answer`)}</p></details>)}</div>
        <a href={`mailto:${REMA_EMAIL}`} className={styles.infoContact}>{t("contact")}</a>
      </div>
    </RemaShell>
  );
}

export async function RemaLegal({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.legal" });
  const sections = ["hosting", "property", "status", "access"];
  return (
    <RemaShell locale={locale} path="/legal">
      <div className={`${styles.infoPage} ${styles.container}`}>
        <header className={styles.infoHeading}><h1>{t("title")}</h1><p>{t("intro")}</p><small>{t("updated")}</small></header>
        <div className={`${styles.prose} ${styles.legalProse}`}>
          <section><h2>{t("identityTitle")}</h2><p>{t("identityBody")}</p><address>Antoine Ghigny<br />{t("address")}<br />{t("vat")}<br /><a href={`mailto:${REMA_EMAIL}`}>{REMA_EMAIL}</a></address></section>
          {sections.map((key) => <section key={key}><h2>{t(`${key}Title`)}</h2><p>{t(`${key}Body`)}</p></section>)}
          <section><h2>{t("privacyTitle")}</h2><p>{t("privacyBody")}</p><Link href={`/${locale}/privacy`}>{locale === "fr" ? "Lire la politique de confidentialité" : "Read the privacy policy"}</Link></section>
        </div>
      </div>
    </RemaShell>
  );
}

export async function RemaPrivacy({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.privacy" });
  const sections = ["controller", "email", "demo", "technical", "cookies", "rights"];
  return (
    <RemaShell locale={locale} path="/privacy">
      <div className={`${styles.infoPage} ${styles.container}`}>
        <header className={styles.infoHeading}><h1>{t("title")}</h1><p>{t("intro")}</p><small>{t("updated")}</small></header>
        <div className={`${styles.prose} ${styles.legalProse}`}>
          {sections.map((key) => <section key={key}><h2>{t(`${key}Title`)}</h2><p>{t(`${key}Body`)}</p>{key === "technical" && <div className={styles.privacyLinks}><a href="https://vercel.com/docs/analytics/privacy-policy">{t("analyticsLink")}</a><a href="https://vercel.com/docs/speed-insights/privacy-policy">{t("speedLink")}</a></div>}{key === "rights" && <a href="https://www.autoriteprotectiondonnees.be/citoyen">{t("authorityLink")}</a>}</section>)}
        </div>
      </div>
    </RemaShell>
  );
}
