# BizzIntel

**From idea to operating business.** An evidence-first business-building workspace by Bahamas AI Solutions, with a Bahamas-first product experience.

Release 1: account sign-up and sign-in, owner-isolated multi-venture workspaces, cross-device persistence, documents, research notes, and export.
Release 2: six business-stage pathways, industry-specific roadmaps, evidence-driven readiness review and a secure real-AI advisor with structured actions and saved conversations.

**Status:** Application source and backend migration are committed. Live auth, cloud saving and AI require a dedicated Supabase project, migration, Edge Function deployment and environment secrets. Demo mode works without credentials but stores only in current browser memory. Do not use demo for sensitive information.

See [docs/SETUP.md](docs/SETUP.md) and [docs/RELEASE_QA.md](docs/RELEASE_QA.md).

## Local preview
Run \`npm run dev\` with Node 22+. Create \`config.js\` from \`config.example.js\` to enable real accounts. No build-time environment values or third-party frontend dependencies.

## Safety
No OpenAI API keys or Supabase service-role keys belong in frontend files. Each database table enforces owner isolation with RLS, and the advisor verifies identity and ownership server-side. This app does not automatically submit forms to authorities or claim unverified grants are open.
