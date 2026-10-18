# SWAGv2 guided-workbook QA

## Verified in source-level smoke tests
- 10 course modules, 62 distinct practical exercises.
- Core ideation and planning redesigned to match the founder-discussed progression.
- Every lesson includes multi-step instructions, example, deliverable, mistake, evidence and optional copyable prompt.
- Modules can be accessed without a fixed stage gate.
- Workbook progress keyed by stable lesson ID, with legacy step-key compatibility.
- Business-specific notes, references and next actions are stored with workbook tasks.
- Markdown workbook export includes saved notes, sources and completion.
- All main pages and interactive guide pages render in the JS smoke harness.
- Source syntax tests and core finance test checks pass.

## Still requiring external verification
- Real-browser mobile/desktop screenshot audit, focus behavior and accessibility.
- Cloud authentication and cross-account RLS checks.
- Cloudflare Pages deployment, real domain, redirect rules and backend configuration.
- Actual GitHub Action job completion.
- Curriculum editorial approval, source freshness and real learner usability testing.
- Scheduled grant checks, Meta publishing and automatic report delivery are not implemented.
