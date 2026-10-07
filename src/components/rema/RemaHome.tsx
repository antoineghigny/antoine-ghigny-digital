import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Mic, Waves, BookOpen, Mail } from "lucide-react";
import { REMA_EMAIL } from "@/lib/rema";
import RemaShell from "./RemaShell";
import ProductPreview from "./ProductPreview";
import FuturePreviews from "./FuturePreviews";
import styles from "./Rema.module.css";

async function LaunchSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.launch" });
  const email = `mailto:${REMA_EMAIL}?subject=${encodeURIComponent(t("subject"))}&body=${encodeURIComponent(t("emailBody"))}`;
  return (
    <section id="launch" className={`${styles.launch} ${styles.container}`}>
      <Image src="/rema/mark.png" width={88} height={88} alt="" />
      <div><p className={styles.launchStatus}>{t("status")}</p><h2>{t("title")}</h2><p>{t("body")}</p></div>
      <div className={styles.launchAction}><a href={email} className={styles.button}><Mail size={18} aria-hidden="true" />{t("cta")}</a><p>{t("note")}</p></div>
    </section>
  );
}

async function ProductSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.product" });
  const features = [{ key: "capture", Icon: Mic }, { key: "connect", Icon: Waves }, { key: "reflect", Icon: BookOpen }];
  return (
    <section id="journal" className={`${styles.product} ${styles.container}`}>
      <div className={styles.sectionHeading}><h2>{t("title")}</h2><p>{t("intro")}</p></div>
      <div className={styles.productGrid}>
        <figure className={styles.memory}>
          <div className={styles.memoryArt} aria-hidden="true"><span /><span /><span /></div>
          <blockquote>« {t("quote")} »</blockquote><figcaption>{t("quoteSource")}</figcaption>
          <p>{t("saved")}</p>
        </figure>
        <div className={styles.features}>{features.map(({ key, Icon }) => <article key={key}><Icon size={23} className={styles.accent} aria-hidden="true" /><div><h3>{t(`${key}Title`)}</h3><p>{t(`${key}Body`)}</p></div></article>)}</div>
      </div>
      <div className={styles.principle}><h3>{t("principleTitle")}</h3><p>{t("principleBody")}</p></div>
    </section>
  );
}

export default async function RemaHome({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema" });
  return (
    <RemaShell locale={locale}>
      <section className={`${styles.hero} ${styles.container}`}>
        <div className={styles.heroCopy}>
          <p className={styles.availability}><span />{t("hero.status")}</p>
          <h1>{t("hero.title")}</h1>
          <p className={styles.heroDescription}>{t("hero.description")}</p>
          <div className={styles.heroActions}><a href="#launch" className={styles.button}>{t("hero.cta")}</a><a href="#next" className={styles.textLink}>{t("hero.secondary")}</a></div>
          <p className={styles.heroNote}>{t("hero.note")}</p>
        </div>
        <figure className={styles.heroVisual}><ProductPreview /><figcaption>{t("hero.caption")}</figcaption></figure>
      </section>
      <ProductSection locale={locale} />
      <section id="next" className={styles.nextSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}><h2>{t("next.title")}</h2><div><p>{t("next.intro")}</p><p className={styles.plannedNote}>{t("next.status")}</p></div></div>
          <FuturePreviews />
        </div>
      </section>
      <section className={`${styles.maker} ${styles.container}`}>
        <div><span className={styles.wordmark}>Rema</span><p>{t("footer.project")}</p></div>
        <Link href={`/${locale}/about`} className={styles.textLink}>{t("nav.about")}</Link>
      </section>
      <LaunchSection locale={locale} />
    </RemaShell>
  );
}
