var http = require('http');

var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res){
    var dataFormate = req.headers("content-type");
    var store = '';

    req.on('data',(chunk) => {
        store = store + chunk;
    });

    req.on('end',()=>{
      if(dataFormate === "application/json"){

        var parsedData = JSON.parse(store);

        res.end(store);
      }

      if(dataFormate === "application/x-www-form-urlencoded"){

       var parsedData =  qs.parse(store);

       res.end(JSON.stringify(store));
      }
    })
}


server.listen(7000, ()=>{
    console.log('server listening on port 7k');
})