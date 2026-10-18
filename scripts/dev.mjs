import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {extname,resolve,sep} from 'node:path';
const root=resolve('.');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
const server=createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const filename=resolve(root,'.'+pathname);
    if(!filename.startsWith(root+sep)&&filename!==root)throw Error('Forbidden');
    let target=filename;
    if((await stat(target).catch(()=>null))?.isDirectory())target=resolve(target,'index.html');
    if(!(await stat(target).catch(()=>null))?.isFile()){res.writeHead(404);return res.end('Not found');}
    const data=await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(data);
  } catch {res.writeHead(403);res.end('Forbidden');}
});
server.listen(4173,()=>console.log('BizzIntel at http://127.0.0.1:4173'));
