const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('QUal é o seu nome?', function(nome) {
  console.log('O nome do usuário é ' + nome);

  rl.question('Qual sua idade', function(idade) {
    console.log('A idade é ' + parseInt(idade).toString());
  })
})

rl.on('close', function() {
  console.log('Falou parça');
  process.exit(0);
})
