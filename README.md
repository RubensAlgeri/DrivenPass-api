<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $nome-repositorio
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/$RubensAlgeri/$projeto19-DrivenPass

$ cd $projeto19-DrivenPass

$ npm install

$ npm run dev
```

API:

```
- POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": 'joi.string().email()',
        "password": "joi.string().min(10)"
    }
    - POST /signin
    - Rota para logar um cartão
    - headers: {}
    - body: {
        "email": 'joi.string().email()',
        "password": "joi.string().min(10)"
    }

- GET /card/:id/?cardId=00 (autenticada)
    - Rota para obter os cartões do usuario ou apenas um cartão específico do mesmo caso use a query indicada "cardId".
    - headers: {athorization: Bearer {token}}
    - body: {  }

- POST /card/:id (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: {athorization: Bearer {token}}
    - body: {
        title string.max(50)
        password string
        number string.regex(^[0-9]{12}$])
        holderName string
        cvv string.regex(^[0-9]{3}$])
        expirationDate string.regex(^[0-9]{2}\/[0-9]{2}$])
        type string.valid('credit','debit','credit_debit')
        isVirtual boolean
    }

- DELETE /card/:id/:userId (autenticada)
    - Rota para deletar um cartão pelo id do cartão e do usuario respectivo
    - headers: { athorization: Bearer {token} }
    - body: {
    }

- GET /credential/:id/?credentialId=00 (autenticada)
    - Rota para obter as credenciais do usuario ou apenas uma credencial específica do mesmo caso use a query indicada "credentialId".
    - headers: {athorization: Bearer {token}}
    - body: {  }

- POST /credential/:id (autenticada)
    - Rota para cadastrar uma nova credencial
    - headers: {athorization: Bearer {token}}
    - body: {
        title string.max(50)
        password string
        url string.uri
    }

- DELETE /credential/:id/:userId (autenticada)
    - Rota para deletar uma credencial pelo id da credencial e do usuario respectivo
    - headers: { athorization: Bearer {token} }
    - body: {
    }

- GET /wifi/:id/?wifiId=00 (autenticada)
    - Rota para obter as redes wifi do usuario ou apenas uma rede específica do mesmo caso use a query indicada "wifiId".
    - headers: {athorization: Bearer {token}}
    - body: {  }

- POST /wifi/:id (autenticada)
    - Rota para cadastrar uma nova rede wifi
    - headers: {athorization: Bearer {token}}
    - body: {
        title string.max(50)
        password string
        netName string
    }

- DELETE /wifi/:id/:userId (autenticada)
    - Rota para deletar uma rede wifi pelo id da rede e do usuario respectivo
    - headers: { athorization: Bearer {token} }
    - body: {
    }

- GET /safeNote/:id/?safeNoteId=00 (autenticada)
    - Rota para obter as anotações do usuario ou apenas uma anotação específica do mesmo caso use a query indicada "safeNoteId".
    - headers: {athorization: Bearer {token}}
    - body: {  }

- POST /safeNote/:id (autenticada)
    - Rota para cadastrar uma nova safeNote
    - headers: {athorization: Bearer {token}}
    - body: {
        title string.max(50)
        annotation string.max(1000)
    }

- DELETE /safeNote/:id/:userId (autenticada)
    - Rota para deletar uma anotação pelo id dela e do usuario respectivo
    - headers: { athorization: Bearer {token} }
    - body: {
    }
```