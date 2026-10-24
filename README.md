# BizzIntel — practical business guides

**BizzIntel is a free-to-read informational website for people starting and running real businesses.** It is a project of [Bahamas AI Solutions](https://bahamasaisolutions.com/).

**No accounts, no AI advisor, no dashboard.** Readers can immediately use tutorials to validate an idea, plan their money, establish a digital presence, start marketing, prepare pitches, find relevant resources and manage everyday operations.

## What's on the public website

- **Homepage** — clear introduction, paths for three business situations, featured guides and practical starting questions.
- **Start here** (\`/start-here/\`) — choose idea, setup or operating and follow a short recommended reading sequence.
- **Guides** (\`/guides/\`) — searchable/filterable library of ten substantial topic guides.
- **Guide articles** (\`/guides/<topic>/\`) — 62 lessons rendered as semantic, server-readable HTML across 10 articles, including step-by-step instructions, examples, mistakes to avoid, deliverables and optional copyable prompts.
- **Resources** (\`/resources/\`) — links to verified official Bahamas business licensing, NIB, SBDC, Google and relevant platform guidance.
- **About** (\`/about/\`) — clear founder and editorial context, without inflated results or fake testimonials.

Each guide has a contents list, anchorable lesson headings, copyable action checklist, optional prompt copying, next-guide link, working responsive mobile navigation and readable print layout. **JavaScript is an enhancement, not a requirement to read the content.**

## Design and architecture

- Premium dark-grey identity, restrained green accents, clear readable typography and warm editorial page backgrounds.
- Zero runtime UI frameworks, analytics SDKs, AI subscriptions, logins or server dependencies.
- **Static prerendering** by \`scripts/public-build.mjs\` using \`src/playbooks.js\` as the lesson source.
- Static routes served as directory \`index.html\` files, suitable for Cloudflare Pages.
- Programmatic metadata and (when enabled) sitemap.xml + canonical URLs.
- Accessible labels, keyboard-friendly controls, skip-to-content, reduced-motion support, print styles.

## Run locally (Node 22+)

\`\`\`sh
npm run check
npm test
npm run build
npm run dev
\`\`\`

Open \`http://127.0.0.1:4173\` after running \`npm run dev\`.

Cloudflare Pages: **Build command \`npm run build\`**, **output directory \`dist\`**, **no framework preset**.

### Publication / indexing controls

The build defaults to \`noindex,nofollow\` while curriculum and the final public domain are being reviewed. After editorial approval, set both of the following **Cloudflare Pages build variables**:

\`\`\`text
PUBLIC_INDEXING=true
SITE_URL=https://your-real-domain.example
\`\`\`

Replace the example with the actual authorized domain. This enables \`index,follow\`, canonical URLs, robots.txt allowance and a sitemap. The code does not assume a domain.

**Pushing to GitHub is not confirmation of a live Cloudflare deployment.** Check the Pages project, build logs and deployed URL separately.

## Content policy

The founder-selected topics and business-building methods come from conversations with Amar Pearson. Examples on guide pages are expressly illustrative; they are not evidence of actual client results, approvals, earnings or competitive research. Local legal information and programme status must be checked at original official sources. See [editorial rules](docs/PLAYBOOK_EDITORIAL.md).

## Legacy code

The previous app-style prototype and optional Supabase schema still exist in the repository to preserve work history, **but none of the app, authentication UI or Supabase code is included in the public-site build**. The informational site does not use a backend or ask for visitor information.

## Outstanding launch work

- Test the Cloudflare deployment on the actual domain.
- Complete real-browser visual and accessibility review on desktop/mobile.
- Approve final curriculum and any founder-specific instructional claims.
- Decide and configure the public canonical domain and indexing.
- No auto-monitoring of grants, no weekly report delivery and no direct integrations to social platforms are claimed.
