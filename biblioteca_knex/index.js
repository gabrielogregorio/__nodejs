const database =  require('./database');


var dados = {
  name: "Nome de um item",
  price: 10.2
}

var dados2 = [
  {
    name: "Nome de um item",
    price: 2.2
  },
  {
    name: "Estudos",
    price: 3.3
  }
]
//###################################################//
// 1 p 1 and 1 p N
//###################################################//

//database.insert(dados2).table('estudo_tabela').then(res => {
//  console.log(res); // Retorna o ID
//}).catch(error => {
//  console.log(error);
//})

//database.select().table('estudo_tabela').then(res => {
//database.select(["id"]).table('estudo_tabela').then(res => {
//    console.log(res)
//}).catch(error => {
//  console.log(error)
//})


// Queries dentro de queries


//database.insert(dados2).table('estudo_tabela').then(res => {
//  database.select().table('estudo_tabela').then(res => {
//      console.log(res)
//  }).catch(error => {
//    console.log(error)
//  })
//}).catch(error => {
//  console.log(error);
//})


// Where - Sempre tente usar 1 where, um where raw por exemplo
// Para testar várias condicoes
/*
database.select(["id", "name"])
.where({id: 7})
.where({name:'Nome de um item'})
.whereRaw('price < 100')
.orWhere({price:2})
.table('estudo_tabela').then(res => {
  console.log(res)
})
*/

// queries crua
//database.raw('select * from estudo_tabela').then(res => {
//  console.log(res[0])
//})


// Delete
//database.where({id:6}).delete().table('estudo_tabela').then(qtdRegistros => {
//  console.log(qtdRegistros);
//})

// Update
//database.where({id:7}).update({price:99}).table('estudo_tabela').then(qtdRegistros => {
//  console.log(qtdRegistros);
//})

//Order by
//database.select().table('estudo_tabela').orderBy('name', 'asc').then(dataOrdem => {
//  console.log(dataOrdem)
//})


// Relacionamentos:
// 1 p 1
// 1 studio tem Game, 1 game pertence a um studio

// 1 p M
// 1 studio tem vários games.

// Join só funciona com tabelas relacionadas
/*
database.insert({
  name: 'Rockstar',
  game_id:1
}).table('studios').then(res => {
  console.log(res)
})
*/

// innerJoin = Une duas tabelas ignorando os registros nulos
//database.select(["estudo_tabela.id as game_id", "studios.id as studio_id", "studios.name as studio_name", "estudo_tabela.name as game_name"])
//  .table('estudo_tabela').
//  innerJoin('studios', 'studios.game_id', 'estudo_tabela.id').then(res => {
  // console.log(res)
//})


  
// join com where
//database
//  .select(["estudo_tabela.id as game_id", "studios.id as studio_id", "studios.name as studio_name", "estudo_tabela.name as game_name"])
//  .table('estudo_tabela').
//  innerJoin('studios', 'studios.game_id', 'estudo_tabela.id')
//  .where('estudo_tabela.id', 1)
//  .then(res => {
//   console.log(res)
//})


// E se eu quiser trazer somente os lados a direita ou
// esquerda dos itens relacionados?
// * leftJoin
// * rigthJoin


// 1 p M => join
//database.select(["estudo_tabela.id as game_id", "studios.id as studio_id", "studios.name as studio_name", "estudo_tabela.name as game_name"])
//  .table('estudo_tabela').
//  innerJoin('studios', 'studios.game_id', 'estudo_tabela.id').then(res => {
 //console.log(res)
 //var game = {
//   id: 0,
   //game: "",
   //studios: []
 //}

 //res.forEach(studio => {
   //game.id = studio.game_id;
   //game.game = studio.game_name;
   //game.studios.push({nome: studio.studio_name})
 //})

 //console.log(game)
//})




//###################################################//
// N p N or M p M
//###################################################//
//database.insert({
//  name: 'Os simpsons'
//}).table('filme').then(res => {
//  console.log(res)
//})

//database.insert({
//  name: 'Disney'
//}).table('produtora').then(res => {
//  console.log(res)
//})

/*
database.insert([
  {
    filme_id: 1,
    produtora_id: 2
  },
  {
    filme_id: 1,
    produtora_id: 1
  },
]).table('filme_produtora').then(res => {
  console.log(res)
})

*/
// joins

database
  .select([
    "filme.name as filme_name",
    "produtora.name as produtora_name"
  ])
  .table('filme_produtora')

  // Relacionamentos
  .innerJoin('filme', "filme.id", 'filme_produtora.filme_id')

  // Relacionamentos produtora
  .innerJoin('produtora', "produtora.id", 'filme_produtora.produtora_id')

  .where('filme.id', 3)
  .then(res => { 
    console.log(res)
  })




// ******************* TRANSACOES ******************* //
// Quando precisamos fazer várias operações no DB, relacionado a um controller, exemplo:
// Insere um usuário, faz uma consulta, faz um delete, faz um update, faz outro select.
// Imagine que de crash no meio de uma dessas operações, a informação fica inconsistente!
// A transacao permite que várias operaões sejam feitas e se uma der crash, tudo é desfeito.


async function transacao(){

  try {    
    await database.transaction(async trans => {
     
      await database.insert({ name: 'Oba', game_id:1  }).table('studios').then(res => {console.log(res)})
      await database.select().table('estudo_tabela').then(res => {console.log(res)}).catch(error => { console.log(error)})
      await database.insert({ name: 'Ob222a', game_id:1  }).table('studios').then(res => {console.log(res)})

      //............ o que mais precisar.

    })
  } catch (error) {
    
  }
}

// Se houver qualquer erro, a transação volta atras
transacao();

