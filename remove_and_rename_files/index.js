const fs = require('fs');

let arquivo = 'arquivo.txt';

fs.rename(arquivo, 'outro.txt', (err)=> {
  console.log('salvo pelo?');
})

/*
fs.unlink(arquivo, (err) => {
  if (err) throw console.log('Erro ao excluir arquivo!');
  console.log('Arquivo excluido com sucesso');
})*/
