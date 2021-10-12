const nodemailer = require('nodemailer');

// Entrega e-mails
let transporter = nodemailer.createTransport({
  host: '',
  port: 587,
  secure: false,
  auth: {
    user: 'emailRementente',
    pass: ''
  }
});

transporter.sendMail({
  from: "NomeQualquer SobrenomeQualquer <emailRementente>",
  to: "emailDest1, emailDest2, emailDest3",
  subject: "Assunto e-mail",
  text: "Olá mundo, estou feliz!",
  html:'<p>Conteudo HTML</p>'
}).then(message => {
  console.log(message);
}).catch(error => {
  console.log(error)
})
