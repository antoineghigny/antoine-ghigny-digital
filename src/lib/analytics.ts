/**
 * Analytics utility — wraps Vercel Analytics track() with typed, named events.
 *
 * Every function here maps to one measurable business action.
 * Primary conversions: whatsapp_clicked, email_clicked
 * Secondary: hero_cta_clicked, contact_cta_clicked (scroll-to-contact)
 * Engagement: faq_opened, locale_switched
 */
import { track } from "@vercel/analytics";

export const analytics = {
  // ── Primary conversions ─────────────────────────────────────────────────
  whatsappClicked: (location: "footer" | "hero") =>
    track("whatsapp_clicked", { location }),

  emailClicked: (location: "footer" | "hero") =>
    track("email_clicked", { location }),

  // ── Secondary conversions ───────────────────────────────────────────────
  /** Hero primary CTA — anchor scroll to #contact */
  heroCTAClicked: () =>
    track("hero_cta_clicked"),

  /** "Discutons de votre projet" button on sub-pages (FAQ, About, etc.) */
  contactCTAClicked: (location: string) =>
    track("contact_cta_clicked", { location }),

  // ── Engagement ──────────────────────────────────────────────────────────
  faqOpened: (questionKey: string) =>
    track("faq_question_opened", { question: questionKey }),

  localeSwitched: (to: string) =>
    track("locale_switched", { to }),

  easterEggClicked: () =>
    track("easter_egg_clicked"),
};
