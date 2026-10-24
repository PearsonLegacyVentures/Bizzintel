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
