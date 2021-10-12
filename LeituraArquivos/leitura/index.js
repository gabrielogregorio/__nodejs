const fs = require('fs')
fs.readFile('./arquivo.txt', {encoding: 'utf-8'}, (erro, data) => {
  if(erro) {
    console.log('erro: ', erro)
  } else {
    console.log(data)
  }
})