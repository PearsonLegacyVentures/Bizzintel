import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { PLAYBOOKS } from "../src/playbooks.js";

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
const navItems=[["/guides/","Guides"],["/start-here/","Start here"],["/resources/","Resources"],["/about/","About"]];
function layout({path,heading,description,body,type="website",schema}){
 const fullTitle=heading==="BizzIntel"?"BizzIntel — Practical business guides":heading+" | BizzIntel";
 const metadata=ld(schema||{"@context":"https://schema.org","@type":type==="article"?"Article":"WebPage","name":heading,"description":description,"url":url(path)});
 const nav='<header class="site-header"><div class="wrap nav-wrap">'+link("/",mark,"brand")+
  '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="main-navigation" aria-label="Open navigation"><span></span><span></span></button>'+
  '<nav id="main-navigation" class="nav-links" aria-label="Main navigation">'+navItems.map(([href,text])=>link(href,esc(text),path===href?"active":"")).join("")+'</nav>'+
  '<a href="/guides/" class="top-action">Explore guides '+icons.arrow+'</a></div></header>';
 const footer='<footer class="site-footer"><div class="wrap footer-main"><div class="footer-brand">'+mark+
  '<p>Plain-language guides to help you turn an idea into a real business and keep improving it.</p></div>'+
  '<div class="footer-links"><div><strong>Learn</strong>'+link("/start-here/","Start here")+link("/guides/","All guides")+link("/resources/","Useful resources")+'</div>'+
  '<div><strong>About</strong>'+link("/about/","Our approach")+link("https://bahamasaisolutions.com/","Bahamas AI Solutions")+'</div></div></div>'+
  '<div class="wrap footer-bottom"><span>© '+new Date().getUTCFullYear()+' BizzIntel · A Bahamas AI Solutions project</span><span>Learn the process. Do the work.</span></div></footer>';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="theme-color" content="#0b1114"><meta name="description" content="'+esc(description)+'">'+
  '<meta name="robots" content="'+(published?"index,follow":"noindex,nofollow")+'">'+
  '<meta property="og:type" content="'+(type==="article"?"article":"website")+'"><meta property="og:title" content="'+esc(fullTitle)+'">'+
  '<meta property="og:description" content="'+esc(description)+'"><meta property="og:site_name" content="BizzIntel">'+
  '<title>'+esc(fullTitle)+'</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/styles.css">'+
  canonical(path)+metadata+'</head><body><a class="skip-link" href="#main">Skip to content</a>'+nav+'<main id="main">'+body+'</main>'+footer+
  '<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div><script defer src="/site.js"></script></body></html>';
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
 const hero='<section class="hero"><div class="wrap hero-grid"><div class="hero-text">'+label("FOR PEOPLE BUILDING REAL BUSINESSES")+
  '<h1>Build a business.<br><em>One useful step<br>at a time.</em></h1>'+
  '<p class="hero-lead">From that first business idea to customers, marketing, systems and growth. Practical guides that show you what to do, how to do it, and what to finish with.</p>'+
  '<div class="hero-actions">'+btn("/start-here/","Show me where to start")+btn("/guides/","Browse every guide","secondary")+'</div>'+
  '<div class="hero-note"><span class="pulse-dot"></span>No login. No paywall. No AI telling you what to do.</div></div>'+
  '<div class="hero-visual" aria-label="Example three-stage learning journey"><div class="visual-grid"></div>'+
  '<div class="visual-top"><span class="mini-logo">B / FIELD NOTES</span><span>ISSUE 001</span></div>'+
  '<div class="visual-heading">A better way<br>to start.</div>'+
  '<div class="visual-subtitle">Start with the problem. Finish with evidence.</div>'+
  '<div class="visual-path">'+[
  ["01","UNDERSTAND","The customer problem"],
  ["02","TEST","Real interest and willingness to pay"],
  ["03","DECIDE","Build, refine or walk away"]
  ].map((x,i)=>'<div class="visual-step '+(i===1?"focus":"")+'"><span class="step-index">'+x[0]+'</span><div><small>'+x[1]+'</small><strong>'+x[2]+'</strong></div><span class="step-bullet">'+(i===2?"↗":"")+'</span></div>').join("")+'</div>'+
  '<div class="visual-bottom"><span>LESS THEORY.</span><span>MORE DOING.</span></div></div></div>'+
  '<div class="wrap hero-rail"><span>BUILT FOR FOUNDERS IN THE BAHAMAS & BEYOND</span><span>'+PLAYBOOKS.length+' GUIDES / '+total+' PRACTICAL LESSONS</span></div></section>';
 const path='<section class="section section-intro" id="path"><div class="wrap"><div class="section-heading">'+
  '<div>'+label("01 / FIND YOUR STARTING POINT")+'<h2>You do not need to start from zero.</h2><p>Pick where your business is today. We will surface relevant guides, but every lesson stays open.</p></div>'+
  link("/start-here/","View the full path "+icons.arrow,"inline-link")+'</div>'+
  '<div class="path-grid">'+[
  ["01","I have an idea","Figure out whether it is worth pursuing.","/start-here/#idea"],
  ["02","I am setting it up","Work through planning, digital presence and launch basics.","/start-here/#setup"],
  ["03","I am already operating","Improve marketing, money and repeatable systems.","/start-here/#operating"]
  ].map(x=>'<a class="path-card" href="'+x[3]+'"><span>'+x[0]+' / YOUR STAGE</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p><b>'+icons.arrow+'</b></a>').join("")+'</div></div></section>';
 const guides='<section class="section section-guides"><div class="wrap"><div class="section-heading">'+
  '<div>'+label("02 / THE LIBRARY")+'<h2>Find the business lesson you need.</h2><p>Plain-English instructions, examples, mistakes to avoid, and something useful to finish with.</p></div>'+
  link("/guides/","View all guides "+icons.arrow,"inline-link")+'</div>'+
  '<div class="guide-grid">'+categoryCards(PLAYBOOKS.slice(0,6))+'</div></div></section>';
 const value='<section class="section proof-section"><div class="wrap proof-grid"><div>'+label("03 / HOW OUR LESSONS WORK")+
  '<h2>Learn it.<br><em>Put it to work.</em></h2><p>Every lesson moves past general advice. Follow the instructions and create a real output for your business.</p>'+
  btn("/guides/","Find a practical guide")+'</div><div class="proof-stack">'+[
  ["01","The explanation","Why this step matters in the real business."],
  ["02","The instructions","What to do, in the order it needs doing."],
  ["03","The example","What the result could look like, clearly labeled."],
  ["04","The deliverable","What to finish before moving forward."]
  ].map(x=>'<div><span>'+x[0]+'</span><div><strong>'+x[1]+'</strong><p>'+x[2]+'</p></div></div>').join("")+'</div></div></section>';
 const finish='<section class="section"><div class="wrap">'+featured()+'</div></section>'+
  '<section class="founder-band"><div class="wrap founder-band-inner"><div>'+label("FROM THE PEOPLE BUILDING BUSINESSES")+
  '<h2>Useful guidance, shaped by real work.</h2><p>BizzIntel is created by Bahamas AI Solutions, founded by Amar Pearson. Our business-building perspective comes from working on websites, service operations and practical systems—not an AI-generated playbook.</p></div>'+
  '<a href="https://bahamasaisolutions.com/work/" target="_blank" rel="noopener noreferrer" class="inline-link">View our Track Record '+icons.arrowup+'</a></div></section>'+
  '<section class="final-cta"><div class="wrap final-inner">'+label("START WITH SOMETHING USEFUL")+
  '<h2>You do not have to figure<br>everything out at once.</h2>'+
  '<p>Start with the next practical lesson, finish the exercise, and move forward with more clarity.</p>'+btn("/start-here/","Find your first guide")+'</div></section>';
 return layout({path:"/",heading:"BizzIntel",description:"Practical, free business guides for entrepreneurs in The Bahamas and beyond. Learn ideation, planning, social media, Google Business Profile, marketing, pitch decks and more.",body:hero+path+guides+value+finish});
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
 const sections=[
 {id:"idea",name:"I have a business idea",subtitle:"Before you spend much money, check that the opportunity is real.",steps:[
 ["Define the customer problem","ideation","problem"],["Find the root cause","ideation","root-cause"],["Check real demand","ideation","demand-test"],["Make the decision","ideation","decision"]]},
 {id:"setup",name:"I am setting up the business",subtitle:"Turn the idea into an offer customers can discover and buy.",steps:[
 ["Build the offer","planning","single-offer"],["Work through pricing and costs","planning","economics"],["Get your digital identity in place","planning","digital"],["Check Google visibility","gbp","0"],["Prepare your first content","social","5"]]},
 {id:"operating",name:"I am already running a business",subtitle:"Get organized, improve the customer journey and measure what's working.",steps:[
 ["Find the next marketing experiment","marketing","0"],["Improve the website journey","website","0"],["Document the repeatable process","automations","1"],["Run a weekly review","weekly","0"],["Check relevant funding opportunities","opportunities","2"]]}
 ];
 const content='<section class="page-top start-top"><div class="wrap">'+label("START HERE / CHOOSE YOUR STAGE")+
  '<h1>Not sure where to begin?<br><em>Start where you are.</em></h1>'+
  '<p>You do not need to finish every tutorial in order. Choose what describes you best and begin with the most useful next exercise.</p>'+
  '<div class="stage-jump">'+sections.map(s=>link("#"+s.id,esc(s.name)+icons.arrow,"jump-button")).join("")+'</div></div></section>'+
  '<div class="wrap stage-content">'+sections.map((s,i)=>'<section class="stage-section" id="'+s.id+'"><div class="stage-section-head"><div class="stage-big">'+number(i+1)+'</div>'+
  '<div>'+label("BUSINESS STAGE")+'<h2>'+esc(s.name)+'</h2><p>'+esc(s.subtitle)+'</p></div></div><ol class="stage-steps">'+s.steps.map(([name,module,ref],j)=>{
   const p=PLAYBOOKS.find(x=>x.id===module);
   const step=ref.match(/^\d+$/)?p.steps[Number(ref)]:p.steps.find(x=>x.id===ref);
   return '<li><span>'+number(j+1)+'</span><div><strong>'+esc(name)+'</strong><p>'+esc(step?.output||"Complete the lesson.")+'</p></div>'+
    link("/guides/"+module+"/#"+(step?.id||""),"Read lesson "+icons.arrow,"inline-link")+'</li>';
  }).join("")+'</ol></section>').join("")+'</div>'+
  '<section class="final-cta"><div class="wrap final-inner">'+label("THE FULL LIBRARY")+
  '<h2>Need something else?</h2><p>All ten guides are open. Find the one that solves your immediate problem.</p>'+btn("/guides/","Browse all business guides")+'</div></section>';
 return layout({path:"/start-here/",heading:"Where to start",description:"Choose your business stage and find the right free business tutorials for idea validation, setup, launch and operations.",body:content});
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
for(const p of PLAYBOOKS)await emit("/guides/"+p.id+"/",guidePage(p));
const routes=["/","/guides/","/start-here/","/resources/","/about/",...PLAYBOOKS.map(p=>"/guides/"+p.id+"/")];
await writeFile(OUT+"/robots.txt",published?"User-agent: *\nAllow: /\n"+(BASE?"Sitemap: "+BASE+"/sitemap.xml\n":""):"User-agent: *\nDisallow: /\n");
if(BASE&&published){
 await writeFile(OUT+"/sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>'+esc(BASE+p)+'</loc></url>').join("")+'</urlset>');
}
console.log("BizzIntel: built "+routes.length+" static public pages, "+PLAYBOOKS.length+" guides, "+total+" lessons. Indexing: "+(published?"enabled":"disabled pending review")+".");
