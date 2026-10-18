import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','favicon.svg','_headers'])await copyFile(file,'dist/'+file);
await cp('src','dist/src',{recursive:true});
try{await copyFile('config.js','dist/config.js');}catch{await copyFile('config.example.js','dist/config.js');}
console.log('dist/ ready for Cloudflare Pages (no framework preset).');
