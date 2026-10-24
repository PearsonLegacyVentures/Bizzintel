import test from "node:test";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {readFile,stat} from "node:fs/promises";
import {resolve,join} from "node:path";
import {PLAYBOOKS} from "../src/playbooks.js";

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
test("static build publishes 15 standalone public HTML pages",async()=>{
 const output=execFileSync(process.execPath,["scripts/build.mjs"],{encoding:"utf8",env:{...process.env,PUBLIC_INDEXING:"false",SITE_URL:""}});
 assert.match(output,/15 static public pages/);
 const routes=["/","/guides/","/start-here/","/resources/","/about/",...PLAYBOOKS.map(p=>"/guides/"+p.id+"/")];
 assert.equal(routes.length,15);
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
 assert.match(html,/Build a business/);
 assert.match(html,/No login\. No paywall\./);
 assert.match(html,/href="\/guides\/ideation\/"/);
 assert.match(html,/href="\/start-here\/"/);
 assert.doesNotMatch(html,/supabase|\/src\/app\.js|login|sign-up/i);
});
test("unapproved work is not indexed until publication is explicitly enabled",async()=>{
 const html=await readFile(join(dist,"index.html"),"utf8");
 assert.match(html,/noindex,nofollow/);
 assert.match(await readFile(join(dist,"robots.txt"),"utf8"),/Disallow: \//);
});
