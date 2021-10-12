const http = require('http');
const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
  res.end('Teste');
})

server.listen(port, hostname, ()=>{
  console.log('Server Running');
})

//nodemon .\index.js