require('dotenv/config');

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE_NAME,
  }
});

module.exports = knex;