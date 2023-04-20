var http = require('http');

var fs = require('fs');

var qs = require('querystring');

let path = require("path");



console.log(__filename);

console.log(__dirname + '/app.js');


console.log('./index.html');

var indexPath = path.join(__dirname, 'index.html');


let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   if (req.method === "POST" && req.url === "/") {
//     let result = "";
//     req.on("data", (chunk) => {
//       result += chunk;
//     });
//     req.on("end", () => {
//       res.writeHead(201, "Content-Type : application/json");
//     //   console.log(result);
//       res.end(result);
      
//     });
//   }
// }


// function handleRequest(req, res) {
//   if (req.method === "POST" && req.url === "/") {
//     let result = "";
//     req.on("data", (chunk) => {
//       result += chunk;
//     });
//     req.on("end", () => {
//       res.statusCode = 201;
//       var parseData = qs.parse(result);
//       res.end(JSON.stringify(parseData)); 
//       console.log(`Name of the captain is ${result.captain}`);
//     });
//   }
// }



// server.listen(5555, () => {
//   console.log("Listening for a request on the 5555 port ");
// });



// function handleRequest(request, response) {
//   let contentType = request.headers["content-type"];
//   console.log(contentType);
//   let data = "";
//   request.on("data", (chunk) => {
//     data += chunk;
//   });
//   request.on("end", () => {
//     if (contentType === "application/x-www-form-urlencoded") {
//       let result = qs.parse(data);
//       // console.log(JSON.stringify(result));
//       response.end(JSON.stringify(result));
//     }
//     if(contentType === 'application/json'){
//       response.end(data);
//     }
//   });
// }
// server.listen(9000, () => {
//   console.log("server is listning at the 9k port ");
// });



function handleRequest(req , res){
var typeData = req.headers['content-type'];

var store = '';

req.on('data',(chunk)=>{
    store = store + chunk;
})

req.on('end', ()=>{
    if(typeData === 'application/x-www-form-urlencoded'){
        console.log(store);

         let formData = qs.parse(store);
         res.setHeader('content-type', 'text/html');
         res.end(`<h1>${formData.name} </h1> <h2> ${formData.email}</h2>`)
    }

    if(typeData === 'application/json'){
        console.log(store);

        let jsonData = JSON.parse(store);
        res.setHeader('content-type', 'text/html');
        res.end(`<h1>${jsonData.name} </h1> <h2> ${jsonData.email}</h2>`)

    }
})

}


server.listen(4000, ()=>{
    console.log('server listening on port 4k');
})