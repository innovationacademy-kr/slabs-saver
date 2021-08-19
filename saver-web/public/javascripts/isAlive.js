var jwt = require('jsonwebtoken');
const token = localStorage['jwtToken'];

console.log("-----------------------------------------");
console.log(jwt.verify(token, SECRET));
console.log("-----------------------------------------");