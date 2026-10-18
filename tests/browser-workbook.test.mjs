import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {STAGES,INDUSTRIES,GOALS,getRoadmap,getReadiness} from "../src/journeys.js";
import {PLAYBOOKS,getPlaybook,stepKey,responseKey,getStepResponse,isStepDone,playbookProgress,orderedPlaybooks,stepPrompt,workbookMarkdown} from "../src/playbooks.js";
import {esc,model,money,planMarkdown,freshBusiness,slug,download} from "../src/logic.js";

const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const store=new Map();
const localStorage={
 getItem:k=>store.get(k)??null,
 setItem:(k,v)=>store.set(k,String(v)),
 removeItem:k=>store.delete(k)
};
class FakeFormData {
 constructor(form){this.form=form}
 entries(){return Object.entries(this.form.fields)[Symbol.iterator]()}
}
async function appInstance(){
 const appSource=(await readFile("src/app.js","utf8")).replace(/^import .*?;[ \t]*$/gm,"")+
 "\nreturn {state,demoSetup,go,saveChanges};";
 const root={innerHTML:""},toast={textContent:"",classList:{add(){},remove(){}}};
 const listeners={};
 const document={querySelector:s=>s==="#app"?root:s==="#toast"?toast:null,addEventListener:(type,fn)=>listeners[type]=fn};
 const location={hash:"#/home"},window={addEventListener(){}};
 const instance=await new AsyncFunction(
  "api","STAGES","INDUSTRIES","GOALS","getRoadmap","getReadiness",
  "PLAYBOOKS","getPlaybook","stepKey","responseKey","getStepResponse","isStepDone","playbookProgress","orderedPlaybooks","stepPrompt","workbookMarkdown",
  "h","model","money","planMarkdown","freshBusiness","slug","download",
  "document","location","window","scrollTo","crypto","FormData","localStorage",
  appSource
 )(
  {configured:false},STAGES,INDUSTRIES,GOALS,getRoadmap,getReadiness,
  PLAYBOOKS,getPlaybook,stepKey,responseKey,getStepResponse,isStepDone,playbookProgress,orderedPlaybooks,stepPrompt,workbookMarkdown,
  esc,model,money,planMarkdown,freshBusiness,slug,download,
  document,location,window,()=>{},
  {randomUUID:()=>"11111111-1111-4111-8111-111111111111"},FakeFormData,localStorage
 );
 return {instance,root,listeners};
}
test("browser-only workbook saves and restores a meaningful completed exercise",async()=>{
 store.clear();
 const first=await appInstance();
 first.instance.demoSetup();
 assert.ok(store.has("bizzintel:browser-workspace:v1"));
 first.instance.state.playbookId="ideation";
 first.instance.state.stepIndex=0;
 first.instance.go("lesson");
 assert.match(first.root.innerHTML,/How to do it/);
 assert.match(first.root.innerHTML,/Your deliverable/);
 const form={id:"lesson-form",fields:{
  notes:"Interviewed two people about appointment coordination and documented friction.",
  source:"Interview notes 18 October 2026",
  next:"Validate the root cause next"
 }};
 await first.listeners.submit({preventDefault(){},target:form,submitter:{value:"complete"}});
 const original=first.instance.state.businesses[0];
 assert.equal(original.tasks[stepKey("ideation","problem")],true);
 assert.match(original.tasks[responseKey("ideation","problem")],/Interviewed two people/);
 assert.equal(original.tasks["pb-source:ideation:problem"],"Interview notes 18 October 2026");
 const second=await appInstance();
 second.instance.demoSetup();
 assert.equal(second.instance.state.businesses[0].tasks[stepKey("ideation","problem")],true);
 assert.match(second.instance.state.businesses[0].tasks[responseKey("ideation","problem")],/Interviewed two people/);
});
test("inadequate answers cannot be marked complete",async()=>{
 store.clear();
 const user=await appInstance();user.instance.demoSetup();
 user.instance.state.playbookId="ideation";user.instance.state.stepIndex=1;user.instance.go("lesson");
 const form={id:"lesson-form",fields:{notes:"good",source:"",next:""}};
 await user.listeners.submit({preventDefault(){},target:form,submitter:{value:"complete"}});
 assert.notEqual(user.instance.state.businesses[0].tasks[stepKey("ideation","root-cause")],true);
});
