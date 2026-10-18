# Release 1 and 2 setup

## GitHub and Cloudflare
- Repo: PearsonLegacyVentures/Bizzintel; static Cloudflare Pages build; Node 22.
- Build: npm run build; output: dist. Project stays noindexed until ready for public registration.
- Preview first: do not announce production before authentication and RLS tests pass.

## Dedicated Supabase (required for actual cloud features)
1. Create a NEW dedicated Supabase project called BizzIntel in the correct organization after reviewing any costs. Do not reuse Tranquilitas Dispatch or Uber Nassau.
2. Run the reviewed migration in supabase/migrations on the new project. Confirm RLS and indexes.
3. Configure Auth site URL and redirect allowlist for your actual preview and production domains. Turn on email verification for public sign-ups and rate limiting.
4. Copy config.example.js to config.js and enter ONLY SUPABASE_URL and the publishable (or legacy anon) key. Because the browser imports config.js, never use a secret key.
5. Deploy Edge Function advisor with JWT verification enabled. Secrets: OPENAI_API_KEY; optional OPENAI_MODEL; ALLOWED_ORIGINS as comma-separated exact https origins. Project SUPABASE_URL/ANON_KEY/SERVICE_ROLE_KEY are server-only.
6. Test create / edit / delete as two separate real users, verify cross-user queries return no other user's records, confirm auth refresh and logout.
7. Test the advisor, usage limit and that wrong-user business IDs are rejected. Review cost monitoring, rate limits and security advisors.
8. Verify Cloudflare mobile/desktop and final domain CORS and Auth redirect settings, then authorize production deployment.

## Important limitations
- Currently owner-only: team invitations and granular collaborator roles remain future work.
- History is persisted as dated research notes, advisor messages and editable artifacts. Full automatic per-field undo/version snapshots are not implemented.
- The advisor uses the business context and saved messages; it does NOT browse current sources. The interface deliberately labels claims as assumptions when not documented.
- Live grant and tender discovery, social media publishing, automatic weekly emails, payments and agent-driven browser workflows are later releases.
- In demo mode, data lives in memory, not cloud. Never use demo mode for sensitive information.
