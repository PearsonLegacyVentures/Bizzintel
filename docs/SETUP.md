# BizzIntel setup — founder-led curriculum

## 1. Preview without any paid AI
- Clone \`PearsonLegacyVentures/Bizzintel\`.
- Use Node.js 22+; run \`npm run check\`, \`npm test\`, and \`npm run build\`.
- Cloudflare Pages: no framework preset; build command \`npm run build\`; output \`dist\`.
- Build is intentionally \`noindex\` until real launch preparation and editorial review.
- With no credentials the application runs in a **session-only demo mode** (not persisted).

## 2. Optional cloud accounts and workbook saving
- Create a *dedicated* BizzIntel Supabase project under the intended organization after confirming pricing. Never reuse Tranquilitas Dispatch or unrelated customer databases.
- Run \`supabase/migrations/20261018160000_initial_bizzintel.sql\`.
- Confirm RLS and test isolation using two distinct accounts and businesses.
- Configure email verification, Auth site/redirect URLs and password reset for the final Cloudflare domain.
- Locally, copy \`config.example.js\` to \`config.js\` and insert the project URL plus **public publishable key** only.
- For Cloudflare builds use \`BIZZINTEL_SUPABASE_URL\` and \`BIZZINTEL_SUPABASE_PUBLISHABLE_KEY\` environment values.
- Never include an OpenAI key, service-role key or other private credential in the browser.

## 3. Review and maintain the course
- Curriculum source is \`src/playbooks.js\`. Editorial policy: \`docs/PLAYBOOK_EDITORIAL.md\`.
- No AI advisor, model backend or paid AI API is involved in delivering lessons.
- Optional prompts are copied by the learner into their own tool if desired.
- Confirm references and local legal / compliance guidance before public publishing.

## 4. Before public launch
- Verify mobile and desktop routes, forms, clipboard copy, exports, workbook-saving and deletion flows.
- Test Supabase sign-up/sign-in/reset and cross-account data isolation.
- Verify public Pages deployment and URL paths; review access policies and Auth redirect allowlists.
- Test course wording with actual entrepreneurs and validate the founder's final methods.

## Known limits
- No live backend or deployed domain has been verified yet.
- Reports and grant opportunities are guided workflows, **not** scheduled background jobs.
- Social media accounts and Google Business Profiles are not created automatically.
- Learners are owner-only; team permissions require a later version.
