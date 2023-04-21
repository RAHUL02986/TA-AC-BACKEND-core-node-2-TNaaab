//relative path of index.js
console.log("../client/index.html");

//absolute path of index.js
var path = require("path");
var filePath = path.join(__dirname, "..", "client/index.html");
console.log(filePath);
