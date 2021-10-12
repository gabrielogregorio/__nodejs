const http = require('http');

// Ler um arquivo html
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// Criando um servidor

const server = http.createServer((req, res) => {
  if (req.url == '/eu') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end(); // Finalizar e servir o usuários
    })
  } else {
    res.end();
  }
})

server.listen(port, hostname, ()=>{
  console.log('Server is running');
})