import test from "node:test";
import assert from "node:assert/strict";
import {model,esc,planMarkdown,freshBusiness} from "../src/logic.js";
import {getRoadmap,getReadiness,STAGES,INDUSTRIES} from "../src/journeys.js";
import {PLAYBOOKS,getPlaybook,orderedPlaybooks,playbookProgress,stepKey,stepPrompt,legacyStepKey,responseKey,workbookMarkdown} from "../src/playbooks.js";
test("financials calculate contribution, profit and break-even",()=>{
 assert.deepEqual(model({price:100,variable:30,monthlyFixed:500,monthlyUnits:10}),{contribution:70,revenue:1000,costs:800,profit:200,breakEven:8});
});
test("negative values clamp at zero",()=>assert.equal(model({price:-40,variable:-1}).revenue,0));
test("loss-making unit economics yield no positive break-even",()=>assert.equal(model({price:5,variable:10}).breakEven,null));
test("display strings are escaped",()=>assert.ok(!esc('<img onerror="x">').includes('<img')));
test("stage roadmaps differ",()=>assert.notDeepEqual(getRoadmap({stage:"idea",industry:"service",goal:"validate"}),getRoadmap({stage:"scaling",industry:"service",goal:"validate"})));
test("industry roadmap is distinct",()=>assert.ok(getRoadmap({stage:"setup",industry:"tourism",goal:"validate"}).some(x=>x.id==="industry-tourism")));
test("roadmap IDs are unique for all stages/industries",()=>{
 for(const s of STAGES)for(const i of INDUSTRIES){const arr=getRoadmap({stage:s.id,industry:i.id,goal:"customers"});assert.equal(new Set(arr.map(x=>x.id)).size,arr.length)}
});
test("readiness flags evidence gaps",()=>assert.equal(getReadiness({customer:"Tourists",problem:"No late tours",solution:"Booking tool",evidence:""}).completed,3));
test("exported plan labels unverified facts",()=>assert.match(planMarkdown(freshBusiness("id",{name:"Test LLC"})),/independently verified/));
test("all ten author-specified topic tracks exist",()=>assert.deepEqual(PLAYBOOKS.map(p=>p.id),["ideation","planning","social","pitch","gbp","marketing","automations","opportunities","website","weekly"]));
test("each playbook includes real steps, task and deliverable",()=>{
 for(const p of PLAYBOOKS){
  assert.ok(p.steps.length>=4,p.id+" has enough steps");
  for(const step of p.steps){for(const field of ["id","title","why","do","output","prompt","example","avoid","evidence"])assert.ok(step[field]?.length>3,p.id+"/"+field);assert.ok(step.how?.length>=3,p.id+" has actionable instructions")};
 }
});
test("module progress uses the right business task keys",()=>{
 const p=getPlaybook("social");
 assert.equal(playbookProgress({},p).complete,0);
 assert.equal(playbookProgress({[stepKey(p.id,p.steps[0].id)]:true,[stepKey(p.id,p.steps[1].id)]:true},p).complete,2);
});
test("recommendations respond to stage and goal without restricting access",()=>{
 assert.equal(orderedPlaybooks({stage:"launch",goal:"digital"})[0].id,"social");
 assert.equal(orderedPlaybooks({stage:"operating",goal:"funding"})[0].id,"opportunities");
 assert.equal(orderedPlaybooks({stage:"planning",goal:"validate"}).length,10);
});
test("copyable prompts include the selected business",()=>{
 const p=getPlaybook("pitch");
 assert.match(stepPrompt(p,p.steps[0],{name:"Bahamian Test Co.",stage:"planning",location:"Nassau"}),/Bahamian Test Co/);
});

test("core ideation and planning each have a complete practical decision path",()=>{
 const idea=getPlaybook("ideation"),plan=getPlaybook("planning");
 assert.equal(idea.steps.length,12);
 assert.equal(plan.steps.length,10);
 assert.ok(idea.steps.some(x=>x.id==="root-cause"));
 assert.ok(idea.steps.some(x=>x.id==="demand-test"));
 assert.ok(idea.steps.some(x=>x.id==="decision"));
 assert.ok(plan.steps.some(x=>x.id==="prototype"));
 assert.ok(plan.steps.some(x=>x.id==="cash"));
});
test("step IDs remain unique and stable after inserting a lesson",()=>{
 const p=getPlaybook("ideation");
 assert.equal(new Set(p.steps.map(x=>stepKey(p.id,x.id))).size,p.steps.length);
 const stored={[stepKey(p.id,p.steps[2].id)]:true};
 assert.equal(playbookProgress(stored,p).complete,1);
 assert.equal(legacyStepKey(p.id,2),"pb:ideation:2");
});
test("workbook export includes saved output, stage and evidence references",()=>{
 const p=getPlaybook("ideation"),st=p.steps[0];
 const b={name:"Example Venture",stage:"idea",industry:"service",location:"Nassau",goal:"validate",tasks:{
  [stepKey(p.id,st.id)]:true,
  [responseKey(p.id,st.id)]:"Customer problem: long booking delays.",
  ["pb-source:"+p.id+":"+st.id]:"Interview 2026-10-18"
 }};
 const md=workbookMarkdown(b);
 assert.match(md,/Example Venture/);
 assert.match(md,/Customer problem: long booking delays/);
 assert.match(md,/Interview 2026-10-18/);
 assert.match(md,/Complete/);
});
