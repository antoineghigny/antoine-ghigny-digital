---
name: client-site-intake
description: Capture, personalize, analyze, and transform client project requests into a human French post-contact reply, progressive website/app intake, strategic questionnaire, and build-ready handoff brief for Claude/Codex. Use after a client has contacted or hired the user, when drafting a non-generic next-step message, adapting questions to the client's first message, collecting everything needed to build faithfully, or reducing follow-up before implementation.
---

# Client Site Intake

## Outcome

Use this skill to turn a client contact into:

- a personalized client-facing next-step message and questionnaire in French
- an internal strategy read on positioning, offer, audience, blockers, and conversion goals
- a build-ready handoff brief for Claude/Codex/Gemini with copy direction, UX scope, SEO/AI search direction, visual direction, technical constraints, assumptions, and open questions

Default to French unless the user asks for another language. Use a direct, human tone that a non-technical founder can answer quickly. Let the client say "je ne sais pas" without blocking the process.

Treat the site's "Prochain pas / Parlons de ce qui vous rend different / Demande de projet" wording as context for the user's promise, not as copy to paste to the client. The client reply must feel written after reading their first message.

## Workflow

1. Identify the requested mode:
   - Personalized reply: answer a real client contact with a warm, specific next-step message.
   - Draft intake: create the client message, questionnaire, form fields, or email sequence.
   - Analyze answers: extract strategy, requirements, risks, and missing details from client responses.
   - Build handoff: produce a brief that another Claude/Codex agent can use to build without avoidable follow-up.
   - SEO handoff: convert client answers into metadata, page intent, local/service-area SEO, schema, redirects, and AI search requirements.
   - Automation: propose form fields, CRM/Notion/Sheets columns, status flow, and automatic reply structure.
2. Load `references/intake-framework.md` when creating a comprehensive questionnaire, analyzing real client answers, or producing a build-ready handoff.
3. For client-facing replies, first extract 2-4 concrete details from the client's first message: project, offer, audience, urgency, blocker, words they used, or uncertainty they expressed.
4. Mirror those details in the opening before asking questions.
5. Make the request easy: tell the client they can answer in bullets, rough notes, voice-note transcript, links, or "je ne sais pas encore".
6. Ask follow-up only when a critical fact is impossible to infer. Critical facts are: what is sold, who it is for, desired conversion action, required scope, available content/assets, hard technical constraints, and deadline constraints.
7. If information is missing but not critical, proceed with explicit assumptions and mark items as `A confirmer`.
8. Preserve client language. Separate:
   - `Mots exacts du client`
   - `Interpretation strategique`
   - `Recommandation`
9. For any request that becomes real frontend/UI implementation inside a repo, follow the local project instructions before editing UI files. This skill prepares the intake and handoff; it does not override repository frontend rules.

## Required Outputs

For client-facing intake, produce:

- a personalized opening that proves the first client message was read
- a "ce que j'ai compris" sentence when enough context exists
- an easy instruction for how to answer
- grouped questions, with the smallest required set first
- optional deeper questions for strategy/design/content only if useful
- a short closing line that explains the next step and keeps the tone human

For internal analysis, produce:

- project snapshot
- offer and audience
- difference/positioning hypothesis
- current blockers
- conversion goal
- content/assets inventory
- pages/features needed
- design direction and anti-direction
- technical/operational constraints
- assumptions, risks, and missing details
- recommended next action

For build-ready handoff, produce:

- one concise implementation brief
- page-by-page section plan
- product copy direction based on client words
- UX and conversion notes
- SEO and AI search requirements: page intent, metadata direction, structured data, canonical/sitemap/robots, redirects, local SEO if relevant, internal linking, content gaps, and performance expectations
- visual direction, including what to avoid
- data/content required
- integrations and non-functional constraints
- acceptance criteria
- a final first prompt that can be pasted into Claude/Codex or used before calling Gemini MCP

## Rules

- Keep client-facing questions practical, not consultant jargon.
- Never paste the site's "Prochain pas / Demande de projet" block into a client reply.
- Never paste a template unchanged; use templates only as structure, then rewrite around the client's actual words.
- Never send a generic intake if a real first message is available; adapt the wording and question order to that message.
- Show interest before extracting information: acknowledge what the client is trying to do, what seems important, or what is unclear.
- If the client has already committed to working with the user, frame questions as the next step to move forward together, not as lead qualification.
- Prefer fewer required questions plus optional detail sections over a wall of questions.
- Do not invent proof, metrics, testimonials, pricing, or technical constraints.
- Do not invent SEO claims, rankings, keyword volumes, Google data, or competitor facts. Ask for URLs or use a research tool only when the user explicitly wants research.
- For SEO, translate client language into search intent and page structure; do not stuff generic keywords.
- When the user mentions Gemini MCP, prepare a complete design handoff prompt with business context, client words, page intent, SEO constraints, design direction, assets, and what to avoid. Do not write frontend/UI code yourself.
- When the user asks for "tout", include the full framework from `references/intake-framework.md`.
- When preparing automation, automate collection, formatting, reminders, and brief generation; do not pretend strategic judgment can be fully automated.

## Reference

- `references/intake-framework.md`: master questionnaire, automation fields, analysis method, and build-ready brief schema.
