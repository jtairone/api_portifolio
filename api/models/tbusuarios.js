const Sequelize = require('sequelize')

module.exports = () => {
    const conexao = require('../database/bancodados')
    const tbUsers = conexao.define('tbusuarios', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        matricula: {
            type: Sequelize.STRING,
        },
        ultimologin: {
            type: Sequelize.STRING,
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hash: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        foto: {
            type: Sequelize.STRING,
        },
    })

    conexao.sync()
    return tbUsers
}
