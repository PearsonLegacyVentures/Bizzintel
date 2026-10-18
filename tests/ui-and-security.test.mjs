import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {STAGES,INDUSTRIES,GOALS,getRoadmap,getReadiness} from "../src/journeys.js";
import {PLAYBOOKS,getPlaybook,stepKey,playbookProgress,orderedPlaybooks,stepPrompt} from "../src/playbooks.js";
import {esc,model,money,planMarkdown,freshBusiness,slug,download} from "../src/logic.js";
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
test("welcome, ten main views and guided lesson render with no AI required",async()=>{
 const code=(await readFile("src/app.js","utf8")).replace(/^import .*?;[ \t]*$/gm,"")+"\nreturn {state,render,demoSetup,go};";
 const root={innerHTML:""}, toaster={textContent:"",classList:{add(){},remove(){}}};
 const handlers={};
 const document={querySelector:s=>s==="#app"?root:toaster,addEventListener:(k,cb)=>handlers[k]=cb};
 const window={addEventListener(){}}, location={hash:"#/home"};
 const app=await new AsyncFunction(
  "api","STAGES","INDUSTRIES","GOALS","getRoadmap","getReadiness",
  "PLAYBOOKS","getPlaybook","stepKey","playbookProgress","orderedPlaybooks","stepPrompt",
  "h","model","money","planMarkdown","freshBusiness","slug","download",
  "document","location","window","scrollTo","crypto",code
 )(
  {configured:false},STAGES,INDUSTRIES,GOALS,getRoadmap,getReadiness,
  PLAYBOOKS,getPlaybook,stepKey,playbookProgress,orderedPlaybooks,stepPrompt,
  esc,model,money,planMarkdown,freshBusiness,slug,download,
  document,location,window,()=>{}, {randomUUID:()=>"77eb3537-4a71-474c-9a99-05653431a782"}
 );
 assert.match(root.innerHTML,/Explore the demo/);
 app.demoSetup();
 for(const route of ["home","business","journey","playbooks","evidence","documents","financials","settings","new"]){
  app.go(route);assert.ok(root.innerHTML.length>1500,route+" renders");assert.match(root.innerHTML,/BizzIntel|bizz/);
 }
 app.go("playbooks");assert.match(root.innerHTML,/Social|social media/);
 const playbook={dataset:{openPlaybook:"gbp"}};
 await handlers.click({target:{closest:s=>s==="[data-open-playbook]"?playbook:null}});
 assert.equal(app.state.playbookId,"gbp");assert.equal(app.state.page,"lesson");
 assert.match(root.innerHTML,/Google Business Profile/);
 assert.match(root.innerHTML,/Optional copyable prompt/);
 await handlers.click({target:{closest:s=>s==="[data-open-step]"?{dataset:{openStep:"2"}}:null}});
 assert.equal(app.state.stepIndex,2);
 assert.match(root.innerHTML,/Complete the business details/);
 app.go("journey");
 const id=getRoadmap(app.state.businesses[0])[0].id;
 await handlers.click({target:{closest:s=>s==="[data-task]"?{dataset:{task:id}}:null}});
 assert.equal(app.state.businesses[0].tasks[id],true);
});
test("schema defines row-level security for business owner data",async()=>{
 const sql=await readFile("supabase/migrations/20261018160000_initial_bizzintel.sql","utf8");
 for(const table of ["businesses","business_notes","business_artifacts"])
  assert.match(sql,new RegExp("alter table public\\."+table+" enable row level security","i"));
 assert.match(sql,/owner_id=\(select auth\.uid\(\)\)/);
 assert.doesNotMatch(sql,/using\s*\(\s*true\s*\)/i);
 assert.doesNotMatch(sql,/advisor_messages|advisor_runs/);
});
test("no OpenAI endpoint or key dependency exists in deployed application",async()=>{
 const backend=await readFile("src/backend.js","utf8");
 const app=await readFile("src/app.js","utf8");
 assert.doesNotMatch(backend,/functions\/v1\/advisor|askAdvisor/);
 assert.doesNotMatch(app,/advisorPage|advisor-form/);
 const config=await readFile("config.example.js","utf8");
 assert.match(config,/supabasePublishableKey/);
 assert.doesNotMatch(config,/OPENAI_API_KEY/);
});
