// Importar express
const express = require('express');

// Passar para a variável app
const app = express();
const port = 3000;

// Criando rotas
app.get("/", (req, res)=>{
  res.send('<p>Inicio do site</p>');
});

app.get('/site', (req, res)=> {
  res.send('<h1>Bem vindo ao site</h1>');
})

// Parametros e opcionais
// Query params
// http://127.0.0.1:3000/ola/gabriel/Samsung/123?email=gabrielgregorio
app.get('/ola/:nome/:empresa/:idade?', (req, res)=> {
  var nome = req.params.nome;
  var empresa = req.params.empresa;
  var idade = req.params.idade;
  var email = req.query['email'];
  if (email) {
    nome = email;
  }

  if(idade){
    res.send('<h1>Olá ' + nome + ', você trabalha na ' + empresa + idade + '</h1>');
  }else {
    res.send('<h1>Olá ' + nome + ', você trabalha na ' + empresa + '</h1>');
  }
})


app.listen(port, (err) => {
  if(err) {
    console.log('Ocorreu um erro')
  } else {
    console.log('Servidor iniciado')
  }
})
