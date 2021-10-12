let app = require('../app');

describe("Operações mais básicas", () => {
  test("Deve retornar o valor 20 ao somar 5 + 15", () => {
    let resultado = app.soma(5, 15);
    expect(resultado).toEqual(20);
  })

  test("Deve retornar o valor 184 ao multiplicar 4 + 46", () => {
    let resultado = app.multiplicar(4, 46);
    expect(resultado).toEqual(184);
  })
})

describe("Operações complexas", () => {
})
