var http = require('http');

var qs = require('querystring');

var server = http.createServer(handleRequest);


function handleRequest(req, res) {
    var contentType = req.headers['content-type'];

    let result = "";
    req.on("data", (chunk) => {
      result += chunk;
    });
    req.on("end", () => {
        if(contentType === 'application/json'){
        

            res.end(result);
            console.log(result);
        }
        if(contentType === 'application/x-www-form-urlencoded'){
            var formData = qs.parse(result);
            res.end(JSON.stringify(formData));
            console.log(result);

        }
    });
  }




server.listen(5500, () => {
  console.log("Listening for a request on the 5555 port ");
});
