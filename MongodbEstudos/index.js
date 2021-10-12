const mongoose =  require('mongoose')
const articleModel = require('./models/article');

require('dotenv/config');

var host = process.env.HOST;
var porta = process.env.PORT;

// useNewUrlParser => Novo sistema de url
// useUnifiedTopology => Mecanismo de monitoramento do db
mongoose.connect(`mongodb://${host}:${porta}/bancoEstudos`, {useNewUrlParser: true, useUnifiedTopology: true});
console.log('conectado!')

// Carregando os models
// A nome da coleção é criado automaticamente como 'articles'
const Article = mongoose.model('Article', articleModel);


/* Inserindo dados
const artigo = new Article({
  title: "Tiadatulsddo do artigo",
  author: "Rsdaze",
  body: "<h122  >ola afsaffsfasmundo</h1>",
  resume: {
    content: 'ddssdds',
    author: '1231q'
  }
});
artigo.save().then(item => {
  console.log('Artigo salvo, id', item._id);
})
 */


/* Buscagem de muitos dados
Article.find({}).then(articles => {
  console.log(articles);
})
*/



/* Buscando pelo id ou outro campo ou multiplos campos
Article.find({'_id':'61085483d2049d4500b59e4f'}).then(article => {
  console.log(article);
})
*/


/* Buscando por itens aninhados
Article.find({'resume.content': 'ddssdds'}).then(article => {
  console.log(article);
})
*/


/* Buscando por itens aninhados, retornando um elemento
Article.findOne({'resume.content': 'ddsssdds'}).then(article => {
  console.log(article);
  // => Retorna null se não achar
})
*/


/*
// Para deletar
Article.findByIdAndDelete('610854b722f6142c68d5ec44').then(res => {
  console.log('Item deletado pelo id', res)
  // null => id not found 
})
*/



/*
// Para atualizar
Article.findOneAndUpdate('61085474892f490e48dbe919', {
  author: 'Gabriel Gregório'
}).then(update => {
  console.log('Item atualizado!', update)
})
*/

