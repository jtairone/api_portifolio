const express = require('express')
const config = require('config')
const consign = require('consign')
const cookieParser = require('cookie-parser')

module.exports = () => {
    const app = express()

    // Setando Variaveis da aplicação
    app.set('port', config.get('server.port'))

    // MIDDLEWARE aceitar trabalhar com json
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.set('view engine', 'ejs')
    app.set('views', './views')
    app.use(express.static('public'))

    // usando  consign para importar novas rotas
    consign({
        cwd: 'api',
        verbose: false, // exibir ou a inicialização consign
        locale: 'pt-br',
    })
        .then('data')
        .then('database')
        .then('querys')
        .then('models')
        .then('functions')
        .then('controllers')
        .then('routes')
        .exclude('database/dbapi.sqlite')
        .into(app)
    return app
}
