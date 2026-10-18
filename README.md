# BizzIntel — a guided business-building platform

BizzIntel is built by **Bahamas AI Solutions** to teach entrepreneurs a repeatable path from business idea to launch, operations and growth.

**This is not an AI advisor.** The user chooses where they are in business and follows practical modules with step-by-step instructions, checklists, optional copyable prompts, saved workbooks and progress tracking. No OpenAI API, agent, chat backend or paid AI subscription is required.

## What's included

Ten modules based on the founder's requested topic areas:

1. Idea & opportunity
2. Airtight planning
3. Facebook, Instagram, LinkedIn & WhatsApp Business setup
4. Pitch decks & presentation preparation
5. Google Business Profile setup & compliance
6. Marketing and customer acquisition
7. Practical automation
8. Grants, tenders & opportunity tracking
9. Websites and digital customer journey
10. Weekly founder reviews

Each module has 4–6 steps with a rationale, action, clear deliverable, notes and optional prompt. Users can open any module at any time. Recommended ordering responds to current stage and goal; it does not lock content. Progress and notes attach to each business.

**Editorial status:** These are structured draft steps drawn from the user-requested categories, not a claim that every tactic exactly represents Amar Pearson's final methodology. The founder must review and approve individual lessons before public launch. See [docs/PLAYBOOK_EDITORIAL.md](docs/PLAYBOOK_EDITORIAL.md).

## Current infrastructure

- Static HTML, CSS and vanilla JS; zero frontend packages
- Responsive private-workspace layout
- Optional Supabase Auth and Postgres persistence with row-level security
- Multi-business support, business profile, editable working documents, evidence notes, budget model, personal roadmap, export
- Demo mode without backend credentials: **session-only and not saved**. Not suitable for sensitive business data
- GitHub Actions checks and static Cloudflare Pages build

## Development

Node 22+.

\`\`\`bash
npm run check
npm test
npm run build
npm run dev
\`\`\`

Preview at http://127.0.0.1:4173.

For cloud saving, create a **dedicated** Supabase project, apply [the initial SQL migration](supabase/migrations/20261018160000_initial_bizzintel.sql), configure Auth, and provide public build variables as shown in [docs/SETUP.md](docs/SETUP.md).

No production backend or deployment has been verified. Manual grant discovery and weekly reporting guides are included; automatic grant monitoring, social posting and recurring emails are **not** implemented.

**Brand promise:** Teach the process, let the founder do the work, and help them track the results.
