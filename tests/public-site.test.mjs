import test from "node:test";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {readFile,stat} from "node:fs/promises";
import {resolve,join} from "node:path";
import {PLAYBOOKS} from "../src/playbooks.js";
import {PATH,ALL_STEPS,phaseHref,stepHref,nextStep} from "../src/method.js";

const root=resolve(".");
const dist=resolve(root,"dist");
async function exists(path){return (await stat(path).catch(()=>null))?.isFile()===true}
function localTarget(href){
 if(href.startsWith("#")||/^[a-z]+:\/\//i.test(href)||href.startsWith("mailto:")||href.startsWith("tel:"))return null;
 const path=decodeURIComponent(href.split("#")[0].split("?")[0]);
 if(!path.startsWith("/"))return null;
 if(path==="/")return join(dist,"index.html");
 if(path.endsWith("/"))return join(dist,path,"index.html");
 return join(dist,path);
}
test("static build publishes 56 standalone public HTML pages",async()=>{
 const output=execFileSync(process.execPath,["scripts/build.mjs"],{encoding:"utf8",env:{...process.env,PUBLIC_INDEXING:"false",SITE_URL:""}});
 assert.match(output,/56 static pages/);
 const routes=["/","/guides/","/start-here/","/resources/","/about/",...PLAYBOOKS.map(p=>"/guides/"+p.id+"/"),"/method/",...PATH.map(phaseHref),...ALL_STEPS.map(stepHref)];
 assert.equal(routes.length,56);
 for(const route of routes){
  const path=localTarget(route),html=await readFile(path,"utf8");
  assert.match(html,/<!doctype html>/i);
  assert.match(html,/<h1[\s>]/i);
  assert.match(html,/<main id="main">/);
  assert.match(html,/<meta name="description"/);
  assert.match(html,/<nav id="main-navigation"/);
  assert.doesNotMatch(html,/id="auth-form"|Sign in to continue/);
 }
});
test("all 62 instructional steps, examples and required outputs render as readable HTML",async()=>{
 let count=0;
 for(const p of PLAYBOOKS){
  const html=await readFile(localTarget("/guides/"+p.id+"/"),"utf8");
  const sections=(html.match(/class="lesson" id="/g)||[]).length;
  assert.equal(sections,p.steps.length,p.id);
  assert.match(html,/What to do/);
  assert.match(html,/What you should finish with/);
  assert.match(html,/EXAMPLE \/ ILLUSTRATIVE/);
  assert.match(html,/AVOID THIS/);
  assert.match(html,/Copy checklist/);
  count+=sections;
 }
 assert.equal(count,62);
});
test("every local internal link resolves to generated page or asset",async()=>{
 const routes=["/","/guides/","/start-here/","/resources/","/about/",...PLAYBOOKS.map(p=>"/guides/"+p.id+"/")];
 for(const route of routes){
  const html=await readFile(localTarget(route),"utf8");
  const links=[...html.matchAll(/href="([^"]+)"/g)].map(match=>match[1]);
  for(const href of links){
   const target=localTarget(href);
   if(target)assert.ok(await exists(target),route+" links to missing "+href);
  }
 }
});
test("homepage is content-first and links directly into business tutorials",async()=>{
 const html=await readFile(join(dist,"index.html"),"utf8");
 assert.match(html,/Here is how/);
 assert.match(html,/NO LOGIN REQUIRED/);
 assert.match(html,/href="\/method\/capture\/project\/"/);
 assert.match(html,/href="\/method\/"/);
 assert.doesNotMatch(html,/supabase|\/src\/app\.js|id="auth-form"|data-action="signout"/i);
});
test("unapproved work is not indexed until publication is explicitly enabled",async()=>{
 const html=await readFile(join(dist,"index.html"),"utf8");
 assert.match(html,/noindex,nofollow/);
 assert.match(await readFile(join(dist,"robots.txt"),"utf8"),/Disallow: \//);
});

test("all method pages offer a concrete action, prompt, deliverable and next step",async()=>{
 assert.equal(PATH.length,8);
 assert.equal(ALL_STEPS.length,32);
 const keys=new Set();
 for(const phase of PATH){
  const html=await readFile(localTarget(phaseHref(phase)),"utf8");
  assert.match(html,/WHAT YOU WILL HAVE AT THE END/);
  assert.match(html,/Gate to move forward/);
  for(const step of phase.steps){
   const key=phase.id+"/"+step.id;
   assert.ok(!keys.has(key),"duplicate step key "+key);
   keys.add(key);
   assert.ok(step.actions.length>=3,"missing instructions "+key);
   assert.ok(step.check.length>=3,"missing acceptance checks "+key);
   const lesson=await readFile(localTarget(stepHref({...step,phaseId:phase.id})),"utf8");
   assert.match(lesson,/Do this now/);
   assert.match(lesson,/Copy this into ChatGPT/);
   assert.match(lesson,/Finish with this/);
   assert.match(lesson,/data-mark-method/);
   assert.match(lesson,/READY-TO-USE PROMPT/);
  }
 }
 assert.equal(keys.size,32);
 assert.equal(nextStep("grow","library"),null);
});
test("first method action sets up a ChatGPT Project with quality standards",async()=>{
 const html=await readFile(localTarget("/method/capture/project/"),"utf8");
 assert.match(html,/ChatGPT Project/);
 assert.match(html,/Business Source of Truth/);
 assert.match(html,/quality rules|quality standards|confirmed facts/i);
});
test("strategy pages contain linked official references for GBP, SEO, chamber and Toastmasters",async()=>{
 const references=[
 ["/method/presence/gbp/","support.google.com/business/answer/13763036"],
 ["/method/presence/seo/","developers.google.com/search/docs/fundamentals/seo-starter-guide"],
 ["/method/customers/network/","thebahamaschamber.com"],
 ["/method/customers/network/","toastmasters.org/find-a-club"]
 ];
 for(const [path,url] of references)assert.ok((await readFile(localTarget(path),"utf8")).includes(url),path+" missing "+url);
});
