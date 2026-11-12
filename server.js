const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname; const port=8123;
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  const fp=path.join(root,p);
  if(!fp.startsWith(root)){res.writeHead(403);return res.end('no');}
  fs.readFile(fp,(e,data)=>{ if(e){res.writeHead(404);return res.end('not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(fp)]||'application/octet-stream','Cache-Control':'no-store'}); res.end(data); });
}).listen(port,()=>console.log('serving on http://localhost:'+port));
