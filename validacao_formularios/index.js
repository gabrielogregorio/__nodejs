const express = require('express');
const app = express()
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
require('dotenv/config');

var validator = require('validator');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public/'))

app.use(cookieParser(process.env.KEY_COOKIE_PARSER))// Antes da seção

app.use(session({
  secret: process.env.KEY_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

app.use(flash()); 

app.get('/', (req, res) => {
  // Pegando as flash session
  var emailError =  req.flash('emailError');
  var nameError = req.flash('nameError');
  var pontosError = req.flash('pontosError');

  var email = req.flash('email');
  var name = req.flash('name');
  var pontos = req.flash('pontos');


  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
  nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError;
  pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
  
  email = (email == undefined || email.length == 0) ? undefined : email;
  name = (name == undefined || name.length == 0) ? undefined : name;
  pontos = (pontos == undefined || pontos.length == 0) ? undefined : pontos;


  res.render('index.ejs', {emailError, nameError, pontosError, email, name, pontos});
})

app.post('/form', (req, res) => {
  var {email, name, pontos} = req.body;
  var emailError = '';
  var pontosError = '';
  var nameError = ''
  //if(email != undefined || email == '') {//...//}
  if (name.length < 4) {
    nameError = 'Nome é muito pequeno'
  }

  if (parseInt(pontos) >= 20) {
    pontosError = 'pontos é maior ou igual a 20'
  }

  if(!validator.isEmail(email)) {
    emailError = 'E-mail não é válido!'
  }

  if(pontosError != '' || emailError != '' || nameError != ''){
    console.log(nameError)
    req.flash("pontosError", pontosError)
    req.flash("emailError", emailError)
    req.flash("nameError", nameError)

    req.flash("email", email)
    req.flash("name", name)
    req.flash("pontos", pontos)

    res.redirect('/');
  } else { // Sem erros de validação
    res.send('Tudo ok!')
  }

  // Nada de novo, somente condições
})



app.listen(3333, () => {
  console.log('Server is running')
}) 