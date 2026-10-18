import {mkdir,copyFile,cp,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','favicon.svg','_headers'])await copyFile(file,'dist/'+file);
await cp('src','dist/src',{recursive:true});
const url=process.env.BIZZINTEL_SUPABASE_URL?.trim();
const key=process.env.BIZZINTEL_SUPABASE_PUBLISHABLE_KEY?.trim();
if(Boolean(url)!==Boolean(key))throw Error('Provide BOTH BIZZINTEL_SUPABASE_URL and BIZZINTEL_SUPABASE_PUBLISHABLE_KEY.');
if(url&&key){
 const parsed=new URL(url);
 if(parsed.protocol!=='https:')throw Error('Supabase URL must use HTTPS.');
 if(!/^[a-zA-Z0-9_.-]+$/.test(key))throw Error('Publishable key has an unexpected format.');
 await writeFile('dist/config.js','export const CONFIG = '+JSON.stringify({supabaseUrl:url,supabasePublishableKey:key,appName:'BizzIntel'})+';\n');
}else{
 try{await copyFile('config.js','dist/config.js');}
 catch{await copyFile('config.example.js','dist/config.js');}
}
console.log('Cloudflare build completed ('+(url?'connected config':'demo config')+').');
