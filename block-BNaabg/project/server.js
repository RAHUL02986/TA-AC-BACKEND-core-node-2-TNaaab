var http = require('http');

var fs = require('fs');

var qs = require('querystring');

var path = require('path');

var url = require('url');

var server = http.createServer(handleRequest);

var userPath = __dirname + "/users/";


function handleRequest(req, res){

    var parsedUrl = url.parse(req.url, true);

    var store = "";

    req.on('data', (chunk)=>{
    store += chunk;
    })

    req.on('end', ()=>{

        if(req.method === "POST" && req.url=== "/users"){
            var username = (store).username;
            fs.open(userPath + username + ".json", "wx", (err, fd) => {
                if (err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                if (err) return console.log(err);
                fs.close(fd, () => {
                    return res.end(`${username} created successfully`);
                });
                });
            });

        }
       if(parsedUrl.pathname === "/users" && req.method=== "GET"){
               var username = parsedUrl.query.username;

               fs.readFile(userPath + username + ".json",(err,content)=>{
                if(err) console.log(err);
                res.setHeader('content-type', 'application/json');
                return res.end(content);
               })

       } 

       if (parsedUrl.pathname === "/users" && req.method === "PUT") {
        var username = parsedUrl.query.username;
        fs.open(userPath + username + ".json", "r+", (err, fd) => {
            if (err) return console.log(err);
            fs.ftruncate(fd, (err) => {
            if (err) return console.log(err);
            fs.writeFile(fd, store, (err) => {
                if (err) return console.log(err);
                fs.close(fd, () => {
                return res.end(`${username} updated successfully`);
                });
            });
            });
        });
    }




    if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
        var username = parsedUrl.query.username;
        fs.unlink(userPath + username + ".json", (err) => {
            if (err) return console.log(err);
            return res.end(`${username} deleted successfully`);
        });
    }

    res.statusCode = 404;
    res.end("Page not found");
});


}

server.listen(4343, ()=>{
    console.log('server listenning on port 4343');

})