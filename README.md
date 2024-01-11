# API RestFull
## _Api RestFull portfolio_

<!-- [![N|Solid](./public/img/logo.png)](http://portalvendas.macrolub.com.br:8082) -->


Desenvolvido em NodeJS usando Express e outras Packages do NPM.


## Tech

Tecnologias imbarcadas:

- [VsCode](https://code.visualstudio.com/) - IDE para programação muito utilizada

- [Nodejs](https://nodejs.org/pt-br/) - é um runtime JavaScript desenvolvido com o Chrome's V8 JavaScript engine.

- [Express](https://expressjs.com/pt-br/) - estrutura de aplicativo de rede rápida node.js

- [Sqlite](https://www.sqlite.org/) - Mecanismo de banco de dados SQL.

- [Sequelize](https://sequelize.org/) - Sequelize é um ORM TypeScript e Node.js moderno para Postgres, MySQL, MariaDB, SQLite e SQL Server e muito mais. 

- [NodeMailer](https://www.npmjs.com/package/nodemailer) - Envie e-mails do Node.js – fácil como um bolo!🍰✉️

- [OracleDB](https://www.npmjs.com/package/oracledb) - O complemento node-oracledb para Node.js potencializa aplicativos de banco de dados Oracle de alto desempenho. Os aplicativos podem ser escritos em TypeScript ou diretamente em JavaScript.

- [Consign](https://www.npmjs.com/package/consign) -Carregue automaticamente seus scripts! o sucessor do express-load.

* Existe alguns outros pacotes mais os principais são estes citados.

## Installation

API requer [Node.js](https://nodejs.org/) v16+ para ser executado.

Instale as dependências e devDependencies e inicie o servidor.

```sh
cd api_mvc
npm i
node server.js
```
Usando nodemon pois a vantagem que sempre salvar alguma alteração o nodemon restart o projeto.

Instando o nodemon.
````
npm i -g nodemon
````
rodando o projeto 
*npm start por que no package.json existe um script para rodar o nodemon.
```
nodemon server.js
ou
npm start
```

Após iniciar a API acessar a mesma via http://localhost:8000 aonde vai ter acesso a pagina de configuração do e-mail para enviar recuperação de senha e dados conexão a um banco de dados oracle.

na mesma pagina tem acesso a verificar os usuários cadastrados na plataforma.

em anexo ao projeto segue coleção para importação no POSTMAN quem quiser estudar.

## License

MIT

**Free Software**