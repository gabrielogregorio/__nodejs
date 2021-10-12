const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

var listaItens = [
  {
    nome: 'Mouse Gamer',
    preco: 890.12
  },
  {
    nome: 'Teclado Gamer',
    preco: 400
  },
  {
    nome: 'Cadeira Gamer',
    preco: 1090
  },
  {
    nome: 'Computador Gamer',
    preco: 7090
  }
]

app.get('/', (req, res) => {
  res.render('index', {listaItens});
})

app.get('/delete/:id', (req, res) => {
  var id = req.params.id;
  listaItens.pop(id);
  res.redirect('/');
})


app.listen(port=8080, host='0.0.0.0', () => {
  console.log('Server is running!');
});

