# BizzIntel method-site setup

Use Node 22+. Run npm run check, npm run build and npm test. For preview run npm run dev and open http://127.0.0.1:4173.

Cloudflare Pages: no framework preset; build command npm run build; output directory dist. Checked-in dist files preserve a fallback deployment when Cloudflare does not run a build. Rebuild and commit dist for every public source change.

Source of truth: src/method.js contains the eight phases and 32 steps. Keep phase/step IDs stable so browser completion keys and old links continue to work. scripts/method-render.mjs displays phase and action pages. scripts/public-build.mjs creates all public HTML routes. site.js supports menu, copied prompts and optional browser-local checkmarks. src/playbooks.js retains ten deeper guides.

Release checks: homepage, /method/, all eight /method/{phase}/ pages, all 32 /method/{phase}/{step}/ pages, /start-here/, /guides/, /resources/, /about/, mobile controls, clipboard buttons, completion marks and previous/next links.

Indexing defaults to noindex during development. When editorial and domain are confirmed, set PUBLIC_INDEXING=true and SITE_URL=https://THE_AUTHORIZED_DOMAIN in the Cloudflare build environment. Verify robots.txt, metadata and sitemap.xml on the final domain, then submit sitemap via an authorized Search Console property.

No AI API or Supabase keys are needed for this informational website. Do not claim actual grants are open, GBP eligibility, market results or compliance without an official source. Founder review of the exact teaching instructions remains required before positioning them as his fully verified proprietary curriculum.
