import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {STAGES,INDUSTRIES,GOALS,ADVISOR_MODES,getRoadmap,getReadiness,getSuggestedQuestion} from "../src/journeys.js";
import {esc,model,money,planMarkdown,freshBusiness,slug,download} from "../src/logic.js";

const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
test("welcome and demo render every primary app route",async()=>{
 const code=(await readFile("src/app.js","utf8")).replace(/^import .*?;[ \t]*$/gm,"")+
 "\nreturn {state,render,demoSetup,go};";
 const root={innerHTML:""};
 const toaster={textContent:"",classList:{add(){},remove(){}}};
 const handlers={};
 const document={querySelector:s=>s==="#app"?root:toaster,addEventListener:(kind,handler)=>handlers[kind]=handler};
 const window={addEventListener(){}};
 const location={hash:"#/home"};
 const app=await new AsyncFunction("api","STAGES","INDUSTRIES","GOALS","ADVISOR_MODES",
 "getRoadmap","getReadiness","getSuggestedQuestion","h","model","money","planMarkdown",
 "freshBusiness","slug","download","document","location","window","scrollTo","crypto",code)(
  {configured:false},STAGES,INDUSTRIES,GOALS,ADVISOR_MODES,getRoadmap,getReadiness,getSuggestedQuestion,
  esc,model,money,planMarkdown,freshBusiness,slug,download,
  document,location,window,()=>{}, {randomUUID:()=>"77eb3537-4a71-474c-9a99-05653431a782"});
 assert.match(root.innerHTML,/Explore the demo/);
 app.demoSetup();
 for(const route of ["home","business","journey","advisor","evidence","documents","financials","toolkit","settings","new"]){
  app.go(route);
  assert.ok(root.innerHTML.length>1500,route+" rendered");
  assert.match(root.innerHTML,/BizzIntel|bizz/);
 }
 app.go("journey");
 const id=getRoadmap(app.state.businesses[0])[0].id;
 const target={closest(selector){return selector==="[data-task]"?{dataset:{task:id}}:null}};
 await handlers.click({target});
 assert.equal(app.state.businesses[0].tasks[id],true,"demo roadmap task toggled");
});
test("database migration defines owner isolation policies for exposed tables",async()=>{
 const sql=await readFile("supabase/migrations/20261018160000_initial_bizzintel.sql","utf8");
 for(const table of ["businesses","business_notes","business_artifacts","advisor_messages","advisor_runs"])
  assert.match(sql,new RegExp("alter table public\\."+table+" enable row level security","i"));
 assert.match(sql,/owner_id=\(select auth\.uid\(\)\)/);
 assert.doesNotMatch(sql,/using\s*\(\s*true\s*\)/i);
});
test("no secret keys are present in public configuration template",async()=>{
 const config=await readFile("config.example.js","utf8");
 assert.doesNotMatch(config,/sk_(?:live|test)_[a-zA-Z0-9]{12}/);
 assert.match(config,/supabasePublishableKey/);
});
