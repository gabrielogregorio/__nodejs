const fs = require('fs');

fs.readFile('rosas.csv', function(err, data) {
  let arquivo = data.toString();
  let newArquivo = arquivo.split(',');
  console.log(newArquivo);
  console.log(arquivo.substr(0, 3));
})