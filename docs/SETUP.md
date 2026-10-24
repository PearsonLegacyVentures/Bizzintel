# BizzIntel public informational site — build and launch

1. Run \`npm run check\` then \`npm test\` with Node.js 22+. Run \`npm run build\`; this generates all public routes into \`dist/\`.
2. For local preview run \`npm run dev\` and open http://127.0.0.1:4173.
3. Cloudflare Pages should use **no framework**, build \`npm run build\`, output \`dist\`. Keep current GitHub/Cloudflare workflow; no migration required.
4. Test homepage, /start-here/, /guides/, all 10 /guides/{id}/ pages, /resources/, /about/, mobile menu, search, filtering, anchors, checklist copy and print.
5. Before making the site discoverable, review curriculum and confirm the real production URL. Set \`PUBLIC_INDEXING=true\` and \`SITE_URL=https://<actual-authorized-domain>\` in Cloudflare Pages build settings. Build again, then confirm robots.txt and sitemap.xml on the deployed domain.
6. Submit the sitemap through a verified Search Console property if indexing is wanted. Don't claim indexing has happened simply because a sitemap exists.

Security/privacy: Public website collects no visitor data in this version; no auth, Supabase, OpenAI or server secrets are needed. Default headers include CSP, frame restrictions and no camera/microphone permissions.

**Not implemented:** background grant discovery, auto-email reports, live business account setup, content publishing and private user workbooks. These are not needed for the informational site.

If future tools are added, build them separately without turning the guide homepage into a login wall.
