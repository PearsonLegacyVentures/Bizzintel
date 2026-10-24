/**
 * Render static BizzIntel Method pages. All curriculum content lives in src/method.js.
 * No sign-in, JS-based page routing or AI API required.
 */
export function createMethodPages({PATH,ALL_STEPS,stepHref,phaseHref,nextStep,previousStep,layout,esc,label,link,icons}){
 const arrow=icons.arrow;
 const sanitize=s=>esc(String(s??""));
 const total=ALL_STEPS.length;
 const headings={
  1:"Document the whole idea.",2:"Find out if anyone needs it.",3:"Show it before you build it.",
  4:"Make the numbers answer.",5:"Look credible everywhere.",6:"Build only what works.",
  7:"Turn attention into customers.",8:"Prove it can repeat."
 };
 const sourceLinks=links=>(links||[]).map(([title,url])=>'<a class="method-source" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' <span>↗</span></a>').join("");
 const phaseCards=PATH.map((phase,i)=>{
  const starting=phase.steps[0];
  return '<article class="method-phase-card" id="phase-'+esc(phase.id)+'" data-method-phase="'+esc(phase.id)+'">'+
   '<div class="method-phase-card-top"><span class="method-number">'+phase.number+'</span><span class="method-pct" data-progress-phase="'+esc(phase.id)+'">0 / '+phase.steps.length+' complete</span></div>'+
   '<p class="method-tag">'+sanitize(phase.tag)+'</p><h3>'+sanitize(phase.name)+'</h3>'+
   '<p>'+sanitize(phase.subtitle)+'</p>'+
   '<div class="method-phase-steps">'+phase.steps.map((s,index)=>
    '<a href="'+stepHref({...s,phaseId:phase.id})+'"><span>'+String(index+1).padStart(2,"0")+'</span>'+sanitize(s.title)+'</a>').join("")+'</div>'+
   '<a class="method-card-cta" href="'+phaseHref(phase)+'">Open phase '+arrow+'</a></article>';
 }).join("");
 function index(){
  const content='<section class="method-head"><div class="wrap method-head-grid"><div>'+
   label("THE BIZZINTEL METHOD · START WITH STEP ONE")+
   '<h1>From an idea<br>to a real business.<br><em>Follow the steps.</em></h1>'+
   '<p>A practical sequence for founders: use ChatGPT to structure your thinking, research the market, visualize a website, prove the numbers and build only what is worth building.</p>'+
   '<div class="method-actions"><a class="button primary" href="'+stepHref(ALL_STEPS[0])+'">Start with the ChatGPT Project '+arrow+'</a>'+
   '<a href="#all-phases" class="button secondary">See all 8 phases</a></div>'+
   '<div class="method-hero-metrics"><span>8 PHASES</span><span>'+total+' SPECIFIC ACTIONS</span><span>ZERO LOGIN</span></div>'+
   '</div><div class="method-head-aside"><div class="method-mini-docket"><div class="method-mini-top"><span>BUILD FILE / 001</span><span>THE START</span></div>'+
   '<strong>Before anything else...</strong><ol><li>Create your ChatGPT Project</li><li>Add the complete business story</li><li>Set quality-assurance rules</li><li>Build a pass/fail checklist</li></ol>'+
   '<a href="'+stepHref(ALL_STEPS[0])+'">Open the first action ↗</a></div></div></div></section>'+
   '<section class="method-intro"><div class="wrap"><div>'+label("ONE DECISION AT A TIME")+'<h2>Read less. Do more.</h2></div>'+
   '<p>Each page gives you one job, a clear sequence, a prompt you can copy into ChatGPT, a deliverable and a rule for deciding when to move on. The instructions—not the AI—drive the process.</p></div></section>'+
   '<section class="method-directory" id="all-phases"><div class="wrap"><div class="method-directory-head">'+label("THE FULL SEQUENCE")+
   '<h2>Eight phases. In order.</h2><p>Follow from the beginning or jump to the phase you need. Later phases depend on earlier evidence.</p></div>'+
   '<div class="method-phase-grid">'+phaseCards+'</div></div></section>'+
   '<section class="method-bottom"><div class="wrap"><div><span>NOT READY TO COMMIT?</span><h2>Start by documenting the business idea.</h2><p>There is no requirement to buy software, hire a developer or spend on ads to complete the first phase.</p></div>'+
   '<a class="button primary" href="'+stepHref(ALL_STEPS[0])+'">Begin step 01 '+arrow+'</a></div></section>';
  return layout({path:"/method/",heading:"The BizzIntel Method",description:"A specific 8-phase business-building roadmap: create a ChatGPT Project, validate the market, prototype, test finances, launch social profiles, build a secure site and get customers.",body:content});
 }
 function phasePage(phase){
  const phaseIndex=PATH.findIndex(p=>p.id===phase.id);
  const route=phaseHref(phase);
  const content='<section class="method-phase-head"><div class="wrap"><div class="method-crumb">'+link("/method/","The method")+' <span>/</span> Phase '+phase.number+'</div>'+
   label("PHASE "+phase.number+" / "+phase.tag)+
   '<div class="phase-head-inner"><div><h1>'+sanitize(phase.name)+'</h1><p>'+sanitize(phase.subtitle)+'</p>'+
   '<a class="button primary" href="'+stepHref({...phase.steps[0],phaseId:phase.id})+'">Start this phase '+arrow+'</a></div>'+
   '<div class="phase-side"><span>WHAT YOU WILL HAVE AT THE END</span><strong>'+sanitize(phase.result)+'</strong>'+
   '<span>BEFORE YOU MOVE FORWARD</span><p>'+sanitize(phase.gate)+'</p></div></div></div></section>'+
   '<section class="phase-body"><div class="wrap">'+
   '<div class="phase-step-top"><div>'+label("THE ACTION PLAN")+'<h2>Do these '+phase.steps.length+' things.</h2></div>'+
   '<span data-progress-phase="'+esc(phase.id)+'">0 / '+phase.steps.length+' complete</span></div>'+
   '<div class="phase-step-list">'+phase.steps.map((step,index)=>{
    const destination=stepHref({...step,phaseId:phase.id});
    return '<a class="phase-step-row" href="'+destination+'"><span class="phase-step-count">'+String(index+1).padStart(2,"0")+'</span>'+
    '<div><span class="phase-step-time">'+sanitize(step.time)+' · '+sanitize(step.when)+'</span><h3>'+sanitize(step.title)+'</h3>'+
    '<p>'+sanitize(step.goal)+'</p></div><span class="phase-step-open">Open step '+arrow+'</span></a>';
   }).join("")+'</div><div class="phase-exit"><strong>Gate to move forward</strong><p>'+sanitize(phase.gate)+'</p></div>'+
   '<div class="phase-buttons">'+link("/method/","← All phases","inline-link")+
   (PATH[phaseIndex+1]?link(phaseHref(PATH[phaseIndex+1]),"Next phase "+arrow,"inline-link"):"")+'</div></div></section>';
  return layout({path:route,heading:phase.name+" — The BizzIntel Method",description:phase.subtitle+" "+phase.result,body:content});
 }
 function stepPage(phase,step,index){
  const item={...step,phaseId:phase.id};
  const route=stepHref(item);
  const absolute=ALL_STEPS.findIndex(s=>s.id===step.id&&s.phaseId===phase.id);
  const prior=previousStep(phase.id,step.id);
  const next=nextStep(phase.id,step.id);
  const stepNumber=String(absolute+1).padStart(2,"0");
  const phaseStep=index+1;
  const schema={"@context":"https://schema.org","@type":"HowTo",name:step.title,description:step.goal,totalTime:undefined,
   step:step.actions.map((action,i)=>({"@type":"HowToStep",position:i+1,text:action})),url:undefined};
  const content='<section class="single-step-top"><div class="wrap"><div class="method-crumb">'+
   link("/method/","The method")+' <span>/</span> '+link(phaseHref(phase),phase.name)+' <span>/</span> Step '+phaseStep+'</div>'+
   '<div class="single-step-top-grid"><div>'+label("ACTION "+stepNumber+" OF "+total+" · PHASE "+phase.number)+
   '<h1>'+sanitize(step.title)+'</h1><p>'+sanitize(step.goal)+'</p></div>'+
   '<div class="step-timing"><span>WHEN TO DO THIS</span><strong>'+sanitize(step.when)+'</strong>'+
   '<span>ESTIMATED WORK TIME</span><strong>'+sanitize(step.time)+'</strong></div></div></div></section>'+
   '<div class="wrap single-step-layout"><article class="single-step-article">'+
   '<div class="step-intro-banner"><span class="step-intro-icon">↗</span><div><strong>Your one job</strong><p>'+sanitize(step.goal)+'</p></div></div>'+
   '<section class="single-step-section"><div class="section-heading-mini"><span>01</span><h2>Do this now</h2></div>'+
   '<ol class="single-action-list">'+step.actions.map((action,i)=>'<li><span>'+String(i+1).padStart(2,"0")+'</span><p>'+sanitize(action)+'</p></li>').join("")+'</ol></section>'+
   '<section class="single-step-section"><div class="section-heading-mini"><span>02</span><h2>Copy this into ChatGPT</h2></div>'+
   '<p class="step-instruction">Replace anything in [square brackets] with your real business details. The prompt is a shortcut, not a substitute for the steps above.</p>'+
   '<div class="prompt-copybox"><div class="prompt-copy-head"><span>READY-TO-USE PROMPT</span>'+
   '<button type="button" data-copy-text="method-prompt" data-prompt-key="'+esc(phase.id+"/"+step.id)+'" class="method-copy-btn">Copy prompt ↗</button></div>'+
   '<pre id="method-prompt">'+sanitize(step.prompt)+'</pre></div></section>'+
   '<section class="single-step-section"><div class="section-heading-mini"><span>03</span><h2>Finish with this</h2></div>'+
   '<div class="step-output"><strong>'+sanitize(step.output)+'</strong>'+
   '<p>Before moving on, check your work against the following:</p>'+
   '<ul>'+step.check.map(x=>'<li>'+sanitize(x)+'</li>').join("")+'</ul></div></section>'+
   '<div class="step-avoid"><strong>DON’T MAKE THIS MISTAKE</strong><p>'+sanitize(step.avoid)+'</p></div>'+
   (step.links.length?'<section class="single-step-section compact"><div class="section-heading-mini"><span>↗</span><h2>Useful official references</h2></div>'+
   '<div class="method-source-list">'+sourceLinks(step.links)+'</div></section>':'')+
   '<div class="single-step-end"><div><span class="eyebrow">READY TO MOVE ON?</span><p>'+sanitize(phase.gate)+'</p></div>'+
   '<button class="done-step-btn" data-mark-method="'+sanitize(phase.id+"/"+step.id)+'" aria-pressed="false">Mark this step done ✓</button></div>'+
   '<div class="method-prev-next">'+(prior?link(stepHref(prior),"← Previous action","step-prev"):link("/method/","← All phases","step-prev"))+
   (next?link(stepHref(next),"Next action "+arrow,"step-next"):link("/method/","Finish the method "+arrow,"step-next"))+'</div></article>'+
   '<aside class="single-step-side"><div class="sticky-step-nav">'+
   '<div class="step-nav-head"><span>PHASE '+phase.number+'</span><strong>'+sanitize(phase.name)+'</strong><small data-progress-phase="'+phase.id+'">0 / '+phase.steps.length+' complete</small></div>'+
   '<nav aria-label="Steps in this phase">'+phase.steps.map((s,i)=>'<a href="'+stepHref({...s,phaseId:phase.id})+'" class="'+(s.id===step.id?"selected":"")+'"><span class="step-nav-num">'+String(i+1).padStart(2,"0")+'</span>'+
   '<span>'+sanitize(s.title)+'</span><i data-method-completion="'+esc(phase.id+"/"+s.id)+'" aria-hidden="true"></i></a>').join("")+'</nav>'+
   '<a href="'+phaseHref(phase)+'">View phase overview ↗</a></div></aside></div>';
  return layout({path:route,heading:step.title+" — BizzIntel Action "+stepNumber,description:step.goal+" Practical instructions, prompt, checklist and required result.",body:content,type:"article",schema});
 }
 return {index,phasePage,stepPage};
}
