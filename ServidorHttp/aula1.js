const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Criando um servidor

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('<h1>Hello World</h1>');
})

server.listen(port, hostname, ()=>{
  console.log('Server is running');
})