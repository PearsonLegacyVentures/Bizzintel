import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { PLAYBOOKS } from "../src/playbooks.js";
import { PATH,ALL_STEPS,stepHref,phaseHref,nextStep,previousStep } from "../src/method.js";
import { createMethodPages } from "./method-render.mjs";

const OUT="dist";
const SITE=(process.env.SITE_URL||"").trim().replace(/\/+$/,"");
const BASE=SITE && /^https:\/\/[^\s/]+/.test(SITE) ? SITE : "";
const published=process.env.PUBLIC_INDEXING==="true";
const total=PLAYBOOKS.reduce((sum,p)=>sum+p.steps.length,0);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url=p=>BASE?BASE+p:undefined;
const canonical=p=>BASE?'<link rel="canonical" href="'+esc(url(p))+'">':"";
const ld=obj=>'<script type="application/ld+json">'+JSON.stringify(obj).replace(/</g,"\\u003c")+'</script>';
const titleFor=s=>s.replace(/^\d\d\s*\/\s*/,"");
const stageLabels={idea:"Exploring",planning:"Planning",setup:"Setting up",launch:"Launching",operating:"Operating",scaling:"Scaling"};
const categories=[
{id:"start",label:"Getting started",description:"Find a problem, test demand and make the numbers work.",modules:["ideation","planning"]},
{id:"visible",label:"Get your business online",description:"Build the pages, profiles and content your customers need.",modules:["social","gbp","website","marketing"]},
{id:"grow",label:"Pitch, operate & grow",description:"Make your business easier to run and prepare for opportunities.",modules:["pitch","automations","opportunities","weekly"]}
];
const resources=[
{title:"Bahamas Chamber of Commerce and Employers’ Confederation",detail:"Official business events, networking, advocacy and membership information.",group:"Business networks",url:"https://www.thebahamaschamber.com/"},
{title:"Toastmasters — Find a Club",detail:"Find a local or online club to practice pitches, speaking and leadership. Not a funding programme.",group:"Business networks",url:"https://www.toastmasters.org/find-a-club"},
{title:"Google Search Central — SEO Starter Guide",detail:"Official technical and content basics for discoverable websites.",group:"Online visibility",url:"https://developers.google.com/search/docs/fundamentals/seo-starter-guide"},
{title:"Google Ads — Campaign types",detail:"Compare search, video and other ad types for business goals.",group:"Online visibility",url:"https://support.google.com/google-ads/answer/2567043?hl=en"},
{title:"Bahamas Department of Inland Revenue",detail:"Official business licence rules, application guidance and updates.",group:"Registration & compliance",url:"https://inlandrevenue.finance.gov.bs/business-licence/"},
{title:"National Insurance Board — Employers",detail:"Employer registration guidance and contribution information.",group:"Registration & compliance",url:"https://www.nib-bahamas.com/_m1758/Employers"},
{title:"National Insurance Board — Online Portals",detail:"Official online services, including Employer Self Service.",group:"Registration & compliance",url:"https://www.nib-bahamas.com/portals"},
{title:"Small Business Development Centre Bahamas",detail:"Business mentoring, training and access-to-capital programmes. Check current criteria.",group:"Funding & support",url:"https://sbdcbahamas.com/"},
{title:"Google Business Profile eligibility",detail:"Confirm that your business qualifies before creating a listing.",group:"Online visibility",url:"https://support.google.com/business/answer/13763036?hl=en"},
{title:"Google Business Profile representation rules",detail:"Official policies for names, addresses, categories and customer-facing details.",group:"Online visibility",url:"https://support.google.com/business/answer/3038177?hl=en"},
{title:"Meta Business Help Center",detail:"Official help for Facebook, Instagram and Meta business features.",group:"Online visibility",url:"https://www.facebook.com/business/help"},
{title:"LinkedIn Help",detail:"Official setup and management guidance for professional profiles and Pages.",group:"Online visibility",url:"https://www.linkedin.com/help/linkedin"}
];
const html=(tag,attrs,content)=>'<'+tag+attrs+'>'+content+'</'+tag+'>';
const link=(href,text,cls)=>'<a href="'+esc(href)+'"'+(cls?' class="'+cls+'"':'')+'>'+text+'</a>';
const mark='<span class="logo-box" aria-hidden="true">b<span>.</span></span><span class="logo-type">bizz<span>intel</span><span class="dot">.</span></span>';
const icons={arrow:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13m-6-6 6 6-6 6"/></svg>',arrowup:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19 19 5M9 5h10v10"/></svg>',search:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>'};
const navItems=[["/method/","The Method"],["/guides/","Deep dives"],["/resources/","Resources"],["/about/","About"]];
function layout({path,heading,description,body,type="website",schema}){
 const fullTitle=heading==="BizzIntel"?"BizzIntel — Practical business guides":heading+" | BizzIntel";
 const metadata=ld(schema||{"@context":"https://schema.org","@type":type==="article"?"Article":"WebPage","name":heading,"description":description,"url":url(path)});
 const nav='<header class="site-header"><div class="wrap nav-wrap">'+link("/",mark,"brand")+
  '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="main-navigation" aria-label="Open navigation"><span></span><span></span></button>'+
  '<nav id="main-navigation" class="nav-links" aria-label="Main navigation">'+navItems.map(([href,text])=>link(href,esc(text),path===href?"active":"")).join("")+'</nav>'+
  '<a href="/method/" class="top-action">Start the method '+icons.arrow+'</a></div></header>';

 const desktop='<div class="retro-desktop-shortcuts" aria-label="Desktop shortcuts">'+
 '<a href="/" class="retro-shortcut"><span class="retro-icon retro-computer" aria-hidden="true"><span></span></span><span>BizzIntel</span></a>'+
 '<a href="/method/" class="retro-shortcut"><span class="retro-icon retro-folder" aria-hidden="true"></span><span>Start Here</span></a>'+
 '<a href="/guides/" class="retro-shortcut"><span class="retro-icon retro-document" aria-hidden="true"></span><span>Guides</span></a>'+
 '<a href="/resources/" class="retro-shortcut"><span class="retro-icon retro-folder" aria-hidden="true"></span><span>Resources</span></a></div>';
 const chrome='<div class="retro-titlebar"><span class="retro-titlebar-name"><span class="retro-title-icon" aria-hidden="true">BI</span>BizzIntel — '+esc(heading)+'</span>'+
 '<div class="retro-window-controls"><button type="button" data-window-minimize aria-label="Minimize BizzIntel window" title="Minimize">_</button>'+
 '<button type="button" data-window-maximize aria-label="Maximize BizzIntel window" title="Maximize">□</button>'+
 '<button type="button" data-window-close aria-label="Close BizzIntel window" title="Close">×</button></div></div>'+
 '<nav class="retro-menu-bar" aria-label="Window menu"><a href="/">File</a><a href="/method/">Method</a><a href="/guides/">Guides</a><a href="/resources/">Resources</a><a href="/about/">Help</a></nav>'+
 '<div class="retro-location-bar"><span>Address</span><span class="retro-location-field"><span class="retro-mini-icon" aria-hidden="true">▣</span> C:\\BizzIntel'+esc(path.replaceAll("/", "\\"))+'</span>'+
 '<a href="/method/" class="retro-go" title="Open the learning method">Go ↗</a></div>';
 const startMenu='<nav class="retro-start-menu" id="retro-start-menu" hidden aria-label="Start menu">'+
 '<div class="retro-start-rail" aria-hidden="true">BizzIntel<span>98</span></div>'+
 '<div class="retro-start-items"><a href="/"><span class="retro-menu-symbol">▣</span>Desktop <b>›</b></a>'+
 '<a href="/method/capture/project/"><span class="retro-menu-symbol">✎</span>Start the business method <b>›</b></a>'+
 '<a href="/method/"><span class="retro-menu-symbol">▤</span>All 8 phases <b>›</b></a>'+
 '<a href="/guides/"><span class="retro-menu-symbol">▧</span>Guides <b>›</b></a>'+
 '<a href="/resources/"><span class="retro-menu-symbol">▣</span>Resources <b>›</b></a>'+
 '<div class="retro-start-separator"></div><a href="/about/"><span class="retro-menu-symbol">ⓘ</span>About BizzIntel</a></div></nav>';
 const taskbar='<div class="retro-taskbar" role="toolbar" aria-label="Desktop taskbar">'+
 '<button type="button" id="retro-start-button" class="retro-start-button" aria-expanded="false" aria-controls="retro-start-menu"><span class="retro-start-mark" aria-hidden="true">▦</span><strong>Start</strong></button>'+
 '<button type="button" class="retro-task-window" data-window-restore title="Show BizzIntel"><span class="retro-tiny-application" aria-hidden="true">BI</span><span>BizzIntel — Business Builder</span></button>'+
 '<div class="retro-task-clock" id="retro-task-clock" aria-label="Your device local time">--:--</div></div>';
 const footer='<footer class="site-footer"><div class="wrap footer-main"><div class="footer-brand">'+mark+
  '<p>Plain-language guides to help you turn an idea into a real business and keep improving it.</p></div>'+
  '<div class="footer-links"><div><strong>Learn</strong>'+link("/method/","Follow the method")+link("/start-here/","Choose your stage")+link("/guides/","Deep-dive guides")+link("/resources/","Useful resources")+'</div>'+
  '<div><strong>About</strong>'+link("/about/","Our approach")+link("https://bahamasaisolutions.com/","Bahamas AI Solutions")+'</div></div></div>'+
  '<div class="wrap footer-bottom"><span>© '+new Date().getUTCFullYear()+' BizzIntel · A Bahamas AI Solutions project</span><span>Learn the process. Do the work.</span></div></footer>';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="theme-color" content="#008080"><meta name="description" content="'+esc(description)+'">'+
  '<meta name="robots" content="'+(published?"index,follow":"noindex,nofollow")+'">'+
  '<meta property="og:type" content="'+(type==="article"?"article":"website")+'"><meta property="og:title" content="'+esc(fullTitle)+'">'+
  '<meta property="og:description" content="'+esc(description)+'"><meta property="og:site_name" content="BizzIntel">'+
  '<title>'+esc(fullTitle)+'</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/styles.css">'+
  canonical(path)+metadata+'</head><body class="retro-theme"><a class="skip-link" href="#main">Skip to content</a>'+
 desktop+'<div class="retro-window" id="retro-main-window">'+chrome+nav+'<main id="main">'+body+'</main>'+footer+
 '<div class="retro-statusbar"><span>Ready · BizzIntel Business Learning</span><span>8 phases · 32 actions</span></div></div>'+
 startMenu+taskbar+'<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>'+
 '<script defer src="/site.js"></script></body></html>';
}
const label=(text,variant="")=>'<span class="eyebrow '+variant+'">'+esc(text)+'</span>';
const btn=(href,text,kind="primary")=>link(href,esc(text)+icons.arrow,"button "+kind);
const kicker=(step,extra="")=>'<div class="section-kicker"><span>'+esc(step)+'</span><span>'+esc(extra)+'</span></div>';
const number=n=>String(n).padStart(2,"0");
function guideCard(p,variant=""){
 const count=p.steps.length;
 const tags=p.stages.map(id=>stageLabels[id]||id).join(" · ");
 const searchable=[p.title,p.subtitle,p.intro,...p.steps.map(x=>x.title)].join(" ").toLowerCase();
 return '<article class="guide-card '+variant+'" data-search="'+esc(searchable)+'" data-stages="'+esc(p.stages.join(" "))+'">'+
  '<div class="guide-card-top">'+label("GUIDE "+p.number)+'<span class="guide-card-number">'+p.number+'</span></div>'+
  '<h3>'+link("/guides/"+p.id+"/",esc(titleFor(p.title)))+'</h3><p>'+esc(p.subtitle)+'</p>'+
  '<div class="guide-card-footer"><span>'+count+' practical lessons</span>'+link("/guides/"+p.id+"/","Read guide "+icons.arrow,"text-link")+'</div></article>';
}
function categoryCards(pick){return pick.map(p=>guideCard(p)).join("")}
function stageControl(){
 return '<div class="stage-selector" role="group" aria-label="Filter by your current business stage">'+
  '<button type="button" data-stage="all" aria-pressed="true">All stages</button>'+
  Object.entries(stageLabels).map(([id,text])=>'<button type="button" data-stage="'+id+'" aria-pressed="false">'+esc(text)+'</button>').join("")+
  '</div>';
}
function featured(){
 return '<section class="feature-band"><div class="feature-copy">'+label("FEATURED / START HERE")+
  '<h2>Before you spend money, answer these questions.</h2>'+
  '<p>Most early mistakes start with building too much before checking whether customers care. Work through the basics before committing to equipment, an app or a big ad budget.</p>'+
  link("/guides/ideation/","Read the idea validation guide "+icons.arrow,"inline-link")+'</div>'+
  '<div class="question-list" aria-label="Essential questions">'+[
  "What specific problem are you solving?","Who is bothered by it enough to act?","What do they use instead?","What is the smallest honest test?","Can the numbers work?"
  ].map((s,i)=>'<div><span>'+number(i+1)+'</span><p>'+esc(s)+'</p></div>').join("")+'</div></section>';
}
function home(){
 const intro='<section class="method-home-hero"><div class="wrap method-home-grid"><div class="method-home-copy">'+label("THE ACTUAL PROCESS · NOT MORE BUSINESS THEORY")+
 '<h1>Here is how<br>I would build<br><em>a business.</em></h1>'+
 '<p>Start with an idea. Use ChatGPT to capture the full story. Research competitors worldwide, across the Caribbean and locally. See the business before building it. Prove the money works. Then launch the website, systems and customer channels.</p>'+
 '<div class="hero-actions">'+btn("/method/capture/project/","Start at step 01")+btn("/method/","View the entire method","secondary")+'</div>'+
 '<div class="method-home-proof"><span>8 PHASES</span><span>'+ALL_STEPS.length+' ACTIONABLE STEPS</span><span>NO LOGIN REQUIRED</span></div></div>'+
 '<div class="method-home-plan"><div class="method-home-plan-head"><span>BIZZINTEL / THE METHOD</span><span>ROADMAP 001</span></div>'+
 '<div class="method-home-plan-title">Your first<br>four moves.</div>'+
 '<ol>'+PATH[0].steps.map((s,i)=>'<li><span>'+String(i+1).padStart(2,"0")+'</span><a href="/method/capture/'+esc(s.id)+'/">'+esc(s.title)+' '+icons.arrow+'</a></li>').join("")+'</ol>'+
 '<a href="/method/capture/project/" class="method-home-plan-link">Get the first action '+icons.arrow+'</a></div></div></section>';
 const starter='<section class="method-home-start"><div class="wrap"><div class="section-heading"><div>'+label("START WHERE YOU ARE")+
 '<h2>Pick your current position.</h2><p>Every phase is available. Start with the one that solves your immediate problem.</p></div></div>'+
 '<div class="method-start-cards">'+[
  ["I'm working on an idea","Put the full story into ChatGPT, set the rules and test whether people need it.","/method/capture/project/","01"],
  ["I need to look professional","Choose the name, domain, SEO, business profiles and a website that works.","/method/presence/","05"],
  ["I need more customers","Choose the right ads, build partner channels and track actual bookings.","/method/customers/","07"]
 ].map(x=>'<a href="'+x[2]+'" class="method-start-card"><span>'+x[3]+' / ENTRY POINT</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><b>'+icons.arrow+'</b></a>').join("")+'</div></div></section>';
 const journey='<section class="method-home-journey"><div class="wrap"><div class="section-heading"><div>'+label("THE FULL PLAYBOOK")+
 '<h2>Follow the sequence. Skip the guesswork.</h2><p>Eight decisions to make, with specific instructions and real outputs—not a wall of generic advice.</p></div>'+
 link("/method/","Explore the complete path "+icons.arrow,"inline-link")+'</div>'+
 '<div class="method-home-list">'+PATH.map((p,i)=>'<a href="/method/'+p.id+'/" class="method-home-phase"><span>'+p.number+'</span><div><strong>'+esc(p.name)+'</strong><p>'+esc(p.result)+'</p></div><span class="method-home-phase-action">'+p.steps.length+' steps '+icons.arrow+'</span></a>').join("")+'</div></div></section>';
 const note='<section class="method-home-belief"><div class="wrap"><div>'+label("WHY IT WORKS")+
 '<h2>Use AI for the work.<br><em>Use judgment for the decisions.</em></h2>'+
 '<p>ChatGPT helps you write, compare, organize and prototype. It cannot replace real customer evidence, tested margins or safe operations. Every phase ends with a deliverable and a decision to make.</p></div>'+
 '<a class="button primary" href="/method/capture/project/">Create your first project '+icons.arrow+'</a></div></section>'+
 '<section class="founder-band"><div class="wrap founder-band-inner"><div>'+label("BUILT FROM REAL BUSINESS WORK")+
 '<h2>From Bahamas AI Solutions.</h2><p>A practical entrepreneurship learning resource shaped by Amar Pearson’s work across websites, service operations and digital products. Illustrative examples are not claims of customer results.</p></div>'+
 '<a href="https://bahamasaisolutions.com/" class="inline-link">About the founder '+icons.arrow+'</a></div></section>';
 return layout({path:"/",heading:"BizzIntel",description:"Follow Amar Pearson’s practical business-building method: ChatGPT Project setup, research, market testing, prototype website, financial feasibility, branding, SEO, secure site, customer ads, partnerships and scaling.",body:intro+starter+journey+note});
}
function guidesIndex(){
 const intro='<section class="page-top"><div class="wrap">'+label("THE COMPLETE GUIDE LIBRARY")+
  '<h1>Practical lessons.<br><em>Every stage of business.</em></h1>'+
  '<p>Choose what you want to learn. No sign-up or wizard required. Each guide includes real instructions, worked examples and a clear takeaway.</p>'+
  '<div class="search-wrap">'+icons.search+'<input type="search" id="guide-search" aria-label="Search business guides" placeholder="Search guides, topics, or what you need help with…" autocomplete="off"><button id="clear-search" hidden type="button">Clear</button></div>'+
  stageControl()+'<p class="filter-count" id="filter-count" aria-live="polite">Showing all '+PLAYBOOKS.length+' guides</p></div></section>';
 const groups=categories.map(cat=>'<section class="guide-category" data-category="'+cat.id+'"><div class="wrap">'+
  '<div class="category-heading"><div>'+label(cat.label)+'<h2>'+cat.label+'</h2><p>'+cat.description+'</p></div></div>'+
  '<div class="guide-grid">'+categoryCards(cat.modules.map(id=>PLAYBOOKS.find(p=>p.id===id)).filter(Boolean))+'</div></div></section>').join("");
 return layout({path:"/guides/",heading:"Business guides",description:"Browse ten free, practical business guides for ideas, planning, social media, marketing, pitching, Google visibility, operations and opportunities.",body:intro+groups+'<section class="empty-results" id="no-results" hidden><div class="wrap"><h2>No guides found.</h2><p>Try a different keyword or choose All stages.</p></div></section>'});
}
function guidePage(p){
 const route="/guides/"+p.id+"/";
 const heading=titleFor(p.title);
 const articleSchema={"@context":"https://schema.org","@type":"Article",headline:heading,description:p.subtitle,author:{"@type":"Organization",name:"Bahamas AI Solutions"},publisher:{"@type":"Organization",name:"Bahamas AI Solutions"},mainEntityOfPage:url(route),isAccessibleForFree:true};
 const toc='<aside class="toc" aria-label="On this page"><div class="toc-inner"><span class="toc-label">IN THIS GUIDE</span>'+
  '<ol>'+p.steps.map((s,i)=>'<li><a href="#'+esc(s.id)+'"><span>'+number(i+1)+'</span>'+esc(s.title)+'</a></li>').join("")+'</ol>'+
  '<button type="button" class="copy-checklist">'+icons.arrowup+' Copy checklist</button>'+
  '<p>Use these steps as a starting point; adapt them to your actual market.</p></div></aside>';
 const sections=p.steps.map((s,i)=>{
  const linkRef=(s.links||[]).filter(r=>/^https:\/\/\S+$/.test(r.url)).map(r=>'<a class="source-link" href="'+esc(r.url)+'" rel="noopener noreferrer" target="_blank">'+esc(r.title)+' ↗</a>').join("");
  return '<section class="lesson" id="'+esc(s.id)+'" data-lesson="'+esc(s.id)+'">'+
   '<div class="lesson-number"><span>LESSON '+number(i+1)+' / '+number(p.steps.length)+'</span><span class="lesson-rule"></span></div>'+
   '<h2>'+esc(s.title)+'</h2><p class="lesson-why">'+esc(s.why)+'</p>'+
   '<div class="lesson-main"><h3>What to do</h3><ol class="action-list">'+(s.how||[s.do]).map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol></div>'+
   '<div class="lesson-pair"><div class="example"><span>EXAMPLE / ILLUSTRATIVE</span><p>'+esc(s.example||"Use a real example from your business.")+'</p></div>'+
   '<div class="mistake"><span>AVOID THIS</span><p>'+esc(s.avoid||"Treating assumptions as proven results.")+'</p></div></div>'+
   '<div class="takeaway"><span class="takeaway-icon">↗</span><div><strong>What you should finish with</strong><p>'+esc(s.output)+'</p>'+
   (s.evidence?'<small>Evidence to capture: '+esc(s.evidence)+'</small>':'')+'</div></div>'+
   (linkRef?'<div class="lesson-sources"><span>OFFICIAL REFERENCE</span>'+linkRef+'</div>':'')+
   '<details class="prompt-optional"><summary>Optional: copy a ChatGPT prompt <span>＋</span></summary><div><p>The lesson does not need AI. This prompt is only a writing aid.</p>'+
   '<pre id="prompt-'+esc(p.id)+'-'+number(i+1)+'">'+esc(s.prompt||"Help me complete this business lesson, asking for missing information.")+'</pre>'+
   '<button type="button" class="copy-prompt" data-copy="prompt-'+esc(p.id)+'-'+number(i+1)+'">Copy prompt</button></div></details>'+
   '</section>';
 }).join("");
 const next=PLAYBOOKS[(PLAYBOOKS.findIndex(item=>item.id===p.id)+1)%PLAYBOOKS.length];
 const intro='<section class="article-head"><div class="wrap">'+
  '<div class="breadcrumb">'+link("/guides/","All guides")+' <span>/</span> '+esc(heading)+'</div>'+
  '<div class="article-head-inner"><div>'+label("FREE BUSINESS GUIDE / "+p.number)+
  '<h1>'+esc(heading)+'</h1><p>'+esc(p.intro)+'</p>'+
  '<div class="article-meta"><span>'+p.steps.length+' lessons</span><i></i><span>Step-by-step tutorial</span><i></i><span>No account needed</span></div>'+
  '<div class="article-actions"><a href="#lesson-start" class="button primary">Start reading '+icons.arrow+'</a><button type="button" class="button secondary copy-checklist">Copy checklist '+icons.arrowup+'</button></div></div>'+
  '<div class="article-cover" aria-hidden="true"><div class="cover-grid"></div><span>THE FIELD GUIDE / '+p.number+'</span>'+
  '<div class="cover-symbol">'+p.number+'</div><strong>'+esc(heading)+'</strong><span class="cover-bottom">BIZZINTEL · KEEP BUILDING</span></div></div></div></section>';
 const bottom='<div class="article-bottom">'+label("WHAT'S NEXT")+'<h2>Keep moving. Keep it practical.</h2><p>The next guide builds on the work you have already done.</p>'+
  link("/guides/"+next.id+"/",esc(titleFor(next.title))+icons.arrow,"next-guide")+'<div>'+link("/guides/","← Return to the guide library","muted-link")+'</div></div>';
 return layout({path:route,heading,description:p.subtitle+" Free step-by-step BizzIntel guide.",type:"article",schema:articleSchema,body:intro+
 '<div class="wrap article-layout"><div class="article-content" id="lesson-start">'+
 '<div class="before-reading"><strong>How to use this guide</strong><p>Read one lesson, complete the action in your business, and keep the result somewhere you can find it. The examples are illustrations, not claims about real customers.</p></div>'+
 sections+bottom+'</div>'+toc+'</div>'});
}
function startHere(){
 const cards=[
  {title:"I just have an idea",desc:"Set up the ChatGPT Project, tell the full story and build your quality standards.",href:"/method/capture/project/",tag:"FIRST STEP"},
  {title:"I need to know if it will work",desc:"Compare global, Caribbean and local competitors and test demand.",href:"/method/research/",tag:"MARKET TEST"},
  {title:"I need a website to show the concept",desc:"Sketch the offer and create a shareable visual preview before building the full business.",href:"/method/visualize/",tag:"PROTOTYPE"},
  {title:"I need to know if it makes money",desc:"Calculate real margins, funding fit, national impact and expansion potential.",href:"/method/economics/",tag:"FEASIBILITY"},
  {title:"I'm ready to look professional",desc:"Set up name, domain, SEO, Google Business Profile where eligible and useful social accounts.",href:"/method/presence/",tag:"DIGITAL SETUP"},
  {title:"I need a real website and CRM",desc:"Build only the features you need, then test SEO, security and lead workflows.",href:"/method/website/",tag:"SYSTEMS"},
  {title:"I need customers and partners",desc:"Choose Google or Meta based on intent, make one measured campaign and approach partners.",href:"/method/customers/",tag:"ACQUISITION"},
  {title:"I'm expanding",desc:"Review operations, automate bottlenecks and test one new market or channel.",href:"/method/grow/",tag:"GROWTH"}
 ];
 const content='<section class="page-top"><div class="wrap">'+label("NO QUIZ / NO LOGIN / JUST THE NEXT RIGHT STEP")+
 '<h1>Where are you<br><em>in the process?</em></h1>'+
 '<p>Choose your immediate situation and open the relevant phase. You will see exactly what to do, what prompt to use and what your result should be.</p></div></section>'+
 '<section class="method-stage-entry"><div class="wrap"><div class="method-stage-grid">'+cards.map(c=>'<a href="'+c.href+'" class="method-stage-card">'+
 '<span>'+esc(c.tag)+'</span><h2>'+esc(c.title)+'</h2><p>'+esc(c.desc)+'</p><strong>Open this step '+icons.arrow+'</strong></a>').join("")+
 '</div><div class="method-stage-footer">'+link("/method/","See the whole method "+icons.arrow,"inline-link")+'</div></div></section>';
 return layout({path:"/start-here/",heading:"Find your next step",description:"Find the exact action to take in the BizzIntel Method for your current business situation, from idea to growth.",body:content});
}
function resourcesPage(){
 const blocks=[...new Set(resources.map(x=>x.group))].map(group=>'<section class="resource-group"><h2>'+esc(group)+'</h2><div class="resource-list">'+
 resources.filter(x=>x.group===group).map(x=>'<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" class="resource-card"><div>'+
 '<strong>'+esc(x.title)+'</strong><p>'+esc(x.detail)+'</p><small>'+esc(new URL(x.url).hostname)+'</small></div><span>'+icons.arrowup+'</span></a>').join("")+'</div></section>').join("");
 const content='<section class="page-top"><div class="wrap">'+label("TRUSTED STARTING POINTS")+
 '<h1>Useful links.<br><em>Not guesswork.</em></h1><p>Business rules, platform features and funding programmes can change. Use these official sources to verify details before making decisions.</p></div></section>'+
 '<div class="wrap resource-content"><div class="resource-alert"><strong>Important</strong><p>These are reference links, not confirmation that your business qualifies for any funding, licence, Google listing or programme. Check the current requirements directly.</p></div>'+blocks+'</div>';
 return layout({path:"/resources/",heading:"Official business resources",description:"Official Bahamas business licensing, National Insurance, Small Business Development Centre and Google Business Profile resources.",body:content});
}
function aboutPage(){
 const content='<section class="page-top"><div class="wrap">'+label("WHY BIZZINTEL EXISTS")+
 '<h1>Less business advice.<br><em>More useful instructions.</em></h1>'+
 '<p>BizzIntel helps people understand the real steps involved in building a business. It is about learning a process and doing the work—not generating another generic plan.</p></div></section>'+
 '<section class="section"><div class="wrap about-grid"><div>'+label("OUR APPROACH")+'<h2>Built from an operator\'s perspective.</h2>'+
 '<p>BizzIntel is a project from Bahamas AI Solutions, founded by Amar Pearson. The lessons reflect practical subjects explored through building and operating ventures: testing demand, planning finances, creating a digital presence, reaching customers, and improving day-to-day operations.</p>'+
 '<p>Individual examples are labeled as illustrations; we do not present draft exercises as independently proven results.</p>'+
 '<div class="about-actions">'+btn("/start-here/","Start learning")+link("https://bahamasaisolutions.com/","About Bahamas AI Solutions "+icons.arrowup,"inline-link")+'</div></div>'+
 '<div class="about-values"><div><span>01</span><h3>Start with the customer</h3><p>Understand the problem before investing in the solution.</p></div>'+
 '<div><span>02</span><h3>Make the numbers work</h3><p>Real costs, real constraints and clear assumptions.</p></div>'+
 '<div><span>03</span><h3>Build what you can test</h3><p>A practical first version beats an expensive hypothetical one.</p></div>'+
 '<div><span>04</span><h3>Keep improving</h3><p>Use actual customer and business results to choose the next step.</p></div></div></div></section>';
 return layout({path:"/about/",heading:"About BizzIntel",description:"Why BizzIntel publishes practical business guides for Bahamian and Caribbean entrepreneurs, by Bahamas AI Solutions.",body:content});
}
const methodPages=createMethodPages({PATH,ALL_STEPS,stepHref,phaseHref,nextStep,previousStep,layout,esc,label,link,icons});
async function emit(path,content){
 const where=OUT+(path==="/"?"/index.html":path+"index.html");
 await mkdir(where.slice(0,where.lastIndexOf("/")),{recursive:true});
 await writeFile(where,content,"utf8");
}
await rm(OUT,{recursive:true,force:true});
await mkdir(OUT,{recursive:true});
for(const asset of ["styles.css","site.js","favicon.svg","_headers"])await copyFile(asset,OUT+"/"+asset);
await emit("/",home());
await emit("/guides/",guidesIndex());
await emit("/start-here/",startHere());
await emit("/resources/",resourcesPage());
await emit("/about/",aboutPage());
await emit("/method/",methodPages.index());
for(const phase of PATH){await emit(phaseHref(phase),methodPages.phasePage(phase));for(const [index,step] of phase.steps.entries())await emit(stepHref({...step,phaseId:phase.id}),methodPages.stepPage(phase,step,index));}
for(const p of PLAYBOOKS)await emit("/guides/"+p.id+"/",guidePage(p));
const routes=["/","/guides/","/start-here/","/resources/","/about/",...PLAYBOOKS.map(p=>"/guides/"+p.id+"/"),"/method/",...PATH.map(phaseHref),...ALL_STEPS.map(stepHref)];
await writeFile(OUT+"/robots.txt",published?"User-agent: *\nAllow: /\n"+(BASE?"Sitemap: "+BASE+"/sitemap.xml\n":""):"User-agent: *\nDisallow: /\n");
if(BASE&&published){
 await writeFile(OUT+"/sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>'+esc(BASE+p)+'</loc></url>').join("")+'</urlset>');
}
console.log("BizzIntel: built "+routes.length+" static pages, "+PATH.length+" method phases, "+ALL_STEPS.length+" actions, "+PLAYBOOKS.length+" reference guides. Indexing: "+(published?"enabled":"disabled pending review")+".");
