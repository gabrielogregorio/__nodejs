const jwt = require('jsonwebtoken');
require('dotenv/config');

function adminAuth (req, res, next) {
  const authToken = req.headers['authorization'];
  if (authToken === undefined) {
    return res.sendStatus(401);
  }
 
  const token = authToken.split(' ')[1];
  jwt.verify(token, process.env.SECRET_JWT, (error, data) => {
    if (error) {
      return res.sendStatus(401);
    }

    req.nivelAcessoUsuario = "Top Masters";
    next();  
  })
}

module.exports = adminAuth;