const Sequelize = require('sequelize')

const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: './api/database/dbapi.sqlite',
    logging: false,
})

module.exports = conexao;
