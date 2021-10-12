let app = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)

test("A Aplicação deve responder na porta 3333", () => {
  // para trabalhar com promisse tem que ter retorno
  return request.get('/').then(res => expect(res.statusCode).toEqual(200))
})


test("A Aplicação deve returnar 'blue' se o parametro for 'greg'", () => {
  // para trabalhar com promisse tem que ter retorno
  return request.get('/cor/greg').then(res => {
    expect(res.statusCode).toEqual(200)
    expect(res.body.color).toEqual('blue')
  })
})
