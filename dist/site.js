/* Progressive interactions. Content remains readable and linked without JavaScript. */
const $=(query,root=document)=>root.querySelector(query);
const $$=(query,root=document)=>[...root.querySelectorAll(query)];
const toast=(msg)=>{
 const el=$("#toast");if(!el)return;
 el.textContent=msg;el.classList.add("visible");
 clearTimeout(toast.handle);
 toast.handle=setTimeout(()=>el.classList.remove("visible"),2900);
};
async function copyText(text){
 try{
  if(!navigator.clipboard?.writeText)throw Error("Clipboard API unavailable");
  await navigator.clipboard.writeText(text);
  toast("Copied to clipboard.");
 }catch{
  try{
   const area=document.createElement("textarea");area.value=text;
   area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";
   document.body.appendChild(area);area.select();
   const copied=document.execCommand("copy");area.remove();
   toast(copied?"Copied to clipboard.":"Select and copy the text manually.");
  }catch{toast("Automatic copying is unavailable. Select the text manually.")}
 }
}
const toggle=$(".menu-toggle");
if(toggle){
 toggle.addEventListener("click",()=>{
  const open=toggle.getAttribute("aria-expanded")!=="true";
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  $("#main-navigation")?.classList.toggle("open",open);
 });
 $$("#main-navigation a").forEach(link=>link.addEventListener("click",()=>{
  toggle.setAttribute("aria-expanded","false");$("#main-navigation")?.classList.remove("open");
 }));
}
let selectedStage="all";
const search=$("#guide-search");
const count=$("#filter-count");
const filter=()=>{
 const term=search?.value?.trim().toLocaleLowerCase()||"";
 let shown=0;
 $$(".guide-card").forEach(card=>{
  const tags=card.dataset.stages?.split(/\s+/)||[];
  const fit=selectedStage==="all"||tags.includes(selectedStage);
  const match=!term||(card.dataset.search||"").includes(term);
  const visible=fit&&match;
  card.hidden=!visible;if(visible)shown++;
 });
 $$(".guide-category").forEach(group=>{
  group.hidden=$$(".guide-card:not([hidden])",group).length===0;
 });
 const none=$("#no-results");if(none)none.hidden=shown>0;
 if(count)count.textContent=shown===10?"Showing all 10 guides":"Showing "+shown+" of 10 guides";
 const clear=$("#clear-search");if(clear)clear.hidden=!term;
};
if(search){
 search.addEventListener("input",filter);
 $("#clear-search")?.addEventListener("click",()=>{search.value="";search.focus();filter()});
 $$(".stage-selector [data-stage]").forEach(button=>button.addEventListener("click",()=>{
  selectedStage=button.dataset.stage||"all";
  $$(".stage-selector [data-stage]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
  filter();
 }));
}
$$(".copy-prompt").forEach(button=>button.addEventListener("click",()=>{
 const block=document.getElementById(button.dataset.copy||"");
 if(block)copyText(block.textContent||"");
}));
$$(".copy-checklist").forEach(button=>button.addEventListener("click",()=>{
 const title=$(".article-head h1")?.textContent?.trim()||"BizzIntel guide";
 const sections=$$(".lesson");
 if(!sections.length)return;
 const lines=[title,"",...sections.flatMap((section,i)=>{
  const name=$("h2",section)?.textContent?.trim()||"Lesson "+(i+1);
  const list=$$(".action-list li",section).map(step=>"  • "+step.textContent.trim());
  const outcome=$(".takeaway p",section)?.textContent.trim()||"";
  return [(i+1)+". "+name,...list,"  Deliverable: "+outcome,""];
 })];
 copyText(lines.join("\n"));
}));
/* Highlight the relevant lesson in the table of contents while scrolling. */
const tocLinks=$$(".toc a[href^='#']");
if(tocLinks.length&&"IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(item=>item.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
  if(!visible.length)return;
  const id=visible[0].target.id;
  tocLinks.forEach(a=>{
   if(a.getAttribute("href")==="#"+id)a.setAttribute("aria-current","location");
   else a.removeAttribute("aria-current");
  });
 },{rootMargin:"-15% 0px -65% 0px",threshold:0});
 $$(".lesson[id]").forEach(section=>observer.observe(section));
}


/* Method pages: optional device-local progress and visible copy controls.
   Site content remains fully accessible if local storage or JS is blocked. */
const METHOD_KEY="bizzintel-method-progress-v1";
function methodData(){
 try{const value=JSON.parse(localStorage.getItem(METHOD_KEY)||"{}");return value&&typeof value==="object"?value:{}}catch{return {}}
}
function methodSave(value){
 try{localStorage.setItem(METHOD_KEY,JSON.stringify(value));return true}catch{return false}
}
function methodRefresh(){
 const data=methodData();
 $$("[data-progress-phase]").forEach(el=>{
  const phase=el.getAttribute("data-progress-phase");
  const keys=el.getAttribute("data-progress-keys")?.split(",").filter(Boolean);
  const steps=keys?.length?keys:$('[data-method-completion^="'+phase+'/"]').map(node=>node.getAttribute("data-method-completion"));
  if(steps.length){
   const count=steps.filter(key=>Boolean(data[key])).length;
   el.textContent=count+" / "+steps.length+" complete";
  }
 });
 $$("[data-method-completion]").forEach(el=>{
  const done=Boolean(data[el.getAttribute("data-method-completion")]);
  el.classList.toggle("done",done);
 });
 $$("[data-mark-method]").forEach(button=>{
  const done=Boolean(data[button.getAttribute("data-mark-method")]);
  button.setAttribute("aria-pressed",String(done));
  button.textContent=done?"Completed ✓ · Reopen":"Mark this step done ✓";
 });
}
$$("[data-copy-text]").forEach(button=>button.addEventListener("click",()=>{
 const element=document.getElementById(button.getAttribute("data-copy-text"));
 if(element)copyText(element.textContent||"");
}));
$$("[data-mark-method]").forEach(button=>button.addEventListener("click",()=>{
 const key=button.getAttribute("data-mark-method");
 const data=methodData();
 if(data[key])delete data[key];else data[key]=true;
 const saved=methodSave(data);
 methodRefresh();
 toast(saved?(data[key]?"Marked complete on this device.":"Step reopened."):"Progress cannot be saved in this browser.");
}));
methodRefresh();
