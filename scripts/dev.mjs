import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {extname,resolve,sep} from "node:path";
const root=resolve("dist");
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json",".xml":"application/xml",".txt":"text/plain"};
createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const file=resolve(root,"."+pathname);
  if(!(file===root||file.startsWith(root+sep))){res.writeHead(403);res.end("Forbidden");return}
  let found=file,stats=await stat(found).catch(()=>null);
  if(stats?.isDirectory()){found=resolve(found,"index.html");stats=await stat(found).catch(()=>null)}
  if(!stats?.isFile()){res.writeHead(404);res.end("Page not found");return}
  res.writeHead(200,{"Content-Type":types[extname(found)]||"application/octet-stream","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
  res.end(await readFile(found));
 }catch{res.writeHead(400);res.end("Invalid request")}
}).listen(4173,()=>console.log("BizzIntel public site: http://127.0.0.1:4173"));
