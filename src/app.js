import * as api from "./backend.js";
import {STAGES,INDUSTRIES,GOALS,getRoadmap,getReadiness} from "./journeys.js";
import {PLAYBOOKS,getPlaybook,stepKey,responseKey,getStepResponse,isStepDone,playbookProgress,orderedPlaybooks,stepPrompt,workbookMarkdown} from "./playbooks.js";
import {esc as h,model,money,planMarkdown,freshBusiness,slug,download} from "./logic.js";

const state={user:null,authMode:"login",businesses:[],businessId:null,notes:[],artifacts:[],messages:[],page:"home",demo:false,menu:false,playbookId:"ideation",stepIndex:0,working:false,ready:false};
const $=s=>document.querySelector(s);
const active=()=>state.businesses.find(b=>b.id===state.businessId);
const icon=(name)=>({arrow:"→",check:"✓",sparkle:"✳",menu:"☰",cross:"×",download:"↓",back:"←",more:"···"}[name]||"↗");
const options=(arr,value)=>arr.map(i=>'<option value="'+h(i.id)+'" '+(i.id===value?'selected':'')+'>'+h(i.name)+'</option>').join("");
const fmtDate=s=>s?new Date(s).toLocaleDateString("en-BS",{year:"numeric",month:"short",day:"numeric"}):"";
function toast(text){const el=$("#toast");el.textContent=text;el.classList.add("show");clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.classList.remove("show"),3800)}
function go(page){state.page=page;state.menu=false;location.hash="#/"+page;render();scrollTo({top:0,behavior:"instant"});}
function label(text){return '<span class="eyebrow">'+h(text)+'</span>'}
function btn(text,action,cls=""){return '<button type="button" class="button '+cls+'" data-action="'+h(action)+'">'+h(text)+'</button>'}
function empty(title,desc){return '<div class="empty"><div class="empty-mark">◇</div><h3>'+h(title)+'</h3><p>'+h(desc)+'</p></div>'}
function header(title,desc,tag){return '<div class="page-head">'+label(tag||"YOUR WORKSPACE")+'<h1>'+h(title)+'</h1><p>'+h(desc)+'</p></div>'}
function box(title,body,cls=""){return '<section class="panel '+cls+'"><h2>'+h(title)+'</h2>'+body+'</section>'}
function field(name,title,value="",type="text",hint=""){
 let v=h(value??"");let widget=type==="textarea"?'<textarea id="'+name+'" name="'+name+'" rows="4">'+v+'</textarea>':'<input id="'+name+'" name="'+name+'" type="'+type+'" value="'+v+'" '+(type==="number"?'min="0" step="any"':'')+'>';
 return '<label class="field" for="'+name+'"><span>'+h(title)+'</span>'+widget+(hint?'<small>'+h(hint)+'</small>':'')+'</label>';
}
function pick(name,title,list,value){return '<label class="field" for="'+name+'"><span>'+h(title)+'</span><select id="'+name+'" name="'+name+'">'+options(list,value)+'</select></label>'}
function topbar(){
 return '<header class="topbar"><button type="button" class="mobile-toggle" aria-label="Toggle navigation" data-action="menu">☰</button><a class="wordmark" href="#/home"><span class="mark">B<span>.</span></span><span>bizz<span class="lime">intel.</span></span></a>'+
 '<div class="topbar-right"><span class="context-label">'+(state.demo?'DEMO SESSION':state.user?h(state.user.email):'BUSINESS INTELLIGENCE')+'</span>'+
 (state.user?btn("Sign out","signout","button-ghost button-small"):'')+'</div></header>';
}
function navigation(){
 const items=[["home","Dashboard","◫"],["playbooks","The playbooks","▤"],["journey","My action list","◇"],["business","Business profile","◎"],["evidence","Research & evidence","▣"],["documents","My documents","▤"],["financials","Profit calculator","◈"],["settings","Settings","⚙"]];
 return '<aside class="sidebar '+(state.menu?'open':'')+'"><div class="sidebar-title">WORKSPACE</div>'+
 '<div class="business-picker"><label for="business-switch">SELECT A BUSINESS</label><select id="business-switch">'+state.businesses.map(b=>'<option value="'+h(b.id)+'" '+(b.id===state.businessId?'selected':'')+'>'+h(b.name)+'</option>').join("")+'</select>'+
 '<button class="subtle-add" data-action="create" type="button">＋ Add a business</button></div>'+
 '<nav aria-label="Workspace navigation">'+items.map(i=>'<button class="nav-item '+(state.page===i[0]?'current':'')+'" data-go="'+i[0]+'"><span class="nav-glyph">'+i[2]+'</span>'+i[1]+'</button>').join("")+'</nav>'+
 '<div class="sidebar-footer"><div class="small-card"><strong>Built for the real journey.</strong><p>Step by step. From idea to action.</p></div><p>BAHAMAS AI SOLUTIONS</p></div></aside>';
}
function outer(body){
 return topbar()+'<div class="shell">'+navigation()+'<main class="content" id="main">'+
 (state.demo?'<div class="demo-banner"><strong>Preview mode.</strong> Progress is not saved in preview mode. Export your work before leaving. Cloud saving needs an account. '+btn("Exit demo","exitdemo","button-small")+'</div>':'')+
 body+'</main></div>';
}
function welcome(){
 return topbar()+'<main class="welcome"><div class="welcome-content">'+label("THE BUSINESS-BUILDING WORKSPACE")+
 '<h1>Build the business. <em>Not just a plan.</em></h1>'+
 '<p class="lead">Follow a practical sequence: clarify the problem, test demand, work out the numbers, build your online presence, launch and improve. Real tutorials. Useful workbooks. Your pace.</p>'+
 '<div class="welcome-actions">'+btn("Explore the demo","demo")+(api.configured?btn("Create your account","show-signup","button-outline"):btn("See what is coming","show-info","button-outline"))+'</div>'+
 '<div class="stat-strip"><div><strong>06</strong><span>Business stages</span></div><div><strong>07</strong><span>Industry journeys</span></div><div><strong>10</strong><span>Guided playbooks</span></div></div></div>'+
 '<div class="auth-card"><div class="card-overline">FOUNDER ACCESS</div>'+
 (api.configured?'<h2>'+(state.authMode==="signup"?"Create an account":state.authMode==="reset"?"Reset your password":"Welcome back")+'</h2>'+
 '<p>'+(state.authMode==="signup"?"Set up a secure business workspace.":state.authMode==="reset"?"We will email a recovery link.":"Sign in to continue where you left off.")+'</p>'+
 '<form id="auth-form" class="stack"><label class="field"><span>Email</span><input required name="email" type="email" autocomplete="email"></label>'+
 (state.authMode!=="reset"?'<label class="field"><span>Password</span><input required minlength="8" name="password" type="password" autocomplete="'+(state.authMode==="signup"?"new-password":"current-password")+'"></label>':'')+
 '<button class="button button-wide" type="submit">'+(state.authMode==="signup"?"Create account":state.authMode==="reset"?"Send recovery email":"Sign in")+' →</button></form>'+
 '<div class="auth-links"><button data-action="show-login">Sign in</button><button data-action="show-signup">Create account</button><button data-action="show-reset">Forgot password?</button></div>':
 '<h2>Cloud access is not configured yet.</h2><p>The preview is functional without an account. Secure accounts and cross-device saving require a dedicated Supabase project. No OpenAI API or subscription is required for these lessons.</p><div class="divider"></div>'+
 '<div class="info-list"><span>✓ Stage-specific journeys</span><span>✓ Multi-business workspace</span><span>✓ Guided founder playbooks</span></div>'+
 '<button data-action="demo" class="button button-wide">Explore the demo →</button>')+
 '</div></main>';
}
function demoSetup(){
 state.demo=true;state.user=null;
 const id=crypto.randomUUID();
 const b={...freshBusiness("demo",{name:"Island Example Co.",stage:"operating",industry:"service",location:"Nassau, The Bahamas",goal:"customers"}),id,
   summary:"An illustrative mobile service business.",customer:"Customers in Nassau seeking reliable on-location service.",problem:"Convenient service can be difficult to book.",solution:"A clear, bookable service with reliable arrival windows.",evidence:"",updated_at:new Date().toISOString()};
 state.businesses=[b];state.businessId=id;state.notes=[];state.artifacts=[];state.messages=[];go("home");
}
function stepTag(value){return (STAGES.find(s=>s.id===value)||STAGES[0]).short}
function stat(label,value,description){return '<div class="kpi"><span>'+h(label)+'</span><strong>'+h(value)+'</strong><small>'+h(description)+'</small></div>'}
function overview(b){
 const tasks=getRoadmap(b),done=tasks.filter(t=>Boolean(b.tasks?.[t.id])).length,readiness=getReadiness(b);
 const next=tasks.filter(t=>!b.tasks?.[t.id]).slice(0,3);
 return header('Your business. Your next step.','Follow your chosen process, keep the real work organized, and get back to what matters.','YOUR COMMAND CENTER')+
 '<div class="hero-panel"><div>'+label("CURRENT BUSINESS")+'<h2>'+h(b.name)+'</h2><p>'+h(b.summary||"Build the basics. Test the assumptions. Then move.")+'</p><div class="hero-tags"><span>'+h(stepTag(b.stage))+'</span><span>'+h(INDUSTRIES.find(i=>i.id===b.industry)?.name||"Other")+'</span><span>'+h(b.location)+'</span></div></div>'+
 '<div class="hero-cta">'+btn("Explore step-by-step guides","nav-playbooks")+'</div></div>'+
 '<div class="kpi-grid">'+stat("Roadmap",done+" / "+tasks.length,"Tasks completed")+stat("Business context",readiness.completed+" / 4","Foundational inputs recorded")+stat("Current focus",GOALS.find(g=>g.id===b.goal)?.name||"Validation","User-selected priority")+'</div>'+
 '<div class="two-col">'+box("Your next three moves",'<p class="section-note">A starting point based on your stage, industry and goal.</p>'+
 (next.length?next.map((t,i)=>'<div class="next-step"><span class="step-number">0'+(i+1)+'</span><div><strong>'+h(t.title)+'</strong><p>'+h(t.description)+'</p></div></div>').join(""):empty("Roadmap up to date","Review your results and choose the next business milestone."))+
 '<div class="panel-actions">'+btn("Open full roadmap","nav-journey","button-outline")+'</div>')+
 box("Evidence over excitement",'<p class="section-note">'+h(readiness.description)+'</p><div class="checks">'+readiness.tests.map(([t,ok])=>'<div><span class="'+(ok?'pass':'fail')+'">'+(ok?'✓':'○')+'</span> '+h(t)+'</div>').join("")+'</div><div class="panel-actions">'+btn("Complete business profile","nav-business","button-outline")+'</div>')+'</div>'+
 '<div class="section-heading"><div>'+label("START WITH YOUR GOAL")+'<h2>Recommended playbooks</h2></div></div>'+
 '<div class="recommended-grid">'+orderedPlaybooks(b).slice(0,3).map(p=>{
 const progress=playbookProgress(b.tasks||{},p);
 return '<button type="button" class="recommended-card" data-open-playbook="'+h(p.id)+'"><small>MODULE '+p.number+'</small><strong>'+h(p.title)+'</strong><span>'+progress.complete+' of '+progress.total+' complete →</span></button>';
 }).join("")+'</div>'+
 '<div class="section-heading"><div>'+label("YOUR TOOLS")+'<h2>Everything in one place.</h2></div></div>'+tiles();
}
function tiles(){
 const items=[["playbooks","Guided playbooks","62 concrete exercises from idea to growth.","✳"],["journey","My action list","Track your day-to-day priorities.","◇"],["business","Business profile","Enter your business information once.","◎"],["evidence","Research & evidence","Keep real interviews and sources.","▤"],["documents","Working documents","Create, edit and export your drafts.","▣"],["financials","Profit calculator","Test pricing and break-even.","◈"]];
 return '<div class="tool-grid">'+items.map(i=>'<button class="tool-card" data-go="'+i[0]+'"><div class="tool-glyph">'+i[3]+'</div><h3>'+i[1]+'</h3><p>'+i[2]+'</p><span class="tool-arrow">↗</span></button>').join("")+'</div>';
}
function newBusiness(){
 return '<div class="narrow">'+header("Add your business","Choose your current stage and first priority. Every playbook stays accessible.","CREATE A WORKSPACE")+
 box("Build your business profile",'<form id="create-form" class="stack"><div class="form-grid">'+field("name","Business name or working idea","")+
 pick("stage","Where are you in the business?",STAGES,"idea")+pick("industry","What type of business?",INDUSTRIES,"service")+
 field("location","Country / market","The Bahamas")+pick("goal","What do you need first?",GOALS,"validate")+
 '</div><div class="panel-actions"><button class="button" type="submit">Create workspace →</button>'+btn("Cancel","nav-home","button-outline")+'</div></form>')+'</div>';
}
function businessPage(b){
 return header("Know your business.",'These facts help you complete the worksheets and build your documents. Only record information you can support.','BUSINESS MEMORY')+
 box("Business fundamentals",'<form id="business-form"><div class="form-grid">'+
 field("name","Business name",b.name)+pick("stage","Current stage",STAGES,b.stage)+pick("industry","Industry",INDUSTRIES,b.industry)+
 field("location","Market / location",b.location)+pick("goal","Immediate business goal",GOALS,b.goal)+
 field("summary","What does this business do?",b.summary,"textarea")+
 field("customer","Who exactly is the customer?",b.customer,"textarea")+
 field("problem","What customer problem exists?",b.problem,"textarea")+
 field("solution","What will you deliver?",b.solution,"textarea")+
 field("evidence","What evidence do you actually have?",b.evidence,"textarea","Only record interviews, paid sales, pilots, observations or traceable sources. Do not invent results.")+
 '</div><div class="panel-actions"><button class="button" type="submit">Save business memory →</button>'+btn("Export profile","export-profile","button-outline")+'</div></form>')+
 '<p class="footnote">Your business profile feeds into reusable worksheets and optional copyable prompts. Unverified statements should be checked before external use.</p>';
}
function roadmapPage(b){
 const arr=getRoadmap(b);const custom=b.tasks?.__custom||[];const all=[...arr,...custom.map((t,i)=>({id:"custom-"+i,title:t,description:"Added by you.",tag:"Custom"}))];
 const done=all.filter(t=>b.tasks?.[t.id]).length;
 return header("Your next actions, your pace.",'The tasks adapt to your current stage, sector and goal. Complete what matters; skip the theatre.','ADAPTIVE JOURNEY')+
 '<div class="progress-card"><div><strong>'+done+" of "+all.length+'</strong><span> tasks completed</span></div><div class="progress-track"><div style="width:'+Math.round(done/Math.max(1,all.length)*100)+'%"></div></div></div>'+
 '<div class="steps-list">'+all.map((t,i)=>'<div class="task-row"><button aria-label="'+(b.tasks?.[t.id]?'Mark incomplete: ':'Complete: ')+h(t.title)+'" class="task-check '+(b.tasks?.[t.id]?'checked':'')+'" data-task="'+h(t.id)+'">'+(b.tasks?.[t.id]?'✓':'')+'</button><div><span class="task-tag">'+h(t.tag)+'</span><h3 class="'+(b.tasks?.[t.id]?'finished':'')+'">'+h(t.title)+'</h3><p>'+h(t.description)+'</p></div></div>').join("")+'</div>'+
 box("Add a specific task",'<form id="custom-task-form" class="inline-form"><input required maxlength="160" aria-label="Custom task" name="task" placeholder="Something important for this business"><button class="button" type="submit">Add task</button></form>') ;
}
function playbooksPage(b){
 const packs=orderedPlaybooks(b);
 const finished=PLAYBOOKS.reduce((sum,p)=>sum+playbookProgress(b.tasks||{},p).complete,0);
 const total=PLAYBOOKS.reduce((sum,p)=>sum+p.steps.length,0);
 return header("Learn the process. Do the work.","Choose the part of business you need, then complete each step. You are never locked into a particular order.","GUIDED BUSINESS PLAYBOOKS")+
 '<div class="hero-panel"><div>'+label("YOUR PLAYBOOK PROGRESS")+'<h2>'+finished+' of '+total+' steps complete</h2><p>Follow structured guides, save your work at every step, and export templates. Lessons are editorial drafts awaiting founder review.</p></div><div class="hero-cta">'+btn("Open recommended guide","open-recommended")+'</div></div>'+
 '<div class="panel-actions export-toolbar">'+btn("Export entire workbook","export-workbook","button-outline button-small")+'</div><div class="toolkit-grid">'+packs.map(p=>{
   const count=playbookProgress(b.tasks||{},p);
   return '<article class="panel toolkit-card"><span class="task-tag">MODULE '+p.number+' · '+h(p.phase)+'</span><h3>'+h(p.title)+'</h3><p>'+h(p.subtitle)+'</p>'+
    '<p class="playbook-stage">'+h(p.stages.map(id=>STAGES.find(x=>x.id===id)?.short||id).join(' · '))+'</p>'+
    '<div class="playbook-meter"><span style="width:'+count.percent+'%"></span></div><div class="playbook-card-bottom"><small>'+count.complete+' / '+count.total+' steps</small><button data-open-playbook="'+h(p.id)+'">Open guide →</button></div></article>';
 }).join("")+'</div>'+
 '<p class="footnote">BizzIntel provides structured lessons and templates, not an automated advisor. The module topics were requested by the founder. Detailed draft instructions need final founder review before public launch.</p>';
}
function lessonPage(b){
 const p=getPlaybook(state.playbookId)||PLAYBOOKS[0],i=Math.max(0,Math.min(state.stepIndex,p.steps.length-1));
 state.stepIndex=i;
 const st=p.steps[i],done=isStepDone(b.tasks||{},p,i),progress=playbookProgress(b.tasks||{},p);
 const note=getStepResponse(b.tasks||{},p,i);
 const source=b.tasks?.["pb-source:"+p.id+":"+st.id]||"";
 const next=b.tasks?.["pb-next:"+p.id+":"+st.id]||"";
 const references=(st.links||[]).filter(x=>/^https:\/\//.test(x.url));
 return '<div class="lesson-top">'+btn("← All playbooks","nav-playbooks","button-ghost")+
 '<span class="task-tag">MODULE '+p.number+' · '+h(p.phase)+'</span></div>'+
 header(p.title,p.intro,"THE GUIDED WORKBOOK")+
 '<div class="progress-card"><div><strong>'+progress.complete+' / '+progress.total+'</strong><span> steps complete</span></div><div class="progress-track" aria-label="'+progress.percent+'% complete"><div style="width:'+progress.percent+'%"></div></div></div>'+
 '<div class="lesson-layout"><aside class="panel lesson-index"><h2>Inside this module</h2><div class="lesson-step-list">'+p.steps.map((step,k)=>
 '<button type="button" data-open-step="'+k+'" class="lesson-link '+(i===k?'is-active':'')+'"><span class="lesson-no">'+(isStepDone(b.tasks||{},p,k)?'✓':String(k+1).padStart(2,"0"))+'</span><span>'+h(step.title)+'</span></button>'
 ).join("")+'</div></aside><section class="panel lesson-work"><span class="task-tag">EXERCISE '+(i+1)+' OF '+p.steps.length+(done?' · COMPLETED':'')+'</span>'+
 '<h2>'+h(st.title)+'</h2><p class="lesson-lead">'+h(st.why)+'</p>'+
 '<div class="lesson-content-block"><h3>How to do it</h3><ol class="lesson-instructions">'+(st.how||[st.do]).map(x=>'<li>'+h(x)+'</li>').join("")+'</ol></div>'+
 '<div class="lesson-example"><strong>ILLUSTRATIVE EXAMPLE</strong><p>'+h(st.example)+'</p></div>'+
 '<div class="lesson-content-block"><h3>Your deliverable</h3><p>'+h(st.output)+'</p><p class="lesson-evidence">Evidence to capture: '+h(st.evidence)+'</p></div>'+
 '<div class="lesson-warning"><strong>Common mistake</strong><p>'+h(st.avoid)+'</p></div>'+
 (references.length?'<div class="lesson-content-block"><h3>Official resources</h3>'+references.map(x=>'<a class="resource-link" href="'+h(x.url)+'" target="_blank" rel="noopener noreferrer">'+h(x.title)+' ↗</a>').join("")+'</div>':'')+
 '<form id="lesson-form" class="lesson-workbook"><span class="eyebrow">PUT IT INTO PRACTICE</span><h3>Record your work</h3>'+
 '<label class="field" for="step-notes"><span>Your answer / work completed</span><textarea id="step-notes" name="notes" rows="7" placeholder="Write what you learned, decided or created...">'+h(note)+'</textarea></label>'+
 '<label class="field" for="step-source"><span>Evidence, interview or source reference (optional)</span><input id="step-source" name="source" maxlength="500" value="'+h(source)+'" placeholder="URL, interview date, file reference"></label>'+
 '<label class="field" for="step-next"><span>Next action (optional)</span><textarea id="step-next" name="next" rows="2" placeholder="What still needs to happen?">'+h(next)+'</textarea></label>'+
 '<div class="lesson-action-row"><button class="button button-outline" type="submit" name="submitMode" value="save">Save draft</button>'+
 '<button class="button" type="submit" name="submitMode" value="complete">'+(done?'Update completed exercise':'Save & complete exercise')+' →</button>'+
 (done?btn("Reopen","lesson-uncomplete","button-ghost button-small"):"")+'</div>'+
 '<p class="section-note">You can return and improve an answer later. A completed exercise needs actual written work or a reference.</p></form>'+
 '<details class="prompt-drawer"><summary>Optional: copy a useful ChatGPT prompt <span>↗</span></summary>'+
 '<p>Use only if it helps. You complete the exercise yourself; no AI account is connected to BizzIntel.</p>'+
 '<textarea class="lesson-prompt" readonly aria-label="Optional step prompt">'+h(stepPrompt(p,st,b))+'</textarea>'+
 '<div class="panel-actions">'+btn("Copy this prompt","copy-prompt","button-outline button-small")+'</div></details>'+
 '<div class="lesson-pager">'+(i>0?'<button data-open-step="'+(i-1)+'">← Previous</button>':'<span></span>')+
 (i<p.steps.length-1?'<button data-open-step="'+(i+1)+'">Next exercise →</button>':'<button data-go="playbooks">All modules →</button>')+'</div></section></div>';
}
function evidencePage(b){
 return header("Evidence, not guesses.",'Keep interviews, competitor research, decisions and risks in the business record. Cite source URLs when available.','RESEARCH & DECISIONS')+
 '<div class="two-col"><section class="panel">'+
 '<h2>Add a research note</h2><form id="note-form" class="stack">'+
 '<label class="field"><span>Category</span><select name="category"><option value="research">Market research</option><option value="customer">Customer evidence</option><option value="competitor">Competitor</option><option value="decision">Decision</option><option value="risk">Risk</option></select></label>'+
 field("note_title","Note title","")+field("note_content","What did you learn?","","textarea")+field("source_url","Original source URL (optional)","")+
 '<button class="button" type="submit">Save note →</button></form></section>'+
 '<section class="panel"><h2>Recorded evidence</h2>'+
 (state.notes.length?state.notes.map(n=>'<article class="note"><div class="note-title"><span>'+h(n.category.toUpperCase())+'</span><button data-remove-note="'+h(n.id)+'" aria-label="Delete '+h(n.title)+'" title="Delete note">×</button></div><h3>'+h(n.title)+'</h3><p>'+h(n.content)+'</p>'+
 (safeLink(n.source_url)?'<a href="'+h(n.source_url)+'" target="_blank" rel="noopener noreferrer">View source ↗</a>':'')+'</article>').join(""):empty("No evidence recorded yet","Start with genuine customer conversations or a verified source."))+'</section></div>';
}
function safeLink(s){try{const u=new URL(s);return ["https:","http:"].includes(u.protocol)}catch{return false}}
function documentsPage(b){
 return header("Turn work into deliverables.",'Draft, edit, save and export plans and working documents. They start from your actual business record.','DOCUMENT STUDIO')+
 '<div class="action-strip">'+btn("Create working business plan","create-plan")+' '+btn("Create pitch outline","create-pitch","button-outline")+' '+btn("New blank document","create-blank","button-outline")+'</div>'+
 (state.artifacts.length?'<div class="documents-grid">'+state.artifacts.map(a=>'<div class="panel doc-card"><span class="task-tag">'+h(a.kind)+'</span><h3>'+h(a.title)+'</h3><p>Updated '+h(fmtDate(a.updated_at))+'</p><div class="doc-actions"><button data-open-artifact="'+h(a.id)+'">Edit document →</button><button data-download-artifact="'+h(a.id)+'">↓</button></div></div>').join("")+'</div>':empty("Your work belongs here","Create a working plan or start with a blank document."))+
 '<p class="footnote">No generated content is independently verified. Check all claims before external use.</p>';
}
function editDocument(a){
 return header("Edit your document",'Make the draft accurate, usable and ready to share.','DOCUMENT EDITOR')+
 box("Working draft",'<form id="artifact-form"><input type="hidden" name="id" value="'+h(a.id)+'">'+
 field("title","Title",a.title)+field("content","Document",a.content,"textarea")+
 '<div class="panel-actions"><button class="button" type="submit">Save document</button>'+btn("Download .md","download-current","button-outline")+btn("Back to documents","nav-documents","button-ghost")+btn("Delete document","delete-current","button-danger")+'</div></form>') ;
}
function financialPage(b){
 const f=b.tasks?.__finance||{},m=model(f);
 return header("Make the numbers make sense.",'Test contribution margin and break-even using your actual costs and expected volume.','BUSINESS ECONOMICS')+
 '<div class="two-col">'+box("Monthly operating model",'<form id="finance-form" class="stack"><div class="form-grid">'+
 field("price","Price per sale (BSD)",f.price||0,"number")+field("variable","Variable cost per sale (BSD)",f.variable||0,"number")+
 field("monthlyFixed","Monthly fixed costs (BSD)",f.monthlyFixed||0,"number")+field("monthlyUnits","Expected sales per month",f.monthlyUnits||0,"number")+
 '</div><div class="panel-actions"><button class="button" type="submit">Save model →</button></div></form>')+
 box("Financial results",'<div class="result-list"><div>Revenue <strong>'+money(m.revenue)+'</strong></div><div>Variable contribution per sale <strong>'+money(m.contribution)+'</strong></div><div>Monthly modeled profit / loss <strong class="'+(m.profit<0?"negative":"")+'">'+money(m.profit)+'</strong></div><div>Break-even monthly sales <strong>'+(m.breakEven??"Not achievable at this price")+'</strong></div></div>'+
 '<p class="section-note">A simple pre-tax model, not a financial statement. Real taxes, debt, capacity, returns and other costs may change the result.</p>')+'</div>';
}
function settingsPage(b){
 return header("Workspace controls.",'Export your records or permanently remove a business. Data security starts with ownership.','SETTINGS')+
 box("Your workspace",'<div class="setting-row"><div><strong>Access mode</strong><p>'+(state.demo?"Demo; no server storage":"Signed-in owner; cloud storage with row-level security")+'</p></div><span class="status">'+(state.demo?"Preview":"Cloud")+'</span></div>'+
 '<div class="setting-row"><div><strong>Business</strong><p>'+h(b.name)+'</p></div>'+btn("Download JSON backup","export-json","button-outline button-small")+'</div>'+
 '<div class="setting-row"><div><strong>Data deletion</strong><p>Deletes the selected business and its related records.</p></div>'+btn("Delete business","delete-business","button-danger button-small")+'</div>')+
 box("Security and scope",'<p class="section-note">This release has owner-only workspaces. Team invitations, automatic weekly alerts, live grant monitoring and social-account publishing are not connected. No AI advisor or OpenAI API is required to complete the playbooks. Secure accounts and cloud saving remain optional until the dedicated database is configured.</p>');
}
function render(){
 const root=$("#app");
 if(!state.ready){root.innerHTML=topbar()+'<main class="loading">Loading workspace…</main>';return}
 if(state.authMode==="newpassword"&&state.user){root.innerHTML=topbar()+'<main class="welcome"><div class="welcome-content"><span class="eyebrow">ACCOUNT SECURITY</span><h1>Choose a new password.</h1><p>Use a unique password that you do not share with anyone.</p></div><div class="auth-card"><h2>Reset password</h2><form id="new-password-form" class="stack"><label class="field"><span>New password</span><input name="password" type="password" autocomplete="new-password" minlength="8" required></label><button class="button button-wide" type="submit">Update password →</button></form></div></main>';return}
 if(!state.user&&!state.demo){root.innerHTML=welcome();return}
 const b=active();
 if(state.page==="new"||!b){root.innerHTML=topbar()+'<main class="content standalone">'+newBusiness()+'</main>';return}
 const p=state.page;
 let body;
 if(p==="business")body=businessPage(b);
 else if(p==="journey")body=roadmapPage(b);
 else if(p==="playbooks"||p==="toolkit")body=playbooksPage(b);
 else if(p==="lesson")body=lessonPage(b);
 else if(p==="evidence")body=evidencePage(b);
 else if(p==="documents")body=documentsPage(b);
 else if(p==="financials")body=financialPage(b);

 else if(p==="settings")body=settingsPage(b);
 else if(p==="editdoc"){const a=state.artifacts.find(x=>x.id===state.editId);body=a?editDocument(a):documentsPage(b)}
 else body=overview(b);
 root.innerHTML=outer(body);
}
async function loadExtras(){
 const b=active();
 if(!b){state.notes=[];state.artifacts=[];state.messages=[];return}
 if(state.demo){return}
 const [notes,artifacts]=await Promise.all([api.listNotes(b.id),api.listArtifacts(b.id)]);
 state.notes=notes;state.artifacts=artifacts;state.messages=[];
}
async function start(){
 state.ready=false;render();
 const redirect=api.consumeAuthRedirect?.();
 if(redirect==="recovery")state.authMode="newpassword";
 if(api.configured&&api.isLoggedIn()){state.user=await api.currentUser();if(state.user){
 try{state.businesses=await api.listBusinesses();state.businessId=state.businesses[0]?.id||null;await loadExtras();}
 catch(err){toast(err.message)} }}
 state.ready=true;
 const page=(location.hash||"").replace("#/","");state.page=page||"home";render();
}
async function saveChanges(payload){
 const b=active();if(!b)throw Error("No business selected");
 const updated={...payload,updated_at:new Date().toISOString()};
 if(state.demo){Object.assign(b,updated);render();return}
 const fresh=await api.saveBusiness(b.id,updated);
 state.businesses=state.businesses.map(i=>i.id===b.id?fresh:i);render();
}
const getVals=form=>Object.fromEntries(new FormData(form).entries());
const loaded=fn=>async(...args)=>{if(state.working)return;state.working=true;try{await fn(...args)}catch(e){toast(e.message||"Operation failed")}finally{state.working=false;render()}};
async function createBusiness(v){
 if(!v.name?.trim()||v.name.trim().length<2)throw Error("Enter a business name of at least two characters.");
 const values=freshBusiness(state.user?.id||"demo",v);
 let b;
 if(state.demo)b={...values,id:crypto.randomUUID(),updated_at:new Date().toISOString()};
 else b=await api.addBusiness(values);
 state.businesses.unshift(b);state.businessId=b.id;state.notes=[];state.artifacts=[];state.messages=[];go("playbooks");toast("Business workspace created.");
}
async function persistNotes(payload){
 if(state.demo)state.notes.unshift({...payload,id:crypto.randomUUID(),created_at:new Date().toISOString()});
 else state.notes.unshift(await api.addNote(payload));
}
async function persistArtifact(payload){
 if(state.demo)state.artifacts.unshift({...payload,id:crypto.randomUUID(),created_at:new Date().toISOString(),updated_at:new Date().toISOString()});
 else state.artifacts.unshift(await api.addArtifact(payload));
}
async function createDocument(kind){
 const b=active();
 const isPitch=kind==="pitch";const isBlank=kind==="blank";
 const content=isBlank?"# Untitled document\n\n":isPitch?pitchText(b):planMarkdown(b);
 await persistArtifact({business_id:b.id,owner_id:b.owner_id,kind,title:isBlank?"Untitled document":isPitch?b.name+" — Pitch outline":b.name+" — Working business plan",content});
 toast("Document created.");render();
}
function pitchText(b){
 const subjects=[["The opportunity",b.summary],["Customer problem",b.problem],["Ideal customer",b.customer],["The solution",b.solution],["Market & competition","Verify the market and actual alternatives."],["Business model","Add actual pricing, margin and buying frequency."],["Go-to-market","Describe the first measurable customer acquisition channel."],["Evidence / traction",b.evidence],["Risks & mitigation","Describe the three main business risks."],["Team, ask & milestone","List real people, funding needs and next milestone."]];
 return "# "+b.name+" — Working pitch\n\n"+subjects.map((x,i)=>"## Slide "+(i+1)+": "+x[0]+"\n"+(x[1]||"Evidence required.")+"\n").join("\n")+"\nDraft only. Verify all facts and figures.\n";
}
function exportWorkbook(){const b=active();if(!b)return;download(slug(b.name)+"-bizzintel-workbook.md",workbookMarkdown(b),"text/markdown;charset=utf-8");toast("Workbook exported.");}
function exportProfile(){const b=active();download(slug(b.name)+"-profile.json",JSON.stringify(b,null,2),"application/json")}
function exportBackup(){
 const b=active();const payload={exportedAt:new Date().toISOString(),business:b,notes:state.notes,artifacts:state.artifacts,messages:state.messages};
 download(slug(b.name)+"-backup.json",JSON.stringify(payload,null,2),"application/json");
}
document.addEventListener("click",async e=>{
 const nav=e.target.closest("[data-go]");if(nav){go(nav.dataset.go);return}
 const task=e.target.closest("[data-task]");if(task){await loaded(async()=>{const b=active();const tasks={...(b.tasks||{}),[task.dataset.task]:!b.tasks?.[task.dataset.task]};await saveChanges({tasks});})(e);return}
 const action=e.target.closest("[data-action]");
 if(action){
  const a=action.dataset.action;
  if(a==="menu"){state.menu=!state.menu;render();return}
  if(a==="demo"){demoSetup();return}
  if(a==="show-info"){toast("Explore the working demo while cloud setup is pending.");return}
  if(a.startsWith("show-")){state.authMode=a.slice(5);render();return}
  if(a==="exitdemo"){state.demo=false;state.businesses=[];state.businessId=null;go("home");return}
  if(a==="signout"){await loaded(async()=>{await api.signOut();state.user=null;state.businesses=[];state.businessId=null;go("home")})();return}
  if(a==="create"){go("new");return}
  if(a==="export-workbook"){exportWorkbook();return}
  if(a==="open-recommended"){state.playbookId=orderedPlaybooks(active())[0].id;state.stepIndex=0;go("lesson");return}
  if(a==="lesson-uncomplete"){await loaded(async()=>{
    const b=active(),p=getPlaybook(state.playbookId);
    if(!p)return;
    const tasks={...(b.tasks||{})}; delete tasks[stepKey(p.id,p.steps[state.stepIndex].id)];delete tasks["pb:"+p.id+":"+state.stepIndex];
    await saveChanges({tasks});toast("Step reopened.");
  })();return}
  if(a==="copy-prompt"){const p=getPlaybook(state.playbookId);if(!p)return;const text=stepPrompt(p,p.steps[state.stepIndex],active());try{await navigator.clipboard.writeText(text);toast("Prompt copied.");}catch{const area=document.querySelector(".lesson-prompt");area?.focus();area?.select();toast("Select and copy the highlighted prompt.");}return}
  if(a.startsWith("nav-")){go(a.slice(4));return}
  if(a==="export-profile"){exportProfile();return}
  if(a==="export-json"){exportBackup();return}
  if(a==="create-plan"||a==="create-pitch"||a==="create-blank"){await loaded(()=>createDocument(a.slice(7)))();return}
  if(a==="download-current"){const art=state.artifacts.find(x=>x.id===state.editId);if(art)download(slug(art.title)+".md",art.content,"text/markdown");return}
  if(a==="delete-current"){
   if(!confirm("Permanently delete this document?"))return;
   await loaded(async()=>{if(!state.demo)await api.removeArtifact(state.editId);state.artifacts=state.artifacts.filter(x=>x.id!==state.editId);go("documents");toast("Document deleted.")})();return
  }
  if(a==="delete-business"){
   if(!confirm("Permanently delete this business, its completed lessons, notes and documents?"))return;
   await loaded(async()=>{const id=state.businessId;if(!state.demo)await api.removeBusiness(id);state.businesses=state.businesses.filter(x=>x.id!==id);state.businessId=state.businesses[0]?.id||null;await loadExtras();go("home");toast("Business removed.")})();return;
  }
 }
 const note=e.target.closest("[data-remove-note]");
 if(note){if(!confirm("Delete this research note?"))return;await loaded(async()=>{if(!state.demo)await api.removeNote(note.dataset.removeNote);state.notes=state.notes.filter(n=>n.id!==note.dataset.removeNote);toast("Note deleted.")})();return}
 const doc=e.target.closest("[data-open-artifact]");
 if(doc){state.editId=doc.dataset.openArtifact;go("editdoc");return}
 const save=e.target.closest("[data-download-artifact]");
 if(save){const item=state.artifacts.find(x=>x.id===save.dataset.downloadArtifact);if(item)download(slug(item.title)+".md",item.content,"text/markdown");return}
 const openPlaybook=e.target.closest("[data-open-playbook]");
 if(openPlaybook){state.playbookId=openPlaybook.dataset.openPlaybook;state.stepIndex=0;go("lesson");return}
 const openStep=e.target.closest("[data-open-step]");
 if(openStep){state.stepIndex=Number(openStep.dataset.openStep);render();return}
});
document.addEventListener("change",async e=>{
 if(e.target.id==="business-switch"){
  state.businessId=e.target.value;await loaded(async()=>{await loadExtras();go("home")})();return;
 }

});
document.addEventListener("submit",async e=>{
 e.preventDefault();const f=e.target,v=getVals(f);
 if(f.id==="new-password-form"){await loaded(async()=>{
  await api.changePassword(v.password);state.authMode="login";toast("Password updated.");go("home");
 })();return}
 if(f.id==="auth-form"){await loaded(async()=>{
   if(state.authMode==="signup"){const r=await api.signUp(v.email,v.password);if(r?.access_token){await api.signIn(v.email,v.password);state.user=await api.currentUser();state.businesses=await api.listBusinesses();}else {state.authMode="login";toast("Check your email for a confirmation link before signing in.");}}
   else if(state.authMode==="reset"){await api.resetPassword(v.email);state.authMode="login";toast("If the account exists, a recovery email has been sent.")}
   else{await api.signIn(v.email,v.password);state.user=await api.currentUser();state.businesses=await api.listBusinesses();}
   state.businessId=state.businesses[0]?.id||null;await loadExtras();go("home");
 })();return}
 if(f.id==="create-form"){await loaded(()=>createBusiness(v))();return}
 if(f.id==="business-form"){await loaded(async()=>{
  const keys=["name","stage","industry","location","goal","summary","customer","problem","solution","evidence"];const patch=Object.fromEntries(keys.map(k=>[k,String(v[k]||"").trim()]));
  if(patch.name.length<2)throw Error("The business name is too short.");
  await saveChanges(patch);toast("Business memory saved.");
 })();return}
 if(f.id==="custom-task-form"){await loaded(async()=>{
  const b=active(),custom=[...(b.tasks?.__custom||[])],name=String(v.task||"").trim();
  if(!name)throw Error("Enter a task.");
  if(custom.length>=25)throw Error("Custom task limit reached.");
  custom.push(name.slice(0,160));await saveChanges({tasks:{...(b.tasks||{}),__custom:custom}});toast("Task added.");
 })();return}
 if(f.id==="finance-form"){await loaded(async()=>{
  const b=active(),finance=Object.fromEntries(["price","variable","monthlyFixed","monthlyUnits"].map(k=>[k,Number(v[k])||0]));
  await saveChanges({tasks:{...(b.tasks||{}),__finance:finance}});toast("Financial model saved.");
 })();return}
 if(f.id==="note-form"){await loaded(async()=>{
  if(!v.note_title?.trim())throw Error("Add a note title.");
  if(v.source_url&& !safeLink(v.source_url))throw Error("Enter a valid http or https source URL.");
  const b=active();await persistNotes({business_id:b.id,owner_id:b.owner_id,category:v.category,title:v.note_title.slice(0,160),content:String(v.note_content||""),source_url:String(v.source_url||"")});
  toast("Evidence saved.");
 })();return}
 if(f.id==="artifact-form"){await loaded(async()=>{
  const id=v.id,item=state.artifacts.find(x=>x.id===id);if(!item)throw Error("Document not found.");
  if(state.demo){item.title=v.title;item.content=v.content;item.updated_at=new Date().toISOString();}
  else{const rows=await api.saveArtifact(id,v.content,v.title);Object.assign(item,rows[0]||{});}
  toast("Document saved.");
 })();return}
 if(f.id==="lesson-form"){await loaded(async()=>{
  const b=active(),p=getPlaybook(state.playbookId),i=state.stepIndex;
  if(!p)throw Error("Guide not found.");
  const submit=e.submitter?.value||"save";
  const step=p.steps[i],notes=String(v.notes||"").trim(),source=String(v.source||"").trim(),next=String(v.next||"").trim();
  if(submit==="complete"&&notes.length<20&&source.length<12)throw Error("Record a meaningful result or supporting reference before completing this exercise.");
  const tasks={...(b.tasks||{}),[responseKey(p.id,step.id)]:notes.slice(0,8000),
    ["pb-source:"+p.id+":"+step.id]:source.slice(0,500),["pb-next:"+p.id+":"+step.id]:next.slice(0,1200)};
  if(submit==="complete")tasks[stepKey(p.id,step.id)]=true;
  await saveChanges({tasks});
  toast(submit==="complete"?"Step marked complete.":"Your work is saved.");
 })();return}
 
});
window.addEventListener("hashchange",()=>{
 const p=(location.hash||"").replace("#/","")||"home";
 if(["home","business","journey","playbooks","lesson","evidence","documents","financials","toolkit","settings","new"].includes(p)){state.page=p;render()}
});
start();
