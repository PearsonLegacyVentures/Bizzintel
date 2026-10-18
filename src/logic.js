export function esc(v=""){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
export function number(v){const n=Number(v);return Number.isFinite(n)&&n>=0?n:0}
export function money(v){return new Intl.NumberFormat("en-BS",{style:"currency",currency:"BSD",maximumFractionDigits:0}).format(Number(v)||0)}
export function model({price=0,variable=0,monthlyFixed=0,monthlyUnits=0}){
 price=number(price);variable=number(variable);monthlyFixed=number(monthlyFixed);monthlyUnits=number(monthlyUnits);
 const contribution=price-variable;
 const sales=price*monthlyUnits;
 const costs=variable*monthlyUnits+monthlyFixed;
 return {contribution,revenue:sales,costs,profit:sales-costs,breakEven:contribution>0?Math.ceil(monthlyFixed/contribution):null};
}
export function freshBusiness(userId,values){
 return {owner_id:userId,name:String(values.name||"").trim(),stage:values.stage||"idea",industry:values.industry||"service",location:values.location||"The Bahamas",goal:values.goal||"validate",summary:"",customer:"",problem:"",solution:"",evidence:"",tasks:{}};
}
export function planMarkdown(b){
 return "# "+b.name+" — Working business plan\n\n"+
 "Stage: "+b.stage+"\nIndustry: "+b.industry+"\nLocation: "+b.location+"\n\n"+
 [["Business overview",b.summary],["Customer",b.customer],["Customer problem",b.problem],["Proposed solution",b.solution],["Observed evidence",b.evidence],["Current objective",b.goal]].map(([title,value])=>"## "+title+"\n"+(value?.trim()||"Not yet documented")+"\n").join("\n")+
 "\nThis is a working draft based on founder-supplied information. No facts or results have been independently verified.\n";
}
export function download(name,text,type="text/plain"){
 const url=URL.createObjectURL(new Blob([text],{type}));
 const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export function slug(value){return String(value||"business").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,50)}
