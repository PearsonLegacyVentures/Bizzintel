/* Browser-side Supabase client. Uses only publishable credentials, never service secrets. */
const DEFAULTS={supabaseUrl:"",supabasePublishableKey:""};
let config=DEFAULTS;
try{const mod=await import("../config.js");config={...DEFAULTS,...(mod.CONFIG||{})};}catch{}
export const configured=Boolean(config.supabaseUrl && config.supabasePublishableKey);
const host=String(config.supabaseUrl||"").replace(/\/+$/,"");
const key=config.supabasePublishableKey;
const SESSION="bizzintel:session:v1";
let session=null;let refreshTask=null;
const read=()=>{try{return JSON.parse(localStorage.getItem(SESSION)||"null")}catch{return null}};
const write=value=>{session=value;try{value?localStorage.setItem(SESSION,JSON.stringify(value)):localStorage.removeItem(SESSION)}catch{}};
if(configured)session=read();
function url(path){if(!configured)throw Error("Cloud accounts are not configured yet.");return host+path;}
async function request(path,{method="GET",body,auth=true,prefer}={}){
 let token=null;
 if(auth)token=await accessToken();
 const r=await fetch(url(path),{method,headers:{"apikey":key,"Content-Type":"application/json",...(token?{"Authorization":"Bearer "+token}:{}),...(prefer?{"Prefer":prefer}:{})},body:body===undefined?undefined:JSON.stringify(body)});
 const raw=await r.text();
 let payload;try{payload=raw?JSON.parse(raw):null}catch{payload={message:raw||"Request failed"}}
 if(!r.ok)throw Error(payload?.msg||payload?.error_description||payload?.message||payload?.error||("Request failed: "+r.status));
 return payload;
}
export function isLoggedIn(){return configured&&Boolean(session?.refresh_token)}
export async function accessToken(){
 if(!session?.refresh_token)throw Error("Please sign in again.");
 if(session.access_token && (session.expires_at||0)>Date.now()+90000)return session.access_token;
 if(!refreshTask)refreshTask=(async()=>{
   try{
     const s=await request("/auth/v1/token?grant_type=refresh_token",{auth:false,method:"POST",body:{refresh_token:session.refresh_token}});
     write({...s,expires_at:Date.now()+(Number(s.expires_in)||3600)*1000});
     return session.access_token;
   }catch(err){write(null);throw err}
 })().finally(()=>refreshTask=null);
 return refreshTask;
}
export async function signUp(email,password){
 return request("/auth/v1/signup",{auth:false,method:"POST",body:{email,password}});
}
export async function signIn(email,password){
 const s=await request("/auth/v1/token?grant_type=password",{auth:false,method:"POST",body:{email,password}});
 if(!s?.access_token)throw Error("The login did not return a session.");
 write({...s,expires_at:Date.now()+(Number(s.expires_in)||3600)*1000});
 return s.user;
}
export async function resetPassword(email){
 return request("/auth/v1/recover",{auth:false,method:"POST",body:{email}});
}
export async function currentUser(){
 if(!isLoggedIn())return null;
 try{return await request("/auth/v1/user")}catch{write(null);return null}
}
export async function signOut(){
 try{if(isLoggedIn())await request("/auth/v1/logout",{auth:true,method:"POST"});}catch{}finally{write(null)}
}
async function db(table,{method="GET",query="",body,prefer}={}){
 return request("/rest/v1/"+table+(query?"?"+query:""),{method,body,prefer});
}
const q=filters=>new URLSearchParams(filters).toString();
export async function listBusinesses(){
 return db("businesses",{query:q({select:"*",order:"updated_at.desc"})});
}
export async function addBusiness(payload){return (await db("businesses",{method:"POST",body:payload,prefer:"return=representation"}))[0]}
export async function saveBusiness(id,payload){
 const rows=await db("businesses",{method:"PATCH",query:q({id:"eq."+id,select:"*"}),body:payload,prefer:"return=representation"});
 if(!rows?.length)throw Error("Business was not found or could not be updated.");
 return rows[0];
}
export async function removeBusiness(id){return db("businesses",{method:"DELETE",query:q({id:"eq."+id})})}
export async function listNotes(businessId){
 return db("business_notes",{query:q({select:"*",business_id:"eq."+businessId,order:"created_at.desc"})});
}
export async function addNote(payload){return (await db("business_notes",{method:"POST",body:payload,prefer:"return=representation"}))[0]}
export async function removeNote(id){return db("business_notes",{method:"DELETE",query:q({id:"eq."+id})})}
export async function listArtifacts(businessId){return db("business_artifacts",{query:q({select:"*",business_id:"eq."+businessId,order:"updated_at.desc"})})}
export async function addArtifact(payload){return (await db("business_artifacts",{method:"POST",body:payload,prefer:"return=representation"}))[0]}
export async function saveArtifact(id,content,title){return db("business_artifacts",{method:"PATCH",query:q({id:"eq."+id}),body:{content,title,updated_at:new Date().toISOString()},prefer:"return=representation"})}
export async function removeArtifact(id){return db("business_artifacts",{method:"DELETE",query:q({id:"eq."+id})})}
export async function listMessages(businessId){return db("advisor_messages",{query:q({select:"*",business_id:"eq."+businessId,order:"created_at.asc",limit:"60"})})}
export async function askAdvisor(businessId,intent,message){
 return request("/functions/v1/advisor",{method:"POST",body:{businessId,intent,message}});
}
