# BizzIntel — The founder's practical build sequence

BizzIntel is a public, practical business-building site by Bahamas AI Solutions. It walks a founder through exactly what to do from an idea to customers and expansion. Not a chatbot, CRM, or business-management platform. There is no login.

Live site: https://bizzintel.pages.dev/
The Method: https://bizzintel.pages.dev/method/
First action: https://bizzintel.pages.dev/method/capture/project/

## Eight phases and 32 actions

1. Capture the idea — create a ChatGPT Project, tell the whole business story, set quality rules, set pass/fail gates.
2. Research — successful global businesses, Caribbean operators, local competitors and real demand testing.
3. Visualize — customer journey, first website prototype, usability checks, and a practical visual business plan.
4. Economics — unit margins, cash needs, genuine Bahamas/Caribbean development alignment, verified grants and expansion feasibility.
5. Presence — strategic name, domain/email/SEO, Google Business Profile eligibility and the relevant social and messaging accounts.
6. Website and systems — production build brief, SEO/mobile audit, backend and data security, and a minimal CRM.
7. Customers — Google versus Meta advertising, controlled ad test, regional/local partners, Chamber/SBDC/Toastmasters connections.
8. Improve and grow — measured weekly review, straightforward automation, expansion pilot and updated business source of truth.

Each action is a short, separate HTML page with **When**, **Do this now**, **Copy into ChatGPT**, **Finish with**, **Check**, and **Next action**. Prompts are aids; customer evidence, real economics, and accountable execution decide whether a business is viable.

The ten prior topical guides and 62 supporting lessons remain at /guides/ for deeper reading.

## Code and deployment

- src/method.js — canonical sequence and exercises
- scripts/method-render.mjs — phase and action page HTML
- scripts/public-build.mjs — site generator, homepage and resource navigation
- src/playbooks.js — deeper topic guides
- site.js — optional completion tracking on THIS DEVICE and prompt copying
- styles.css — mobile-first presentation

Node 22+: run npm run check, npm run build, then npm test.
Cloudflare Pages output: dist. The generated dist directory is committed so an automatic deployment still has pages even if no build command runs. Regenerate dist whenever changing course or design sources.

The public pages are static and do not require a backend, ChatGPT integration or API key. Device-local progress does not synchronize; do not enter sensitive data into this educational site.

Indexing is disabled pending publication approval. Set PUBLIC_INDEXING=true and SITE_URL to the approved HTTPS domain at build time before generating live canonical links and sitemap.

Editorial note: curriculum is informed by the founder's stated approach, but illustrative examples are not actual venture results, and any unsupported technique needs founder approval. Check current official rules, sources and funding availability before action.
