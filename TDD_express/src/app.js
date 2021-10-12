const express = require('express');
let app = express()

app.get('/', (req, res) => {
  res.send('Funcionando!');
})

app.get('/cor/:pessoa', (req, res) => {
  let pessoa = req.params.pessoa;

  if(pessoa == 'greg'){
    return res.json({color:'blue'})
  }
})

module.exports = app;

