# BizzIntel — build a business, step by step

A practical, founder-led business-building playbook from **Bahamas AI Solutions**. Instead of an AI advisor or a pile of prompts, learners follow a structured process, record the work, and leave each lesson with a concrete deliverable.

## The method

**Discover → Prove → Plan → Establish → Launch → Improve.** People pick where they are now and which business area they need first; no module is locked.

Core sequence builds on founder-used approaches: defining the problem, root causes, customer segments, jobs-to-be-done, importance/dissatisfaction, market economics, small demand tests and a deliberate TEST / BUILD / PARK / KILL decision. Once worth pursuing, visualize the offer quickly, test a clear landing page, set up domain/email/social accounts, check GBP eligibility where relevant, and use direct outreach or measured Meta ads before expensive expansion.

**Important editorial distinction:** These are founder-requested or previously discussed techniques. The detailed lesson copy and illustrative examples are *draft curriculum*, not invented proof of founder results. Review [editorial guidance](docs/PLAYBOOK_EDITORIAL.md) before marketing a proprietary methodology.

## The product

- **10 guided playbooks, 62 exercises**: Ideation, Airtight Planning, Social Media, Pitch Decks, Google Business Profile, Marketing, Automations, Grants & Opportunities, Websites, Weekly Founder Reviews.
- Each exercise provides a *why*, detailed *how-to steps*, illustrative example, common mistake, deliverable, expected evidence, workspace notes and optional ChatGPT prompt.
- **Business-stage selector**: idea, planning, setup, launch, operating or scaling; plus industry, market and current business goal.
- **Progress**: unique stable step IDs, ability to reopen a lesson, business-specific workbook notes and references. Legacy index-based completion is read for compatibility.
- **Useful outputs**: full Markdown workbook export, business plan/pitch draft export, financial calculations, research notes and action list.
- **No AI API needed**. Copy prompts only if they help you; no chatbot determines your business plan.
- **Browser-only preview**: localStorage saves draft businesses/workbooks on the device if enabled; explicitly not encrypted or safe for secrets. Backup/export and clear controls included.
- **Cloud-ready infrastructure**: optional owner-separated Supabase Auth and database schema with row-level security. A dedicated BizzIntel Supabase project has **not** been provisioned or connected; public launch still requires real security testing.

## Run it

Node.js 22+:

\`\`\`bash
npm run check
npm test
npm run build
npm run dev
\`\`\`

The preview serves at http://127.0.0.1:4173. Cloudflare Pages: build command \`npm run build\`, output \`dist\`, no framework preset.

Cloud accounts can later use \`BIZZINTEL_SUPABASE_URL\` and \`BIZZINTEL_SUPABASE_PUBLISHABLE_KEY\` build variables (public keys only). See [setup](docs/SETUP.md).

## Honest limits

No verified live deployment, authentication, cross-device saving, weekly scheduled reports, automatic grant discovery, or social-account publishing. The latter features are currently educational workflows. The platform has not been visually audited in a production browser. The site remains deliberately \`noindex\` during development.

**Product standard:** teach the exact process, make the work easy to do, show a clear output, and never mistake activity for evidence.
