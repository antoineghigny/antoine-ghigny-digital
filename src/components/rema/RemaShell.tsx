import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { REMA_EMAIL } from "@/lib/rema";
import styles from "./Rema.module.css";

function LanguageLinks({ locale, path, label }: { locale: string; path: string; label: string }) {
  return (
    <nav className={styles.languages} aria-label={label}>
      {(["fr", "en"] as const).map((language) => (
        <Link key={language} href={`/${language}${path}`} lang={language} hrefLang={language} aria-current={language === locale ? "true" : undefined} aria-label={`${language.toUpperCase()} — ${language === "fr" ? "Français" : "English"}`}>
          {language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

async function RemaHeader({ locale, path }: { locale: string; path: string }) {
  const t = await getTranslations({ locale, namespace: "rema.nav" });
  const home = `/${locale}`;
  const items = [{ href: `${home}#journal`, label: t("product") }, { href: `${home}#next`, label: t("next") }, { href: `${home}/about`, label: t("about") }, { href: `${home}/faq`, label: t("faq") }];

  return (
    <header className={`${styles.header} ${styles.container}`}>
      <Link href={home} className={styles.brand}>
        <Image src="/rema/mark.png" width={48} height={48} alt="" priority />
        <span><span className={styles.wordmark}>Rema</span><span className={styles.byline}>{t("by")}</span></span>
      </Link>
      <nav className={styles.desktopNav} aria-label={t("menu")}>
        {items.map((item) => <Link key={item.href} href={item.href} aria-current={item.href === `${home}${path}` ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <div className={styles.headerActions}>
        <LanguageLinks locale={locale} path={path} label={t("language")} />
        <Link href={`${home}#launch`} className={styles.headerCta}>{t("launch")}</Link>
      </div>
      <details className={styles.mobileMenu}>
        <summary>{t("menu")}<span aria-hidden="true">+</span></summary>
        <nav aria-label={t("menu")}>
          {items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href={`${home}#launch`}>{t("launch")}</Link>
        </nav>
      </details>
    </header>
  );
}

async function RemaFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.footer" });
  return (
    <footer className={`${styles.footer} ${styles.container}`}>
      <div className={styles.footerTop}>
        <div><span className={styles.wordmark}>Rema</span><p>{t("description")}</p></div>
        <a href={`mailto:${REMA_EMAIL}`}>{REMA_EMAIL}</a>
      </div>
      <p className={styles.footerProject}>{t("project")}</p>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Antoine Ghigny. {t("rights")}<br />{t("vat")}</p>
        <nav aria-label={locale === "fr" ? "Informations légales" : "Legal information"}>
          <Link href={`/${locale}/about`}>{locale === "fr" ? "À propos" : "About"}</Link>
          <Link href={`/${locale}/legal`}>{t("legal")}</Link>
          <Link href={`/${locale}/privacy`}>{t("privacy")}</Link>
        </nav>
      </div>
    </footer>
  );
}

export default async function RemaShell({ locale, path = "", children }: { locale: string; path?: string; children: React.ReactNode }) {
  const t = await getTranslations({ locale, namespace: "rema.nav" });
  return (
    <div className={`${styles.site} rema-site`}>
      <a href="#main" className={styles.skipLink}>{t("skip")}</a>
      <RemaHeader locale={locale} path={path} />
      <main id="main">{children}</main>
      <RemaFooter locale={locale} />
    </div>
  );
}
