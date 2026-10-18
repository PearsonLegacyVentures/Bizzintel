import test from "node:test";
import assert from "node:assert/strict";
import {model,esc,planMarkdown,freshBusiness} from "../src/logic.js";
import {getRoadmap,getReadiness,STAGES,INDUSTRIES} from "../src/journeys.js";
import {PLAYBOOKS,getPlaybook,orderedPlaybooks,playbookProgress,stepKey,stepPrompt} from "../src/playbooks.js";
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
  for(const step of p.steps)for(const field of ["title","why","do","output","prompt"])assert.ok(step[field]?.length>15,p.id+"/"+field);
 }
});
test("module progress uses the right business task keys",()=>{
 const p=getPlaybook("social");
 assert.equal(playbookProgress({},p).complete,0);
 assert.equal(playbookProgress({[stepKey(p.id,0)]:true,[stepKey(p.id,1)]:true},p).complete,2);
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
