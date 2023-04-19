var fs =  require('fs');

var http = require('http');

fs.writeFileSync("readme.txt", " hey this  is the file you need to read");


var server = http.createServer(handleRequest);

function handleRequest(req, res){

    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000,()=>{
    console.log('server work on 3k');
})