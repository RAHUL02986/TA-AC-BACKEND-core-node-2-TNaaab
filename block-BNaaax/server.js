let path = require('path');
let absolutePath = __dirname;
var absoluteFile = __filename;
console.log(absoluteFile);
let relativePath = './server.js';

var formPath = path.join(absolutePath,`${relativePath}`);

console.log(formPath, relativePath);
