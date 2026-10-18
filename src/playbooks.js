/**
 * BizzIntel founder-led playbooks.
 * Founder's sequence: problem → root cause → solution/customer → market → evidence → decision,
 * visualize with simple prototypes, establish a digital presence, test demand before full build.
 * Editorial note: examples are illustrative, not founder performance claims.
 */
export const PLAYBOOKS = [
  {
    "id": "ideation",
    "number": "01",
    "title": "01 / Prove the opportunity",
    "subtitle": "Problem → customer → evidence → smallest real test.",
    "phase": "Plan",
    "stages": [
      "idea",
      "planning"
    ],
    "duration": "Start here if you're exploring",
    "intro": "Start with the problem, not the logo. Follow a disciplined sequence from root cause to demand evidence and a deliberate BUILD / TEST / PARK / KILL decision.",
    "steps": [
      {
        "id": "problem",
        "title": "Describe the actual problem",
        "why": "Strong businesses begin with a specific problem, not a product name.",
        "do": "Write the frustration in one sentence without naming your solution.",
        "how": [
          "Write the frustration in one sentence without naming your solution.",
          "Describe where and when it occurs and what happens if it stays unsolved.",
          "Record one observation or customer quote supporting the problem."
        ],
        "output": "A problem statement and one source of evidence.",
        "example": "Illustrative: 'Short-stay guests cannot always find reliable same-day wellness services.'",
        "avoid": "'Everyone needs this' is not a problem statement.",
        "prompt": "Ask me five questions to sharpen my customer problem statement. Separate evidence from assumptions.",
        "evidence": "A dated observation, interview or customer complaint"
      },
      {
        "id": "root-cause",
        "title": "Find the root cause",
        "why": "Solving the symptom may leave the actual business problem untouched.",
        "do": "Ask 'why' several times; map at least two plausible causes.",
        "how": [
          "Ask 'why' several times; map at least two plausible causes.",
          "Separate controllable causes from structural constraints.",
          "Choose one cause that can realistically be addressed."
        ],
        "output": "A root-cause map.",
        "example": "Illustrative: unreliable delivery could reflect dispatch coordination rather than a lack of service providers.",
        "avoid": "Assuming a new app is always the answer.",
        "prompt": "Help me build a simple five-whys root-cause map for this problem, without claiming we have tested these causes.",
        "evidence": "A causal hypothesis and how it would be checked"
      },
      {
        "id": "alternatives",
        "title": "Study what customers do today",
        "why": "Doing nothing, asking a friend, or using a competitor are all real alternatives.",
        "do": "List at least three existing ways customers solve or avoid the issue.",
        "how": [
          "List at least three existing ways customers solve or avoid the issue.",
          "Capture real competitor pages, options, fees and complaints.",
          "Identify a specific shortcoming worth testing."
        ],
        "output": "A competitor-and-alternatives comparison.",
        "example": "Illustrative: a customer may use a hotel concierge, a WhatsApp contact or a booking website.",
        "avoid": "Claiming there are no competitors.",
        "prompt": "Make a competitor research worksheet with verified source fields, substitutes, differentiation and unknowns.",
        "evidence": "Three genuine alternatives with references"
      },
      {
        "id": "segments",
        "title": "Choose a specific first customer",
        "why": "A narrow starting market makes outreach and testing much more useful.",
        "do": "List potential customer segments by situation or use case.",
        "how": [
          "List potential customer segments by situation or use case.",
          "Compare ability to reach them, frequency of problem and willingness to pay.",
          "Pick one first segment and describe the buyer and decision maker."
        ],
        "output": "One starting customer segment card.",
        "example": "Illustrative: villa managers arranging wellness for guests may be a distinct segment from local residents.",
        "avoid": "Treating tourists, businesses and locals as one identical customer.",
        "prompt": "Build a customer-segment comparison and recommend the questions needed to choose the first one.",
        "evidence": "An interview or inquiry source"
      },
      {
        "id": "jobs",
        "title": "Map the job the customer needs done",
        "why": "A customer hires a solution to achieve an outcome, not to admire features.",
        "do": "Complete: 'When ___, I want ___, so I can ___.'",
        "how": [
          "Complete: 'When ___, I want ___, so I can ___.'",
          "List practical, emotional and time-sensitive needs.",
          "Document what counts as a satisfactory outcome."
        ],
        "output": "A jobs-to-be-done statement.",
        "example": "Illustrative: 'When my group arrives late, I want to organize a service quickly so the trip runs smoothly.'",
        "avoid": "Listing product features instead of customer outcomes.",
        "prompt": "Ask clarifying questions to write a jobs-to-be-done statement with functional, social and emotional outcomes.",
        "evidence": "A customer statement or testable hypothesis"
      },
      {
        "id": "pain",
        "title": "Score importance and dissatisfaction",
        "why": "High frustration only matters if the issue is important enough to change behavior.",
        "do": "Ask prospective customers how important the issue is (1–5).",
        "how": [
          "Ask prospective customers how important the issue is (1–5).",
          "Ask how satisfied they are with existing options (1–5).",
          "Record individual responses rather than manufacturing a market average."
        ],
        "output": "An importance-versus-satisfaction evidence table.",
        "example": "Illustrative: a pain rated 5/5 importance and 2/5 satisfaction is worth investigating, not proof of a business.",
        "avoid": "Confusing personal intuition with customer survey results.",
        "prompt": "Create a small interview script and response table to measure importance, dissatisfaction and willingness to act.",
        "evidence": "Recorded interviews or a genuinely completed survey"
      },
      {
        "id": "benefit",
        "title": "State the simplest compelling benefit",
        "why": "A testable promise beats a long list of future features.",
        "do": "Write the solution as a one-sentence promise.",
        "how": [
          "Write the solution as a one-sentence promise.",
          "Describe what the customer gains, not just the technology involved.",
          "Identify the evidence that would make the promise believable."
        ],
        "output": "A concise value proposition.",
        "example": "Illustrative: 'Book a reliable visit to your location without calling several suppliers.'",
        "avoid": "Promising guarantees or capabilities not yet operational.",
        "prompt": "Turn my verified customer problem into three plain-language value propositions. Mark unproven benefits.",
        "evidence": "A tested outcome or explicit pending-proof note"
      },
      {
        "id": "market",
        "title": "Size the reachable opportunity",
        "why": "A giant industry estimate does not reveal how many buyers you can actually serve.",
        "do": "Define the geography and customer segment you can reach.",
        "how": [
          "Define the geography and customer segment you can reach.",
          "List the data sources for customer counts, booking frequency and average price.",
          "Calculate a conservative scenario with assumptions visible."
        ],
        "output": "A bottom-up market estimate with sources and assumptions.",
        "example": "Illustrative: properties you can realistically service × relevant demand × average transaction value.",
        "avoid": "Using the global tourism market as your local addressable market.",
        "prompt": "Give me a bottom-up market-sizing worksheet with clear inputs, citations to collect and conservative scenarios. Do not invent figures.",
        "evidence": "A source for each critical market input"
      },
      {
        "id": "opportunity-map",
        "title": "Map importance against alternatives",
        "why": "A worthwhile gap must be important and poorly addressed, not simply unpopular.",
        "do": "Write each customer pain as a row in an opportunity table.",
        "how": [
          "Write each customer pain as a row in an opportunity table.",
          "Compare severity, frequency, dissatisfaction, ability to deliver and competition.",
          "Rank the highest-priority gaps and explain what is still unknown."
        ],
        "output": "An opportunity map with a top-ranked test.",
        "example": "Illustrative: fast booking may rank above a complicated loyalty system when urgency is the chief customer pain.",
        "avoid": "Scoring all dimensions 10/10 without evidence.",
        "prompt": "Create an opportunity-scoring matrix from my notes and clearly label unverified scores.",
        "evidence": "An evidence-backed prioritized opportunity"
      },
      {
        "id": "visualize",
        "title": "Visualize before paying for the full build",
        "why": "A mockup or simple offer page lets buyers react before heavy development spending.",
        "do": "Write the customer's first-screen message: problem, offer, trust, next action.",
        "how": [
          "Write the customer's first-screen message: problem, offer, trust, next action.",
          "Create a simple sketch, Lovable prototype or landing-page mockup if useful.",
          "Show it to prospective users and note what confuses them."
        ],
        "output": "A testable one-page concept or clickable preview.",
        "example": "Illustrative: one headline, one clear service, one enquiry button; no invented customer logos.",
        "avoid": "Spending heavily on animations before the offer is validated.",
        "prompt": "Create a one-screen prototype brief for this offer with sections, exact copy needed, one CTA and customer-test questions.",
        "evidence": "A prototype link or screenshot and feedback notes"
      },
      {
        "id": "demand-test",
        "title": "Test interest before a full launch",
        "why": "Views, likes and compliments are weaker signals than genuine enquiries or purchases.",
        "do": "Choose direct outreach, an enquiry landing page or a modest Meta campaign when appropriate.",
        "how": [
          "Choose direct outreach, an enquiry landing page or a modest Meta campaign when appropriate.",
          "Set an explicit budget or time cap, a meaningful conversion event and a decision threshold.",
          "Track spend, visitors, qualified leads, sales and objections without presenting them as equivalent."
        ],
        "output": "A demand-test plan and results sheet.",
        "example": "Illustrative: run a small ad to an honest waitlist or enquiry page and track completed enquiries, not just impressions.",
        "avoid": "Collecting paid commitments for an offer you cannot deliver, or calling clicks validated demand.",
        "prompt": "Design a 7-day demand experiment with a defined audience, ethical ad copy, budget cap, tracked conversion and go/no-go threshold.",
        "evidence": "Real lead, signup, interview or sales records"
      },
      {
        "id": "decision",
        "title": "Make the strategic decision",
        "why": "The point of research is choosing what to do with scarce time and money.",
        "do": "Summarize what was learned, what remains unknown and the first economics.",
        "how": [
          "Summarize what was learned, what remains unknown and the first economics.",
          "Choose TEST, BUILD, PARK or KILL; use SCALE only for an already validated operation.",
          "Record the next milestone, owner, spending limit and the condition that would change the decision."
        ],
        "output": "A one-page decision memo and next milestone.",
        "example": "Illustrative: TEST because customer urgency is real but profitable acquisition is still unproven.",
        "avoid": "Declaring an idea 'validated' because it looks good in a pitch.",
        "prompt": "Draft a decision memo from my actual evidence with choices TEST, BUILD, PARK, KILL or SCALE and one justified next action.",
        "evidence": "A written decision with objective criteria"
      }
    ]
  },
  {
    "id": "planning",
    "number": "02",
    "title": "02 / Build the foundation",
    "subtitle": "Economics → operations → digital setup → measurable launch.",
    "phase": "Plan",
    "stages": [
      "idea",
      "planning",
      "setup"
    ],
    "intro": "Turn the opportunity into a small, deliverable business: pricing, cash flow, real processes, a testable online presence and a 90-day action plan.",
    "steps": [
      {
        "id": "single-offer",
        "title": "Define one offer customers can actually purchase",
        "why": "Broad menus make it hard to communicate value and understand margins.",
        "do": "Write your core service or product in everyday language.",
        "how": [
          "Write your core service or product in everyday language.",
          "Clarify inclusions, exclusions, delivery time, pricing approach and next action.",
          "Design the simplest offer package you can genuinely deliver."
        ],
        "output": "One-page offer sheet.",
        "example": "Illustrative: one clear service tier with an honest starting price and an easy booking route.",
        "avoid": "Bundling ten services before understanding demand.",
        "prompt": "Create a one-page offer sheet with verified features, scope, exclusions, price and a customer-facing CTA.",
        "evidence": "A working offer and delivery commitment"
      },
      {
        "id": "economics",
        "title": "Calculate true unit economics",
        "why": "An attractive price can still lose money on every sale.",
        "do": "List revenue per transaction and genuinely variable expenses.",
        "how": [
          "List revenue per transaction and genuinely variable expenses.",
          "Calculate contribution after variable costs; identify fixed monthly overhead.",
          "Model break-even volume and the capacity required to serve it."
        ],
        "output": "Unit-economics calculator inputs and break-even statement.",
        "example": "Illustrative: price minus therapist commission, materials and transaction fees yields contribution.",
        "avoid": "Treating gross revenue as profit or forgetting payment fees.",
        "prompt": "Create a contribution-margin and break-even worksheet using my supplied numbers and no fabricated inputs.",
        "evidence": "Inputs for price, variable costs and fixed costs"
      },
      {
        "id": "cash",
        "title": "Build a survival budget",
        "why": "Profitable businesses can still fail through cash timing.",
        "do": "Record one-off launch costs, deposits, inventory, platform charges and monthly commitments.",
        "how": [
          "Record one-off launch costs, deposits, inventory, platform charges and monthly commitments.",
          "Forecast actual expected cash collections and payments by week.",
          "Show a downside case and the minimum money required to continue safely."
        ],
        "output": "13-week cash forecast with assumptions.",
        "example": "Illustrative: deposits for equipment may be due months before launch receipts arrive.",
        "avoid": "Assuming every invoice will be collected immediately.",
        "prompt": "Create a 13-week cash forecast with real payment timing, opening cash, receipts, expenses and runway.",
        "evidence": "Cost quotes and payment schedules"
      },
      {
        "id": "operations",
        "title": "Design the service delivery loop",
        "why": "Customer experience breaks when the underlying work is undefined.",
        "do": "Map enquiry → quote → payment → fulfillment → follow-up.",
        "how": [
          "Map enquiry → quote → payment → fulfillment → follow-up.",
          "Identify each owner, handoff, supplier, tool and failure point.",
          "Set one quality standard and one fallback procedure."
        ],
        "output": "Service blueprint and first SOP.",
        "example": "Illustrative: booking request → availability check → invoice → assignment → completion → feedback.",
        "avoid": "Building automation before defining the manual process.",
        "prompt": "Write an operational SOP for one transaction with owner, handoffs, exceptions and quality check.",
        "evidence": "One real fulfillment or dry-run record"
      },
      {
        "id": "brand",
        "title": "Create the brand minimum",
        "why": "Branding should clarify the offer, not delay customer learning.",
        "do": "Write a clear business name, promise, audience, tone and visual direction.",
        "how": [
          "Write a clear business name, promise, audience, tone and visual direction.",
          "Prepare authentic photos and logo assets; use temporary placeholders where needed.",
          "Check contact consistency across the site, emails and social profiles."
        ],
        "output": "Compact brand kit and verified asset list.",
        "example": "Illustrative: one name, dark neutral palette, authentic service photos and consistent booking CTA.",
        "avoid": "Over-investing in a logo while buyers cannot understand the offer.",
        "prompt": "Build a practical brand brief with name, positioning, voice, palette, photography needs and CTA.",
        "evidence": "A brand brief with real contact details"
      },
      {
        "id": "prototype",
        "title": "Design the first conversion experience",
        "why": "A clear page can validate interest without a complete app.",
        "do": "Sketch or prototype using a tool such as Lovable if it helps you visualize quickly.",
        "how": [
          "Sketch or prototype using a tool such as Lovable if it helps you visualize quickly.",
          "Create one useful landing page with offer, credibility, FAQs and a clear contact action.",
          "Confirm the page works on mobile and tracks meaningful enquiries."
        ],
        "output": "Mobile-first landing-page brief and test page.",
        "example": "Illustrative: a lightweight landing page plus WhatsApp enquiry; no unnecessary login or features.",
        "avoid": "Mistaking an attractive prototype for a verified business.",
        "prompt": "Prepare a simple landing-page specification with mobile layout, copy, assets, CTA and enquiry measurement.",
        "evidence": "A working preview and successful test enquiry"
      },
      {
        "id": "digital",
        "title": "Own the essentials of your digital identity",
        "why": "Customers should find and contact the same business wherever they land.",
        "do": "Check available business name/domain and select a sensible domain.",
        "how": [
          "Check available business name/domain and select a sensible domain.",
          "Set up reliable email and verified contact methods.",
          "Reserve relevant social handles, complete platform profiles and link back to the main offer."
        ],
        "output": "Digital asset and account inventory.",
        "example": "Illustrative: a custom domain, matching email signature, complete Facebook and Instagram bios.",
        "avoid": "Buying every possible domain or creating accounts you cannot maintain.",
        "prompt": "Create a domain, email and social-profile setup checklist for this business and track ownership and access.",
        "evidence": "Working domain/email/profile links"
      },
      {
        "id": "visibility",
        "title": "Choose Google visibility only where eligible",
        "why": "Local visibility helps qualified businesses but an inaccurate listing risks problems.",
        "do": "Check Google Business Profile eligibility before setup.",
        "how": [
          "Check Google Business Profile eligibility before setup.",
          "If eligible, choose legitimate storefront or service-area configuration and actual business details.",
          "If not eligible, use your website, SEO and appropriate alternative channels instead."
        ],
        "output": "Local discovery plan, including a justified GBP decision.",
        "example": "Illustrative: a mobile service may qualify as service-area business; an online-only brand usually does not.",
        "avoid": "Using fake addresses, virtual offices or invented reviews.",
        "prompt": "Create a GBP eligibility screening script and an alternative discovery plan if I am not eligible.",
        "evidence": "Eligibility decision and source link"
      },
      {
        "id": "launch-test",
        "title": "Run a measured first-market test",
        "why": "Launch activity should produce learning, not just reach.",
        "do": "Choose one buyer segment and one offer.",
        "how": [
          "Choose one buyer segment and one offer.",
          "Test a small set of Meta ads, direct outreach or partner referrals as appropriate.",
          "Record leads, conversion, acquisition costs where known, objections and service delivery feedback."
        ],
        "output": "First 14-day marketing test and review sheet.",
        "example": "Illustrative: test two honest ad messages against the same offer with a strict spend ceiling.",
        "avoid": "Scaling ads based on likes before confirming leads and contribution margin.",
        "prompt": "Design a 14-day marketing experiment with campaign brief, small spend cap, lead tracking and a clear continue/stop rule.",
        "evidence": "Actual campaign or outreach outcomes"
      },
      {
        "id": "90-day",
        "title": "Build a usable 90-day operating plan",
        "why": "A plan only matters when someone owns the next action.",
        "do": "Choose milestones across validation, setup, sales, delivery and reporting.",
        "how": [
          "Choose milestones across validation, setup, sales, delivery and reporting.",
          "Assign owners, dates, resources and completion checks.",
          "Review weekly; change the plan based on evidence, not arbitrary calendar pressure."
        ],
        "output": "90-day milestones and weekly review rhythm.",
        "example": "Illustrative: weeks 1–2 customer test; 3–4 offer adjustments; 5–8 launch channels; 9–13 process review.",
        "avoid": "Treating arbitrary projections as commitments or omitting dependencies.",
        "prompt": "Create a 90-day execution plan with a weekly calendar, owners, dependencies, milestone definitions and risk triggers.",
        "evidence": "Documented priorities and weekly reporting owner"
      }
    ]
  },
  {
    "id": "social",
    "number": "03",
    "title": "Set up social media",
    "subtitle": "Create complete Facebook, Instagram, LinkedIn and WhatsApp Business profiles.",
    "phase": "Launch",
    "stages": [
      "setup",
      "launch",
      "operating"
    ],
    "intro": "Build profiles customers can trust. Consistent names, complete information, clear photos and one useful next step matter more than posting everywhere.",
    "steps": [
      {
        "title": "Choose relevant channels",
        "why": "Not every business needs every platform.",
        "do": "Choose channels based on where customers actually search and engage. Reserve consistent names where available.",
        "output": "Channel decision and username list.",
        "prompt": "For my business and audience, compare Facebook, Instagram, LinkedIn and WhatsApp Business by practical use, effort, content needs and call to action.",
        "id": "social-1",
        "how": [
          "Identify where target customers already interact.",
          "Choose Facebook, Instagram, LinkedIn or WhatsApp based on fit, not fashion.",
          "List the owner and posting responsibility for each account."
        ],
        "example": "Illustrative: a consumer experience brand may prioritize Instagram and Facebook, while corporate wellness outreach may benefit from LinkedIn.",
        "avoid": "Creating five channels nobody will maintain.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Prepare your profile kit",
        "why": "Consistency reduces confusion.",
        "do": "Gather real logo, cover or profile images, business description, verified contact details, service area, link and hours.",
        "output": "A complete reusable profile-information sheet.",
        "prompt": "Draft a brand-safe profile kit with business name, short and long descriptions, services, audience, contact details, location, business hours and primary CTA. Leave unknowns blank.",
        "id": "social-2",
        "how": [
          "Use an accurate business name and consistent public contact details.",
          "Prepare real logo/cover photos, description, booking URL and hours.",
          "Keep account access and ownership documented securely, not in the public workbook."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Claiming years of experience or credentials that cannot be verified.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Build Facebook and Instagram",
        "why": "Visitors should know what you do immediately.",
        "do": "Set categories, bios, contact buttons, service descriptions, profile imagery and a pinned introductory post.",
        "output": "Ready-to-review Facebook Page and Instagram profile checklist.",
        "prompt": "Draft a concise Facebook About section, Instagram bio, pinned introduction and three FAQ answers for this business, using only verified details.",
        "id": "social-3",
        "how": [
          "Create or claim correct Meta business assets.",
          "Complete accurate descriptions, services, buttons and professional imagery.",
          "Publish an introductory post using HOOK → INFO → CTA."
        ],
        "example": "Illustrative post: 'Bringing wellness to your doorstep. Choose your service and request availability. Message us to get started.'",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Set up LinkedIn appropriately",
        "why": "Useful for B2B credibility and partnerships.",
        "do": "If relevant, complete company description, sector, website, brand image, specialties and founder profile links.",
        "output": "LinkedIn company-profile draft.",
        "prompt": "Write a professional LinkedIn company description, tagline, specialties and first founder post without unverifiable achievements.",
        "id": "social-4",
        "how": [
          "Decide whether LinkedIn serves a B2B goal.",
          "Use a genuine personal account to create/manage the Company Page.",
          "Complete specialties, verified website, tagline and team details."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source",
        "links": [
          {
            "title": "LinkedIn official Page setup",
            "url": "https://www.linkedin.com/help/linkedin/answer/a541785"
          }
        ]
      },
      {
        "title": "Set up WhatsApp Business",
        "why": "Customers want simple ways to ask and book.",
        "do": "Add real business details, catalog or services, greeting, away message, FAQs and safe response expectations.",
        "output": "Messaging profile and reply scripts.",
        "prompt": "Draft a WhatsApp Business greeting, after-hours reply, FAQ responses and inquiry-to-booking messages for my services.",
        "id": "social-5",
        "how": [
          "Set up business category, services, hours and contact route.",
          "Create greeting, away message, saved FAQs and quick replies.",
          "Test from another phone and make sure a real human can respond."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Promising 24/7 instant support without staffing it.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Publish the first content",
        "why": "An empty profile feels unfinished.",
        "do": "Prepare an introduction, service breakdown, how-to-buy post, helpful advice, behind-the-scenes content, FAQs and a proof post only if real proof exists.",
        "output": "Seven starter posts and one-week content plan.",
        "prompt": "Create seven launch posts with a clear hook, useful information and next action. Use no invented reviews, results or client claims.",
        "id": "social-6",
        "how": [
          "Create a HOOK → INFO → CTA structure for each post.",
          "Use actual product/service visuals, not invented proof.",
          "Publish a pinned offer, FAQ and introductory story before paid promotion."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "pitch",
    "number": "04",
    "title": "Pitch decks that make sense",
    "subtitle": "Explain the opportunity clearly to funders, partners or investors.",
    "phase": "Growth",
    "stages": [
      "planning",
      "setup",
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "A strong pitch explains the business and its evidence. Beautiful slides cannot rescue unclear economics.",
    "steps": [
      {
        "title": "Decide who the pitch is for",
        "why": "Banks, grant panels, partners and investors have different questions.",
        "do": "Specify the audience, objective, amount or partnership requested and the decision you want.",
        "output": "Pitch brief.",
        "prompt": "Create a pitch brief for my chosen audience. Clarify what I am asking for, why now, and what evidence the audience will need.",
        "id": "pitch-1",
        "how": [
          "Identify judges, partner, bank or investor audience.",
          "State the decision you want them to make.",
          "Prepare a 90-second version before making slides."
        ],
        "example": "Illustrative: a grant panel needs impact, need and delivery feasibility; an investor focuses on economics and scalable returns.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Build the story",
        "why": "The deck needs an argument, not random slides.",
        "do": "Outline problem, target customer, solution, why now, offer, traction or test evidence, model, alternatives, team, plan and ask.",
        "output": "10–12 slide storyline.",
        "prompt": "Outline a persuasive 10-slide business pitch for my market and audience. Mark any missing market-size, traction or financial figures as evidence needed.",
        "id": "pitch-2",
        "how": [
          "Follow Problem → Impact/Story → Opportunity → Numbers → Ask.",
          "Select a maximum of one central claim per slide.",
          "Write presenter talk tracks, not walls of text."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Document the numbers",
        "why": "Funders will question unsupported projections.",
        "do": "Show sourced costs, pricing, margin, milestones, projections and how the funds would be used.",
        "output": "Assumption-backed financial slides.",
        "prompt": "Design clear, defensible financial and use-of-funds slides with blank inputs for unsupported numbers.",
        "id": "pitch-3",
        "how": [
          "Check total need, usage of funds and what the money unlocks.",
          "Show real pricing, cost and key assumptions.",
          "Practice explaining how numbers were derived."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Create your visuals",
        "why": "Slides should make the story easier to absorb.",
        "do": "Use actual product photos, examples, simple charts, limited copy and consistent branding.",
        "output": "Visual brief for every slide.",
        "prompt": "Provide a clean visual direction and presenter notes for every slide, with no invented business evidence.",
        "id": "pitch-4",
        "how": [
          "Use actual product photos, examples, simple charts, limited copy and consistent branding.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Prepare for questions",
        "why": "The discussion is part of the pitch.",
        "do": "Practice questions about competitors, demand, margins, distribution, risks and execution.",
        "output": "Investor or partner Q&A sheet.",
        "prompt": "List the ten toughest questions someone should ask about my proposal, why they matter and what evidence I need to answer them.",
        "id": "pitch-5",
        "how": [
          "Answer what happens if growth is slower than expected.",
          "Explain why this team can deliver.",
          "Be able to explain the business and ask in 90 seconds."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "gbp",
    "number": "05",
    "title": "Google Business Profile",
    "subtitle": "Set up a legitimate local presence and keep it accurate.",
    "phase": "Launch",
    "stages": [
      "setup",
      "launch",
      "operating"
    ],
    "intro": "Google Business Profile helps eligible businesses be found locally. Eligibility comes first; online-only businesses generally do not qualify.",
    "steps": [
      {
        "title": "Check eligibility",
        "why": "Wrong eligibility claims can lead to suspension.",
        "do": "Determine whether the business has qualifying in-person customer contact and a legitimate service area or staffed location.",
        "output": "Eligibility and location-type decision.",
        "prompt": "Create a Google Business Profile eligibility checklist for my business based on current Google rules. Ask for any information needed to determine if I qualify.",
        "id": "gbp-1",
        "how": [
          "Confirm the business has eligible in-person customer contact.",
          "Differentiate storefront, service-area, hybrid and online-only.",
          "Read Google's current eligibility policies before taking action."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Registering online-only brands or virtual offices as staffed locations.",
        "evidence": "Your written output or link to the relevant source",
        "links": [
          {
            "title": "Official GBP eligibility",
            "url": "https://support.google.com/business/answer/13763036?hl=en"
          }
        ]
      },
      {
        "title": "Claim or create the profile",
        "why": "Avoid duplicates and ownership confusion.",
        "do": "Search for an existing listing before creating one, use the correct Google account and follow Google's setup flow.",
        "output": "Ownership and setup checklist.",
        "prompt": "Write a step-by-step checklist for claiming or creating an eligible Google Business Profile, including duplicate-profile precautions.",
        "id": "gbp-2",
        "how": [
          "Search for an existing listing before creating one, use the correct Google account and follow Google's setup flow.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Complete the business details",
        "why": "Accuracy improves trust and customer contact.",
        "do": "Enter real name, primary category, phone, booking or website link, truthful address or service area, hours and services.",
        "output": "Ready-to-enter profile data.",
        "prompt": "Prepare my Google Business Profile business description, service list and category-selection worksheet using the correct real information.",
        "id": "gbp-3",
        "how": [
          "Choose the closest accurate primary category.",
          "Use real hours, website, phone and location/service areas.",
          "Write a short plain-language description without keyword stuffing."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source",
        "links": [
          {
            "title": "Official representation guidelines",
            "url": "https://support.google.com/business/answer/3038177?hl=en"
          }
        ]
      },
      {
        "title": "Verify and add real media",
        "why": "Verification and authentic photos are central to a usable listing.",
        "do": "Follow Google's offered verification method, add genuine exterior/interior/team/work imagery only where appropriate.",
        "output": "Verification and photography checklist.",
        "prompt": "Give me a photo checklist for my business's Google Business Profile and a compliance check against misleading imagery.",
        "id": "gbp-4",
        "how": [
          "Use the verification method Google offers.",
          "Add only real photos that represent actual operations.",
          "Check service-area display rules and hide home address where appropriate."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source",
        "links": [
          {
            "title": "Service-area business guidance",
            "url": "https://support.google.com/business/answer/9157481?hl=en"
          }
        ]
      },
      {
        "title": "Create a maintenance habit",
        "why": "Profiles go stale when hours, services or links change.",
        "do": "Review accuracy, publish relevant updates when available, respond to genuine reviews and check performance reports.",
        "output": "Monthly maintenance checklist.",
        "prompt": "Create a compliant monthly Google Business Profile maintenance checklist with posting ideas, review responses and link checks.",
        "id": "gbp-5",
        "how": [
          "Correct holiday hours and booking links promptly.",
          "Respond respectfully to genuine reviews.",
          "Track enquiries and profile actions; never buy or fabricate reviews."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "marketing",
    "number": "06",
    "title": "Marketing that produces leads",
    "subtitle": "Build an offer, content system and measurable campaign.",
    "phase": "Growth",
    "stages": [
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "Marketing is not simply posting more. Match the message to the customer and track what actually leads to enquiries or sales.",
    "steps": [
      {
        "title": "Choose your primary offer",
        "why": "One focused offer is easier to communicate.",
        "do": "State the offer, buyer, benefit, price or quote process and simple action to take.",
        "output": "Campaign offer and CTA.",
        "prompt": "Help me write one clear, specific marketing offer with an honest benefit, supporting proof needed and a single CTA.",
        "id": "marketing-1",
        "how": [
          "Use HOOK → INFO → CTA for the core campaign.",
          "Clarify the exact offer and who it is for.",
          "Create a single booking/contact action."
        ],
        "example": "Illustrative: Hook 'Your afternoon is fully booked?' Info 'Our mobile therapists travel to your location.' CTA 'Request availability.'",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Map customer questions",
        "why": "Useful content answers real objections.",
        "do": "Collect FAQs, price objections, trust concerns and reasons to choose your business.",
        "output": "Customer messaging sheet.",
        "prompt": "Turn actual customer FAQs and objections into a messaging matrix with answers based only on known details.",
        "id": "marketing-2",
        "how": [
          "Collect FAQs, price objections, trust concerns and reasons to choose your business.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Build content pillars",
        "why": "Consistency beats random ideas.",
        "do": "Plan education, offer demonstration and genuine proof or behind-the-scenes content.",
        "output": "Three content pillars.",
        "prompt": "Generate three content pillars appropriate for my business, each with topics and a measurable role in the customer journey.",
        "id": "marketing-3",
        "how": [
          "Plan education, offer demonstration and genuine proof or behind-the-scenes content.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Write a practical calendar",
        "why": "A plan removes last-minute posting decisions.",
        "do": "Schedule 14 days of posts, format, media, caption, CTA and owner.",
        "output": "Two-week publishing calendar.",
        "prompt": "Create a realistic 14-day social-media content calendar with headline, caption, format, photo requirement and CTA for each post.",
        "id": "marketing-4",
        "how": [
          "Make posts useful: explain a pain, show an option, then give one CTA.",
          "Build a two-week posting rhythm the team can maintain.",
          "Use approved real photography and readable formats."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Set up enquiry follow-up",
        "why": "Leads are lost between interest and response.",
        "do": "Track where enquiries came from, next action, follow-up date and sale or loss outcome.",
        "output": "Simple lead follow-up template.",
        "prompt": "Draft an enquiry-handling script, lead tracker fields and a respectful follow-up schedule for my type of business.",
        "id": "marketing-5",
        "how": [
          "Track every genuine enquiry and its source.",
          "Send a helpful follow-up where consent allows.",
          "Measure bookings and revenue, not views alone."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Review performance",
        "why": "Likes and reach do not equal sales.",
        "do": "Track enquiries, qualified leads, conversion, acquisition costs where known and revenue attributed to campaigns.",
        "output": "Weekly marketing scorecard.",
        "prompt": "Design a weekly marketing scorecard and simple decision rules using real lead and conversion data.",
        "id": "marketing-6",
        "how": [
          "Track enquiries, qualified leads, conversion, acquisition costs where known and revenue attributed to campaigns.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "automations",
    "number": "07",
    "title": "Practical automation",
    "subtitle": "Reduce repetitive administration without breaking operations.",
    "phase": "Operations",
    "stages": [
      "setup",
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "Automation should solve a recurring problem. If a simple checklist works better, use the checklist.",
    "steps": [
      {
        "title": "Find repetitive work",
        "why": "You should automate a measurable problem.",
        "do": "List tasks, frequency, owner, errors, cost and what would happen if a system failed.",
        "output": "Ranked automation opportunity list.",
        "prompt": "Give me an automation audit worksheet for my business. Rank repetitive tasks by frequency, time saved, failure risk and implementation complexity.",
        "id": "automations-1",
        "how": [
          "List tasks, frequency, owner, errors, cost and what would happen if a system failed.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Draw the workflow",
        "why": "Undefined processes make fragile automations.",
        "do": "Write the trigger, data inputs, action, owner, exception handling and success check.",
        "output": "One-page workflow map.",
        "prompt": "Map this process into trigger, input, action, approval, error route, fallback and success test. Recommend the simplest viable tool.",
        "id": "automations-2",
        "how": [
          "Map trigger, inputs, owner, action and exceptions.",
          "Try a normal rule before using AI.",
          "Define exact point for human approval."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Choose a sensible tool",
        "why": "Complex tools are not always necessary.",
        "do": "Compare existing software features, basic rules, n8n, Zapier and AI assistance only when the task calls for it.",
        "output": "Tool selection and estimated ongoing cost.",
        "prompt": "Compare a manual workflow, built-in software feature, basic automation and AI-enhanced option for my task, including realistic operating risks.",
        "id": "automations-3",
        "how": [
          "Compare existing software features, basic rules, n8n, Zapier and AI assistance only when the task calls for it.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Test edge cases",
        "why": "Automations break outside perfect demos.",
        "do": "Test duplicates, invalid data, timeouts, missed messages and handoff to a human.",
        "output": "Automation test checklist.",
        "prompt": "Create a failure and acceptance test plan for my workflow, including duplication, permissions, recovery and human escalation.",
        "id": "automations-4",
        "how": [
          "Test invalid input, duplicate events and timeouts.",
          "Confirm credentials never appear in public tools.",
          "Add a safe fallback and escalation to a person."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Launch with control",
        "why": "Operational mistakes are expensive.",
        "do": "Start with a small group, record errors, document how to turn it off and measure the improvement.",
        "output": "Controlled automation rollout checklist.",
        "prompt": "Produce a small-scale rollout plan for my workflow with owner, alerts, fallback, tracking and measurable value.",
        "id": "automations-5",
        "how": [
          "Start with a small group, record errors, document how to turn it off and measure the improvement.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "opportunities",
    "number": "08",
    "title": "Grants & business opportunities",
    "subtitle": "Build a repeatable funding and opportunity search habit.",
    "phase": "Growth",
    "stages": [
      "idea",
      "planning",
      "setup",
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "Keep a disciplined list of opportunities relevant to your actual business. Listings must be checked at the original source.",
    "steps": [
      {
        "title": "Define what you're eligible for",
        "why": "Matching beats scrolling through every grant.",
        "do": "Record business location, industry, ownership, stage, team size, needs and entity status.",
        "output": "Opportunity eligibility profile.",
        "prompt": "Build a grants and business-opportunity eligibility profile for my business, highlighting details I need to verify.",
        "id": "opportunities-1",
        "how": [
          "Document location, sector, stage and relevant eligibility.",
          "Include accelerators, cohorts, pitch competitions, tenders and partnerships.",
          "Tag what evidence the business can provide today."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Choose credible sources",
        "why": "Aggregators can be outdated.",
        "do": "Bookmark official grant programs, accelerators, government procurement sources, chambers and industry bodies.",
        "output": "Source watchlist with URLs.",
        "prompt": "Give me a research checklist for finding official grants, procurement tenders and accelerator calls relevant to my industry and location. Do not invent open programs.",
        "id": "opportunities-2",
        "how": [
          "Track verified official calls and organizational newsletters.",
          "Include SBDC, CDB, tourism bodies, Founder Institute and country-specific agencies where relevant.",
          "Record source URL, date checked and owner."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Screen each opportunity",
        "why": "Not every headline deserves an application.",
        "do": "Check official deadline, country rules, stage, required documents, funding type and restrictions.",
        "output": "Go / no-go opportunity sheet.",
        "prompt": "Create a practical grant or tender screening matrix with source URL, eligibility, current status, deadline, requirements and opportunity fit.",
        "id": "opportunities-3",
        "how": [
          "Label opportunities VERIFIED OPEN, ANNOUNCED / VERIFY, CLOSED, or WATCHLIST.",
          "Check actual deadline and eligibility on the issuing organization's site.",
          "Log decision before investing hours in applications."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Build an application pack",
        "why": "Good applications reuse accurate documents.",
        "do": "Prepare business summary, pitch, financial records, registration documents and supporting evidence.",
        "output": "Ready-to-update application folder checklist.",
        "prompt": "Create a master document checklist for grant and procurement applications, with notes on which information must be updated per call.",
        "id": "opportunities-4",
        "how": [
          "Prepare business summary, pitch, financial records, registration documents and supporting evidence.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Conduct a weekly opportunity review",
        "why": "Deadlines are missed when checking is sporadic.",
        "do": "Each week review sources, shortlist credible opportunities and assign next actions or application owners.",
        "output": "Weekly opportunity report template.",
        "prompt": "Design a weekly grant, tender and accelerator report with source links, verified deadlines, eligibility reasoning and next actions. Leave unverified listings clearly marked.",
        "id": "opportunities-5",
        "how": [
          "Record what changed, why it matters, which venture fits and next action.",
          "Use exact source and checked date for each opportunity.",
          "Never mark a deadline open from stale aggregator copy."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "website",
    "number": "09",
    "title": "Website & customer journey",
    "subtitle": "Make the digital experience easy to understand and act on.",
    "phase": "Launch",
    "stages": [
      "setup",
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "A site should answer three questions quickly: what is offered, why should I trust it, and how do I start?",
    "steps": [
      {
        "title": "Choose the site's one main job",
        "why": "Too many competing calls to action confuse visitors.",
        "do": "Decide if visitors should book, buy, call, inquire or request a quote.",
        "output": "Primary conversion goal.",
        "prompt": "Write a conversion-first website brief for my business with one primary CTA and the supporting information visitors need.",
        "id": "website-1",
        "how": [
          "Choose exactly one primary action: buy, book, request quote or enquire.",
          "Lead with customer problem and service/outcome.",
          "Use authentic assets and only verifiable proof."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Build the page structure",
        "why": "Navigation should follow customer questions.",
        "do": "Plan home, service or product details, proof, process, FAQs, contact and appropriate policies.",
        "output": "Sitemap and content outline.",
        "prompt": "Suggest a simple mobile-first sitemap and section structure for this business, using benefits before technical details.",
        "id": "website-2",
        "how": [
          "Sketch a mobile-first site before polishing the design.",
          "Use Lovable or another simple visual tool when helpful.",
          "Align hero, offer, proof, FAQ and CTA; avoid repetitive sections."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Prepare real assets",
        "why": "Trust comes from actual proof.",
        "do": "Gather business photos, genuine credentials, service details, operating hours, accurate pricing and booking links.",
        "output": "Content and asset checklist.",
        "prompt": "Give me a page-by-page asset and copy checklist. Do not invent testimonials or claim work that cannot be verified.",
        "id": "website-3",
        "how": [
          "Gather business photos, genuine credentials, service details, operating hours, accurate pricing and booking links.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Check the conversion path",
        "why": "A beautiful site is useless if the visitor cannot complete the action.",
        "do": "Test mobile navigation, booking or enquiry, payment where applicable, links, accessibility and page loading.",
        "output": "Launch QA checklist.",
        "prompt": "Create a website acceptance checklist for mobile usability, real links, forms, SEO essentials, accessibility and conversion.",
        "id": "website-4",
        "how": [
          "Test forms, buttons and purchase or booking flow.",
          "Verify mobile readability, accessibility, performance and SEO fundamentals.",
          "Check the real deployment, not just a prototype screenshot."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  },
  {
    "id": "weekly",
    "number": "10",
    "title": "Weekly founder review",
    "subtitle": "Turn activity into accountability and deliberate next steps.",
    "phase": "Operations",
    "stages": [
      "planning",
      "setup",
      "launch",
      "operating",
      "scaling"
    ],
    "intro": "A good weekly report shows what changed, what matters, what slipped and the next action. Automatic emails are a later integration; this module is a repeatable manual workflow.",
    "steps": [
      {
        "title": "Collect the real numbers",
        "why": "Memory makes bad reporting.",
        "do": "Record relevant weekly leads, sales, expenses, bookings, conversion, completed tasks or project milestones.",
        "output": "Weekly actuals snapshot.",
        "prompt": "Create a weekly performance worksheet for my business with fields for real metrics, previous-week comparison and missing-data flags.",
        "id": "weekly-1",
        "how": [
          "Enter measured leads, bookings, collections, outgoings and capacity.",
          "Compare with previous period and note data gaps.",
          "Distinguish base amounts, included fees and extra tips where applicable."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Review what changed",
        "why": "Numbers without causes are noise.",
        "do": "Note wins, issues, customer feedback, supplier changes and opportunities, with supporting information.",
        "output": "What changed / why it matters log.",
        "prompt": "Create a weekly business-review format: what happened, why it matters, known causes, unknown causes and evidence needed.",
        "id": "weekly-2",
        "how": [
          "Summarize what changed since last week.",
          "Separate known causes and hypotheses.",
          "Write one concrete consequence for the business."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Check the opportunity watchlist",
        "why": "Growth channels and funding change over time.",
        "do": "Review relevant grants, procurement, partnership leads and deadlines from official sources.",
        "output": "Actionable opportunity roundup.",
        "prompt": "Give me a weekly opportunity review template with verified sources, fit, deadlines, owner and next action.",
        "id": "weekly-3",
        "how": [
          "Review relevant grants, procurement, partnership leads and deadlines from official sources.",
          "Record the result in your workbook.",
          "Verify important details before treating the task as finished."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      },
      {
        "title": "Choose three next actions",
        "why": "A long report needs a short decision.",
        "do": "Pick the three highest-value tasks with owners, due dates and clear completion criteria.",
        "output": "Next-week commitments.",
        "prompt": "Turn this week's factual results into a priority table with three actions, expected result, owner, deadline and dependency.",
        "id": "weekly-4",
        "how": [
          "Choose three highest-impact actions.",
          "Assign owner, due date, and what 'done' means.",
          "Carry forward incomplete commitments honestly."
        ],
        "example": "Example to adapt: describe what a real customer would do or see at this step. Use actual facts for your business.",
        "avoid": "Copying generic advice without checking that it fits your market, customer and costs.",
        "evidence": "Your written output or link to the relevant source"
      }
    ]
  }
];

export const getPlaybook=id=>PLAYBOOKS.find(p=>p.id===id)||null;
export const stepKey=(moduleId,stepId)=>"pb:"+moduleId+":"+stepId;
export const legacyStepKey=(moduleId,index)=>"pb:"+moduleId+":"+index;
export const responseKey=(moduleId,stepId)=>"pb-note:"+moduleId+":"+stepId;
export const legacyResponseKey=(moduleId,index)=>"pb-note:"+moduleId+":"+index;
export function isStepDone(tasks={},module,index){
 const s=module.steps[index];return tasks[stepKey(module.id,s.id)]===true || tasks[legacyStepKey(module.id,index)]===true;
}
export function getStepResponse(tasks={},module,index){const s=module.steps[index];return tasks[responseKey(module.id,s.id)]??tasks[legacyResponseKey(module.id,index)]??""}
export function playbookProgress(tasks={},module){
 const total=module.steps.length,complete=module.steps.filter((_,index)=>isStepDone(tasks,module,index)).length;
 return {complete,total,percent:Math.round(100*complete/Math.max(total,1))};
}
export function orderedPlaybooks(business){
 const stage=business?.stage||"idea";
 const preferred={validate:"ideation",customers:"marketing",funding:"opportunities",finance:"planning",digital:"social",operations:"automations"}[business?.goal];
 return [...PLAYBOOKS].sort((a,b)=>{
  const rank=p=>(p.id===preferred?5:0)+(p.stages.includes(stage)?2:0);
  return rank(b)-rank(a)||Number(a.number)-Number(b.number);
 });
}
export function stepPrompt(module,step,business={}){
 return ["I am following a founder-led business-building tutorial. Help me complete this single exercise using only the facts below. Flag missing information and do not pretend to have researched or completed tasks.",
  "Business: "+(business.name||"[business name missing]"),
  "Business stage: "+(business.stage||"[stage missing]"),
  "Industry: "+(business.industry||"[industry missing]"),
  "Location: "+(business.location||"[location missing]"),
  "Business summary: "+(business.summary||"[not yet provided]"),
  "Module: "+module.title,"Step: "+step.title,
  "Instructions: "+(step.how||[]).map((x,i)=>(i+1)+". "+x).join(" "),
  "Required output: "+step.output,
  "Founder-supplied prompt to adapt: "+step.prompt,
  "Ask for missing facts before writing a final answer. No invented results, legal requirements, competitors or funding opportunities."
 ].join("\n");
}


export function workbookMarkdown(business){
 const tasks=business?.tasks||{};
 const line=s=>String(s??"").replace(/[\r\n]+/g," ").trim();
 const sections=[
  "# "+line(business.name||"Untitled business")+" — BizzIntel workbook",
  "Business stage: "+line(business.stage),
  "Industry: "+line(business.industry),
  "Market: "+line(business.location),
  "Goal: "+line(business.goal),
  "",
  "This workbook contains founder-entered results and draft educational tasks. Neither independent verification nor third-party eligibility is implied."
 ];
 for(const p of PLAYBOOKS){
  sections.push("","## "+p.title,"");
  for(let i=0;i<p.steps.length;i++){
   const st=p.steps[i],completed=isStepDone(tasks,p,i);
   const notes=getStepResponse(tasks,p,i);
   const source=tasks["pb-source:"+p.id+":"+st.id]||"";
   const next=tasks["pb-next:"+p.id+":"+st.id]||"";
   sections.push("### "+(i+1)+". "+st.title+" — "+(completed?"Complete":"In progress"),
   "**Objective:** "+st.output,
   "**My work:**",String(notes||"Not recorded"),"");
   if(source)sections.push("**Source/reference:** "+source,"");
   if(next)sections.push("**Next action:** "+next,"");
  }
 }
 return sections.join("\n");
}
