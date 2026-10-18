import test from "node:test";
import assert from "node:assert/strict";
import {model,esc,planMarkdown,freshBusiness} from "../src/logic.js";
import {getRoadmap,getReadiness,getSuggestedQuestion,STAGES,INDUSTRIES} from "../src/journeys.js";
test("financials calculate correct contribution and break even",()=>{
 assert.deepEqual(model({price:100,variable:30,monthlyFixed:500,monthlyUnits:10}),{contribution:70,revenue:1000,costs:800,profit:200,breakEven:8});
});
test("negative input is rejected as zero",()=>assert.equal(model({price:-40,variable:-1}).revenue,0));
test("nonpositive contribution returns null break even",()=>assert.equal(model({price:5,variable:10}).breakEven,null));
test("escaping handles script payloads",()=>assert.ok(!esc('<img onerror="x">').includes('<img')));
test("stage-specific roadmaps differ",()=>assert.notDeepEqual(getRoadmap({stage:"idea",industry:"service",goal:"validate"}),getRoadmap({stage:"scaling",industry:"service",goal:"validate"})));
test("industry roadmap differs",()=>assert.ok(getRoadmap({stage:"setup",industry:"tourism",goal:"validate"}).some(x=>x.id==="industry-tourism")));
test("roadmap IDs distinct",()=>{for(const s of STAGES)for(const i of INDUSTRIES){const arr=getRoadmap({stage:s.id,industry:i.id,goal:"customers"});assert.equal(new Set(arr.map(x=>x.id)).size,arr.length)}});
test("readiness reports missing evidence",()=>assert.equal(getReadiness({customer:"Tourists",problem:"No late tours",solution:"Booking tool",evidence:""}).completed,3));
test("advisor prompt never asserts factual results",()=>assert.match(getSuggestedQuestion({}, "challenge"),/assumptions/));
test("export plan labels unverified facts",()=>assert.match(planMarkdown(freshBusiness("id",{name:"Test LLC"})),/No facts or results have been independently verified/));
