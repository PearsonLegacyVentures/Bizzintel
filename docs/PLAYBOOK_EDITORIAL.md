# Founder-led curriculum editorial rules

## Product purpose

BizzIntel must help entrepreneurs follow **Amar Pearson's preferred business-building steps**, not ask a chat agent to tell them what to do. The modules guide the learner through what to prepare, how to work through it, what to finish with, and how to track completion.

## Source of truth

**Founder-confirmed modules** (from the product brief):

- Ideation and airtight planning
- Social business profile creation (Facebook, Instagram, LinkedIn and related accounts)
- Pitch deck tutorials and prompts
- Google Business Profile setup, practical tips and tricks
- Practical business AI automations and tips
- Marketing prompts and practical methods
- Weekly grant and business opportunity reviews
- Let the user choose where they are in business and which part to start with

**Expanded draft modules:** website/customer journey and weekly founder review. These extend the requested experience but need final founder approval.

**Important:** The individual steps, scripts, timings and advice in \`src/playbooks.js\` are editorial starter drafts based on the topics above. They are NOT statements that Amar has personally used or endorsed every tactic. Do not label these tips "proven by Amar", fabricate results or testimonials, or describe them as his exact method before founder review.

## Editing the lessons

Source: \`src/playbooks.js\`

Each module includes:
- \`id\`: stable. Do not casually change IDs because completed tasks use \`pb:<module-id>:<step-index>\`.
- \`title\` / \`subtitle\`
- \`intro\`: practical teaching, not motivational filler
- \`stages\`: used only for prioritizing; NEVER restrict access
- \`steps\`: ordered with \`title\`, \`why\`, \`do\`, \`output\`, and optional \`prompt\`

**Avoid reordering existing lesson steps after public launch**, because completion keys currently reference step indexes. Before shipping a substantially revised curriculum, migrate to stable step IDs.

## Lessons should be hands-on

Each lesson must explain the action, give a concrete example when approved, provide an expected deliverable, and include a realistic tip or common mistake. A prompt is supplementary, not the primary learning experience.

Use real Bahamian/Caribbean workflows, but make country-specific legal, registration, GBP and grant status checks point to official current sources. Never encourage inaccurate Google Business Profiles, fake reviews, invented financials, unverified government requirements, or fake client proof.

## Launch approval checklist

1. Have Amar review module order, exact methods and language.
2. Add founder-supplied screen recordings, walkthroughs, screenshots and real examples where permitted.
3. Validate current third-party platform instructions.
4. Test two new founders from different stages; each should complete a practical task independently.
5. Only after editorial approval call the method "Amar's process" or market founder-specific success evidence.
