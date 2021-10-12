const express = require('express');
const app = express();

// Motor de HTML como view engine
app.set('view engine', 'ejs');

// Inclusão de arquivos estáticos
app.use(express.static('public'));

app.get('/:nome/:lang', (req, res) => {
  var nome = req.params.nome;

  let produtos = [
    {celular: 'Samsung', preco: 950.00},
    {celular: 'Motorola', preco: 460.00},
    {celular: 'LG', preco: 1920.00}    
  ]

  res.render('index', {
    nome: nome,
    linguagem: req.params.lang,
    produtos: produtos
  });
})

app.listen(8080, () => {
  console.log('rodando');
})