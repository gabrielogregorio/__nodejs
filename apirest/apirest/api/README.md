# Api de games   
Este é um projeto de estudos, ele se trata de uma API que permite o gerenciamento de games.

## Endpoints   
<button style="background: #ff8a1c; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">POST</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/auth</span>

Realiza o login na API, para permitir o uso do token para acessar as demais rotas.

### Parametros Json   
**email**: Email de um usuário cadastrado no sistema
**password**: Senha do usuário cadastrado no sistema

Exemplo:
```json
{
    "email": "admin",
    "password": "admin"
}
```

### Parâmetros Url   
Nenhum

### Respostas
#### 200 - OK
Retorna um token JWT que pode ser usado como "Bearer Token". Use esse token para acessar as demais rotas da API.

Exemplo de retorno
```json
{
    "token": "hrFsAskuFhrynhtyertrbsd.ohoheowhohOUHGIUGAIYGAIYFGIYEQGiuheorhovqjp09vu20pv4u09piupowejupiocwjorqipjmnjoripjwoihkiejhgbrekjlgrehgrlOJNHAIUHBGAIUGAIADGDAIOUYDAGIDAUOGADSIODASGDASIOHADIUOGDAUWQGqwqqw"
}
```

#### 400 - Entrada faltante   
Alguma entrada não foi informada, como o email ou o password.
```json
{
    "error": "Entrada faltante"
}
```

#### 401 - Senha inválida
Erro durante o processo de autenticação. Principais causas: Senha inválida
Exemplo:
```json
{
    "error": "Senha inválida "
}
```

#### 404 - Usuário não cadastrado
Usuário não foi encontrado no sistema
```json
{
    "error": "Usuário não encontrado"
}
```

-------------------------------------------

<button style="background: #36bf66; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">GET</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/games</span>

Retorna a listagem de todos os games disponíveis no banco de dados

### Parâmetros Json
Nenhum

### Parâmetros Url
Nenhum

### Respostas   
#### 200 – OK   
Listagem de todos os games com sucesso

Exemplo de retorno
```json
[
    {
        "id": 1,
        "name": "gta5",
        "year": 2023,
        "price": 160
    },
    {
        "id": 2,
        "name": "Age of empires",
        "year": 1996,
        "price": 87
    }
]
```

#### 401 - Falha na autenticação    
Erro durante o processo de autenticação. Principais causas: Token inválido, Token expirado

----------------

<button style="background: #36bf66; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">GET</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/game/:id</span>

Retorna a um usuário pelo ID

### Parâmetros Json
Nenhum

### Parâmetros Url
**id**: Valor numérico que representa o id do jogo existente na API
Exemplo:
```url
http://127.0.0.1:3333/game/2
```

### Respostas
#### 200 - OK
Listagem de um usuário

Exemplo de retorno
```json
[
    {
        "id": 2,
        "name": "Age of empires",
        "year": 1996,
        "price": 87
    }
]
```

#### 400 - Entrada faltante
Id do game é inválido

#### 401 - Falha na autenticação
Erro durante o processo de autenticação. Principais causas: Token inválido, Token expirado

#### 404 - Jogo não cadastrado
Jogo não foi encontrado

----------------

<button style="background: #ff8a1c; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">POST</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/game</span>

Insere um usuário, com um id gerado automaticamente

### Parâmetros Json
**name**: O nome do jogo
**year**: Um valor numérico, o ano do lançamento do jogo
**price**: Um valor numérico, o preço do jogo

Exemplo
```json
{
    "name": "Angry Birds",
    "year": 2014,
    "price": 20
}
```

### Parâmetros Url
Nenhum

### Respostas
#### 200 - OK
Um jogo novo inserido na API

Exemplo de retorno
```text
OK
```

#### 400 - Entrada faltante
Algum do parâmetro do Json está vazio.

#### 401 - Falha na autenticação
Erro durante o processo de autenticação. Principais causas: Token inválido, Token expirado

----------------

<button style="background: #f05b5b; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">DELETE</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/game/:id</span>

Remove um jogo pelo id

### Parâmetros Json
Nenhum

### Parâmetros Url  
**id**: Valor numérico que representa o id de um usuário existente na API
Exemplo:
```url
http://127.0.0.1:3333/game/2
```

### Respostas
#### 200 - OK
Jogo excluído da API

Exemplo de retorno
```text
OK
```

#### 400 - Entrada faltante
Id do game é inválido

#### 401 - Falha na autenticação
Erro durante o processo de autenticação. Principais causas: Token inválido, Token expirado

#### 404 - Jogo não encontrado
Jogo não foi encontrado na API

----------------

<button style="background: #26a9ad; border: none; padding:5px 10px; color: white;border-radius:5px;width:80px;font-weight:900;">PUT</button> - <span style="font-size: 16px;padding:10px;font-weight:900;">/game/:id</span>
Edita o valor de um jogo pelo id  

### Parâmetros Json
Nenhum dos parâmetros abaixo é obrigatório.
**name**: O nome do jogo
**year**: Um valor numérico, o ano do lançamento do jogo
**price**: Um valor numérico, o preço do jogo

Exemplo
```json
{
    "name": "Computacao",
    "year": 3333,
    "price": 2222
}
```

### Parâmetros Url
**id**: Valor numérico que representa o id de um usuário existente na API
Exemplo:
```url
http://127.0.0.1:3333/game/2
```

### Respostas
#### 200 - OK
Os dados alterados na API

Exemplo de retorno
```text
OK
```

#### 400 - Entrada faltante
Alguma entrada que foi informada é inválida. Causas: Id do game é inválido, um parâmetro no json foi informado, mas não é válido,

#### 401 - Falha na autenticação
Erro durante o processo de autenticação. Principais causas: Token inválido, Token expirado


#### 404 - Jogo não encontrado
Jogo não foi encontrado na API

