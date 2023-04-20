var http = require('http');

var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res){
    var store = '';

    req.on('data',(chunk) => {
        store = store + chunk;
    });

    req.on('end',()=>{
        console.log(store);
      if(req.method === "POST" && req.url === "/json"){
        res.setHeader('content-type', 'application/json');
    res.end(store);
      }

      if(req.method ==="POST" && req.url === "/form"){
        res.setHeader('content-type', 'application/x-www-form-urlencoded');
        console.log(store);

       var formData = qs.parse(store);
       res.end (JSON.stringify(formData));
      }
    })
}


server.listen(7000, ()=>{
    console.log('server listening on port 7k');
})