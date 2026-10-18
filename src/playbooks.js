/**
 * BizzIntel learning tracks.
 * Editorial policy: this is a DRAFT structure based on founder-requested topics.
 * Specific steps, scripts and tactics are not attributed to Amar Pearson until reviewed.
 * The business founder, not an AI agent, chooses the sequence and executes the work.
 */
export const PLAYBOOKS = [
{
 id:"ideation", number:"01", title:"Idea & opportunity", subtitle:"Move from a thought to a testable business idea.", phase:"Plan", stages:["idea","planning"], duration:"Start here if you're exploring",
 intro:"A business begins with a clear customer problem. Document the idea before spending on a logo, a website or equipment.",
 steps:[
 {title:"Write down the opportunity",why:"A vague idea is difficult to test.",do:"Describe who has the problem, what happens today and what a better outcome looks like.",output:"A one-paragraph opportunity statement.",prompt:"Help me turn my business idea into a clear opportunity statement. Ask what problem exists, who experiences it, and what is currently used instead. Distinguish my claims from verified facts."},
 {title:"Name your first customer",why:"Everyone is not an actionable target audience.",do:"Define one starting customer segment, their circumstances and where to reach them.",output:"One ideal customer profile.",prompt:"Using this business description, draft a first customer profile covering needs, triggers, buying decision, objections, and where to find these customers. Label anything unknown as a question."},
 {title:"Map alternatives and competitors",why:"Customers always have an alternative, including doing nothing.",do:"Find direct rivals, substitutes and their offers. Record websites, prices, reviews and gaps with source links.",output:"A sourced competitor comparison.",prompt:"Create a competitor research template for my business: direct competitors, substitutes, prices, customer complaints, positioning and source links. Do not invent competitor facts."},
 {title:"Run a small reality test",why:"Interest does not equal actual demand.",do:"Speak with likely customers, test an offer and record willingness to pay or genuine enquiries.",output:"A test log with results and objections.",prompt:"Design a low-cost, ethical demand test for my proposed business with a target audience, exact questions, timeline, success threshold and stop condition."},
 {title:"Decide to pursue, revise or park",why:"Ideas become expensive when decisions are made on enthusiasm alone.",do:"Summarize what you learned, key uncertainties and the smallest practical next commitment.",output:"A one-page go / revise / park decision.",prompt:"Create an evidence-based decision checklist for my business idea. Separate proven demand, unknowns, costs, risks and the next experiment."}
]
},
{
 id:"planning",number:"02",title:"Airtight planning",subtitle:"Make the business model, numbers and operations work together.",phase:"Plan",stages:["idea","planning","setup"],
 intro:"A plan should be usable, not just impressive. Put assumptions into numbers and assign actions to real people.",
 steps:[
 {title:"Define the offer and value",why:"Customers need a simple reason to buy.",do:"Write what you sell, what is included, who buys it and why they choose it.",output:"Offer sheet and clear value proposition.",prompt:"Help me draft a one-page offer: customer, problem, solution, inclusions, exclusions, outcomes, proof needed and next action. Avoid hype."},
 {title:"Calculate startup costs",why:"A launch budget must include the costs people forget.",do:"List equipment, licences, setup, working capital, marketing, payments and contingencies.",output:"Categorized startup budget.",prompt:"Give me a startup-cost worksheet tailored to my business type and market. Include one-off and recurring costs; use blank fields for amounts I haven't supplied."},
 {title:"Set pricing and unit economics",why:"Revenue without margin is a trap.",do:"Work out selling price, variable cost, contribution per sale, fixed costs and break-even volume.",output:"Pricing worksheet and break-even estimate.",prompt:"Build a pricing worksheet with contribution margin, monthly break-even, capacity and sensitivity scenarios. Use only my supplied numbers and show assumptions."},
 {title:"Plan the customer journey",why:"A good offer can still fail through a bad buying experience.",do:"Sketch discovery, enquiry, sale, payment, delivery, aftercare and repeat purchase.",output:"A customer journey with owners and touchpoints.",prompt:"Map my customer's journey from first discovery to repeat purchase. Identify every touchpoint, likely friction and simple improvements."},
 {title:"List operating dependencies",why:"Plans need people, suppliers and capacity.",do:"Identify suppliers, capacity limits, staffing, licences, insurance, payment collection and delivery standards.",output:"Operations and compliance checklist.",prompt:"Create an operating-readiness checklist for my business. Flag local requirements for official verification; do not make up legal rules."},
 {title:"Build a 90-day action plan",why:"A business plan should lead to action.",do:"Pick milestones, owners, costs, success measures and review dates.",output:"A realistic 90-day launch or improvement roadmap.",prompt:"Turn this business plan into a realistic 90-day timeline with dependencies, specific deliverables, owners, costs and measurable milestones."}
]
},
{
 id:"social",number:"03",title:"Set up social media",subtitle:"Create complete Facebook, Instagram, LinkedIn and WhatsApp Business profiles.",phase:"Launch",stages:["setup","launch","operating"],
 intro:"Build profiles customers can trust. Consistent names, complete information, clear photos and one useful next step matter more than posting everywhere.",
 steps:[
 {title:"Choose relevant channels",why:"Not every business needs every platform.",do:"Choose channels based on where customers actually search and engage. Reserve consistent names where available.",output:"Channel decision and username list.",prompt:"For my business and audience, compare Facebook, Instagram, LinkedIn and WhatsApp Business by practical use, effort, content needs and call to action."},
 {title:"Prepare your profile kit",why:"Consistency reduces confusion.",do:"Gather real logo, cover or profile images, business description, verified contact details, service area, link and hours.",output:"A complete reusable profile-information sheet.",prompt:"Draft a brand-safe profile kit with business name, short and long descriptions, services, audience, contact details, location, business hours and primary CTA. Leave unknowns blank."},
 {title:"Build Facebook and Instagram",why:"Visitors should know what you do immediately.",do:"Set categories, bios, contact buttons, service descriptions, profile imagery and a pinned introductory post.",output:"Ready-to-review Facebook Page and Instagram profile checklist.",prompt:"Draft a concise Facebook About section, Instagram bio, pinned introduction and three FAQ answers for this business, using only verified details."},
 {title:"Set up LinkedIn appropriately",why:"Useful for B2B credibility and partnerships.",do:"If relevant, complete company description, sector, website, brand image, specialties and founder profile links.",output:"LinkedIn company-profile draft.",prompt:"Write a professional LinkedIn company description, tagline, specialties and first founder post without unverifiable achievements."},
 {title:"Set up WhatsApp Business",why:"Customers want simple ways to ask and book.",do:"Add real business details, catalog or services, greeting, away message, FAQs and safe response expectations.",output:"Messaging profile and reply scripts.",prompt:"Draft a WhatsApp Business greeting, after-hours reply, FAQ responses and inquiry-to-booking messages for my services."},
 {title:"Publish the first content",why:"An empty profile feels unfinished.",do:"Prepare an introduction, service breakdown, how-to-buy post, helpful advice, behind-the-scenes content, FAQs and a proof post only if real proof exists.",output:"Seven starter posts and one-week content plan.",prompt:"Create seven launch posts with a clear hook, useful information and next action. Use no invented reviews, results or client claims."}
]
},
{
 id:"pitch",number:"04",title:"Pitch decks that make sense",subtitle:"Explain the opportunity clearly to funders, partners or investors.",phase:"Growth",stages:["planning","setup","launch","operating","scaling"],
 intro:"A strong pitch explains the business and its evidence. Beautiful slides cannot rescue unclear economics.",
 steps:[
 {title:"Decide who the pitch is for",why:"Banks, grant panels, partners and investors have different questions.",do:"Specify the audience, objective, amount or partnership requested and the decision you want.",output:"Pitch brief.",prompt:"Create a pitch brief for my chosen audience. Clarify what I am asking for, why now, and what evidence the audience will need."},
 {title:"Build the story",why:"The deck needs an argument, not random slides.",do:"Outline problem, target customer, solution, why now, offer, traction or test evidence, model, alternatives, team, plan and ask.",output:"10–12 slide storyline.",prompt:"Outline a persuasive 10-slide business pitch for my market and audience. Mark any missing market-size, traction or financial figures as evidence needed."},
 {title:"Document the numbers",why:"Funders will question unsupported projections.",do:"Show sourced costs, pricing, margin, milestones, projections and how the funds would be used.",output:"Assumption-backed financial slides.",prompt:"Design clear, defensible financial and use-of-funds slides with blank inputs for unsupported numbers."},
 {title:"Create your visuals",why:"Slides should make the story easier to absorb.",do:"Use actual product photos, examples, simple charts, limited copy and consistent branding.",output:"Visual brief for every slide.",prompt:"Provide a clean visual direction and presenter notes for every slide, with no invented business evidence."},
 {title:"Prepare for questions",why:"The discussion is part of the pitch.",do:"Practice questions about competitors, demand, margins, distribution, risks and execution.",output:"Investor or partner Q&A sheet.",prompt:"List the ten toughest questions someone should ask about my proposal, why they matter and what evidence I need to answer them."}
]
},
{
 id:"gbp",number:"05",title:"Google Business Profile",subtitle:"Set up a legitimate local presence and keep it accurate.",phase:"Launch",stages:["setup","launch","operating"],
 intro:"Google Business Profile helps eligible businesses be found locally. Eligibility comes first; online-only businesses generally do not qualify.",
 steps:[
 {title:"Check eligibility",why:"Wrong eligibility claims can lead to suspension.",do:"Determine whether the business has qualifying in-person customer contact and a legitimate service area or staffed location.",output:"Eligibility and location-type decision.",prompt:"Create a Google Business Profile eligibility checklist for my business based on current Google rules. Ask for any information needed to determine if I qualify."},
 {title:"Claim or create the profile",why:"Avoid duplicates and ownership confusion.",do:"Search for an existing listing before creating one, use the correct Google account and follow Google's setup flow.",output:"Ownership and setup checklist.",prompt:"Write a step-by-step checklist for claiming or creating an eligible Google Business Profile, including duplicate-profile precautions."},
 {title:"Complete the business details",why:"Accuracy improves trust and customer contact.",do:"Enter real name, primary category, phone, booking or website link, truthful address or service area, hours and services.",output:"Ready-to-enter profile data.",prompt:"Prepare my Google Business Profile business description, service list and category-selection worksheet using the correct real information."},
 {title:"Verify and add real media",why:"Verification and authentic photos are central to a usable listing.",do:"Follow Google's offered verification method, add genuine exterior/interior/team/work imagery only where appropriate.",output:"Verification and photography checklist.",prompt:"Give me a photo checklist for my business's Google Business Profile and a compliance check against misleading imagery."},
 {title:"Create a maintenance habit",why:"Profiles go stale when hours, services or links change.",do:"Review accuracy, publish relevant updates when available, respond to genuine reviews and check performance reports.",output:"Monthly maintenance checklist.",prompt:"Create a compliant monthly Google Business Profile maintenance checklist with posting ideas, review responses and link checks."}
]
},
{
 id:"marketing",number:"06",title:"Marketing that produces leads",subtitle:"Build an offer, content system and measurable campaign.",phase:"Growth",stages:["launch","operating","scaling"],
 intro:"Marketing is not simply posting more. Match the message to the customer and track what actually leads to enquiries or sales.",
 steps:[
 {title:"Choose your primary offer",why:"One focused offer is easier to communicate.",do:"State the offer, buyer, benefit, price or quote process and simple action to take.",output:"Campaign offer and CTA.",prompt:"Help me write one clear, specific marketing offer with an honest benefit, supporting proof needed and a single CTA."},
 {title:"Map customer questions",why:"Useful content answers real objections.",do:"Collect FAQs, price objections, trust concerns and reasons to choose your business.",output:"Customer messaging sheet.",prompt:"Turn actual customer FAQs and objections into a messaging matrix with answers based only on known details."},
 {title:"Build content pillars",why:"Consistency beats random ideas.",do:"Plan education, offer demonstration and genuine proof or behind-the-scenes content.",output:"Three content pillars.",prompt:"Generate three content pillars appropriate for my business, each with topics and a measurable role in the customer journey."},
 {title:"Write a practical calendar",why:"A plan removes last-minute posting decisions.",do:"Schedule 14 days of posts, format, media, caption, CTA and owner.",output:"Two-week publishing calendar.",prompt:"Create a realistic 14-day social-media content calendar with headline, caption, format, photo requirement and CTA for each post."},
 {title:"Set up enquiry follow-up",why:"Leads are lost between interest and response.",do:"Track where enquiries came from, next action, follow-up date and sale or loss outcome.",output:"Simple lead follow-up template.",prompt:"Draft an enquiry-handling script, lead tracker fields and a respectful follow-up schedule for my type of business."},
 {title:"Review performance",why:"Likes and reach do not equal sales.",do:"Track enquiries, qualified leads, conversion, acquisition costs where known and revenue attributed to campaigns.",output:"Weekly marketing scorecard.",prompt:"Design a weekly marketing scorecard and simple decision rules using real lead and conversion data."}
]
},
{
 id:"automations",number:"07",title:"Practical automation",subtitle:"Reduce repetitive administration without breaking operations.",phase:"Operations",stages:["setup","launch","operating","scaling"],
 intro:"Automation should solve a recurring problem. If a simple checklist works better, use the checklist.",
 steps:[
 {title:"Find repetitive work",why:"You should automate a measurable problem.",do:"List tasks, frequency, owner, errors, cost and what would happen if a system failed.",output:"Ranked automation opportunity list.",prompt:"Give me an automation audit worksheet for my business. Rank repetitive tasks by frequency, time saved, failure risk and implementation complexity."},
 {title:"Draw the workflow",why:"Undefined processes make fragile automations.",do:"Write the trigger, data inputs, action, owner, exception handling and success check.",output:"One-page workflow map.",prompt:"Map this process into trigger, input, action, approval, error route, fallback and success test. Recommend the simplest viable tool."},
 {title:"Choose a sensible tool",why:"Complex tools are not always necessary.",do:"Compare existing software features, basic rules, n8n, Zapier and AI assistance only when the task calls for it.",output:"Tool selection and estimated ongoing cost.",prompt:"Compare a manual workflow, built-in software feature, basic automation and AI-enhanced option for my task, including realistic operating risks."},
 {title:"Test edge cases",why:"Automations break outside perfect demos.",do:"Test duplicates, invalid data, timeouts, missed messages and handoff to a human.",output:"Automation test checklist.",prompt:"Create a failure and acceptance test plan for my workflow, including duplication, permissions, recovery and human escalation."},
 {title:"Launch with control",why:"Operational mistakes are expensive.",do:"Start with a small group, record errors, document how to turn it off and measure the improvement.",output:"Controlled automation rollout checklist.",prompt:"Produce a small-scale rollout plan for my workflow with owner, alerts, fallback, tracking and measurable value."}
]
},
{
 id:"opportunities",number:"08",title:"Grants & business opportunities",subtitle:"Build a repeatable funding and opportunity search habit.",phase:"Growth",stages:["idea","planning","setup","launch","operating","scaling"],
 intro:"Keep a disciplined list of opportunities relevant to your actual business. Listings must be checked at the original source.",
 steps:[
 {title:"Define what you're eligible for",why:"Matching beats scrolling through every grant.",do:"Record business location, industry, ownership, stage, team size, needs and entity status.",output:"Opportunity eligibility profile.",prompt:"Build a grants and business-opportunity eligibility profile for my business, highlighting details I need to verify."},
 {title:"Choose credible sources",why:"Aggregators can be outdated.",do:"Bookmark official grant programs, accelerators, government procurement sources, chambers and industry bodies.",output:"Source watchlist with URLs.",prompt:"Give me a research checklist for finding official grants, procurement tenders and accelerator calls relevant to my industry and location. Do not invent open programs."},
 {title:"Screen each opportunity",why:"Not every headline deserves an application.",do:"Check official deadline, country rules, stage, required documents, funding type and restrictions.",output:"Go / no-go opportunity sheet.",prompt:"Create a practical grant or tender screening matrix with source URL, eligibility, current status, deadline, requirements and opportunity fit."},
 {title:"Build an application pack",why:"Good applications reuse accurate documents.",do:"Prepare business summary, pitch, financial records, registration documents and supporting evidence.",output:"Ready-to-update application folder checklist.",prompt:"Create a master document checklist for grant and procurement applications, with notes on which information must be updated per call."},
 {title:"Conduct a weekly opportunity review",why:"Deadlines are missed when checking is sporadic.",do:"Each week review sources, shortlist credible opportunities and assign next actions or application owners.",output:"Weekly opportunity report template.",prompt:"Design a weekly grant, tender and accelerator report with source links, verified deadlines, eligibility reasoning and next actions. Leave unverified listings clearly marked."}
]
},
{
 id:"website",number:"09",title:"Website & customer journey",subtitle:"Make the digital experience easy to understand and act on.",phase:"Launch",stages:["setup","launch","operating","scaling"],
 intro:"A site should answer three questions quickly: what is offered, why should I trust it, and how do I start?",
 steps:[
 {title:"Choose the site's one main job",why:"Too many competing calls to action confuse visitors.",do:"Decide if visitors should book, buy, call, inquire or request a quote.",output:"Primary conversion goal.",prompt:"Write a conversion-first website brief for my business with one primary CTA and the supporting information visitors need."},
 {title:"Build the page structure",why:"Navigation should follow customer questions.",do:"Plan home, service or product details, proof, process, FAQs, contact and appropriate policies.",output:"Sitemap and content outline.",prompt:"Suggest a simple mobile-first sitemap and section structure for this business, using benefits before technical details."},
 {title:"Prepare real assets",why:"Trust comes from actual proof.",do:"Gather business photos, genuine credentials, service details, operating hours, accurate pricing and booking links.",output:"Content and asset checklist.",prompt:"Give me a page-by-page asset and copy checklist. Do not invent testimonials or claim work that cannot be verified."},
 {title:"Check the conversion path",why:"A beautiful site is useless if the visitor cannot complete the action.",do:"Test mobile navigation, booking or enquiry, payment where applicable, links, accessibility and page loading.",output:"Launch QA checklist.",prompt:"Create a website acceptance checklist for mobile usability, real links, forms, SEO essentials, accessibility and conversion."}
]
},
{
 id:"weekly",number:"10",title:"Weekly founder review",subtitle:"Turn activity into accountability and deliberate next steps.",phase:"Operations",stages:["planning","setup","launch","operating","scaling"],
 intro:"A good weekly report shows what changed, what matters, what slipped and the next action. Automatic emails are a later integration; this module is a repeatable manual workflow.",
 steps:[
 {title:"Collect the real numbers",why:"Memory makes bad reporting.",do:"Record relevant weekly leads, sales, expenses, bookings, conversion, completed tasks or project milestones.",output:"Weekly actuals snapshot.",prompt:"Create a weekly performance worksheet for my business with fields for real metrics, previous-week comparison and missing-data flags."},
 {title:"Review what changed",why:"Numbers without causes are noise.",do:"Note wins, issues, customer feedback, supplier changes and opportunities, with supporting information.",output:"What changed / why it matters log.",prompt:"Create a weekly business-review format: what happened, why it matters, known causes, unknown causes and evidence needed."},
 {title:"Check the opportunity watchlist",why:"Growth channels and funding change over time.",do:"Review relevant grants, procurement, partnership leads and deadlines from official sources.",output:"Actionable opportunity roundup.",prompt:"Give me a weekly opportunity review template with verified sources, fit, deadlines, owner and next action."},
 {title:"Choose three next actions",why:"A long report needs a short decision.",do:"Pick the three highest-value tasks with owners, due dates and clear completion criteria.",output:"Next-week commitments.",prompt:"Turn this week's factual results into a priority table with three actions, expected result, owner, deadline and dependency."}
]
}
];
export const getPlaybook=id=>PLAYBOOKS.find(p=>p.id===id)||null;
export const stepKey=(id,i)=>"pb:"+id+":"+i;
export function playbookProgress(tasks={},playbook){
 const total=playbook.steps.length;
 const complete=playbook.steps.filter((_,i)=>tasks[stepKey(playbook.id,i)]===true).length;
 return {complete,total,percent:Math.round(complete*100/total)};
}
export function orderedPlaybooks(business){
 const stage=business?.stage||"idea";
 const preferred={validate:"ideation",customers:"marketing",funding:"opportunities",finance:"planning",digital:"social",operations:"automations"}[business?.goal];
 return [...PLAYBOOKS].sort((a,b)=>{
  const points=x=>(x.id===preferred?4:0)+(x.stages.includes(stage)?2:0);
  return points(b)-points(a)||Number(a.number)-Number(b.number);
 });
}
export function stepPrompt(playbook,step,business={}){
 return [
  "I am following a guided business-building playbook. Help me complete this specific step. Do not make decisions for me, invent facts, or assume I have completed missing work.",
  "Business: "+(business.name||"[name not yet provided]"),
  "Industry: "+(business.industry||"[industry not yet provided]"),
  "Business stage: "+(business.stage||"[stage not yet provided]"),
  "Location: "+(business.location||"[location not yet provided]"),
  "What we do: "+(business.summary||"[not yet documented]"),
  "Step: "+step.title,
  "Task: "+step.do,
  "Expected deliverable: "+step.output,
  "Prompt: "+step.prompt
 ].join("\n");
}
