const express = require('express');
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const adminAuth = require('./middlewares/adminAuth');
const jWTSecret = process.env.SECRET_JWT;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

var db = {
  games: [
    {
      id: 1,
      name: 'gta5',
      year: 2023,
      price: 160
    },
    {
      id: 2,
      name: 'Age of empires',
      year: 1996,
      price: 87
    },
    {
      id: 3,
      name: 'gta SA',
      year: 2004,
      price: 10
    },
    {
      id: 4,
      name: 'CS:GO',
      year: 2015,
      price: 90
    },
    {
      id: 5,
      name: 'Valorant',
      year: 2020,
      price: 0
    }
  ],
  users: [
    {
      id: 1,
      name:'admin',
      email:'admin',
      password: 'admin'
    },
    {
      id: 2,
      name:'lucas',
      email:'lucas',
      password: 'lucas'
    }
  ]
}


function validId(value) {
  if (value ==  undefined) {
    return {status: false}
  }
  if (isNaN(value)) {
    return {status: false}
  }
  return {status: true, value: parseInt(value)}
}

app.post('/validate', adminAuth, (req, res) => {
  return res.sendStatus(200);
})

app.get('/games', adminAuth, (req, res) => {
  res.statusCode = 200
  console.log(req.nivelAcessoUsuario, 'ACESSO');
  newGames = []
  db.games.forEach(game => {
    newGames.push({game, _links: {
        get_game: {
          href: `http://localhost:3333/game/${game.id}`,
          method: "GET"
        },
        delete_game: {
          href: `http://localhost:3333/game/${game.id}`,
          method: "DELETE"
        },
        edit_game: {
          href: `http://localhost:3333/game/${game.id}`,
          method: "PUT",
        }
      }
    })
  })
  return res.json({games:newGames});
})

app.get('/game/:id', adminAuth, (req, res) => {
  var id = req.params.id;

  if (!validId(id).status) {
    return res.sendStatus(400) // sintaxe incorreta
  }

  var HATEOS = {
    get_game: {
      href: `http://localhost:3333/game/${id}`,
      method: "GET"
    },
    delete_game: {
      href: `http://localhost:3333/game/${id}`,
      method: "DELETE"
    },
    edit_game: {
      href: `http://localhost:3333/game/${id}`,
      method: "PUT",
    }
  }

  var game = db.games.filter(game => game.id === parseInt(id))

  if (game.length == 0) {
    return res.sendStatus(404)  
  } else {
    res.statusCode = 200
    return res.json({game:game, _links:HATEOS});
  }
})


app.post('/game', adminAuth, (req, res) => {
  var { name, year, price } = req.body;

  if (name === undefined || year === undefined || price === undefined) {
    return res.sendStatus(400);
  }

  var list = db.games.map(game => game.id)

  if (list.length == 0) { //max id
    var id = 0;
  } else {
    var id = Math.max(...list) + 1;
  }

  db.games.push({
    id: id,
    name,
    year,
   price 
  })

  res.sendStatus(200);
})

app.delete('/game/:id', adminAuth, (req, res) => {
  var id = req.params.id;

  if (!validId(id).status) {
    return res.sendStatus(400) // sintaxe incorreta
  } else {
    id = parseInt(id);
  }

  var index = db.games.findIndex(game => game.id == id);

  if (index == -1) {
    return res.sendStatus(404);
  } else {
    db.games.splice(index, 1);
    return res.sendStatus(200);
  }
})


app.put("/game/:id", adminAuth, (req, res) => {
  var id = req.params.id;
  var { name, year, price } = req.body;

  if (!validId(id).status) { return res.sendStatus(400) }

  var gameId = db.games.find(game => game.id === parseInt(id))

  if (gameId == undefined) { return res.sendStatus(404) }

  var priceIsValid = validId(price)
  var yearIsValid = validId(year)

  // Se as entradas foram informadas, porém, elas não são válidas
  if (price != undefined){
    if (!priceIsValid.status) { return res.sendStatus(400)}
  }

  if (year != undefined){
    if (!yearIsValid.status) { return res.sendStatus(400) }
  }

  gameId.price = (price != undefined) ? priceIsValid.value : gameId.price;
  gameId.year = (year != undefined) ? yearIsValid.value : gameId.year;
  gameId.name = (name != undefined) ? name : gameId.name;

  return res.sendStatus(200);
})

app.post('/auth', (req, res) => {
  var {email, password} = req.body;

  if (email == undefined || password == undefined) {
    res.status(400);
    return res.json({error: 'Entrada faltante'})
  }

  var user = db.users.find(user => user.email == email);

  if (user == undefined) {
    res.status(404);
    return res.json({error: 'Usuário não encontrado'})
  }

  if (user.password != password){
    res.status(401);
    return res.json({error: 'Senha inválida '})
  }

  res.status(200);
  jwt.sign({
    id: user.id,
    email: user.email
  }, jWTSecret, {expiresIn: '30h'}, (error, token) => {
    if (error) {
      console.log(error)
      res.status(400)
      return res.json({error: "Falha no servidor"})
    }
    return res.json({token: token})
  })
})

app.listen(3333, () => {
  console.log('Server is running');
})