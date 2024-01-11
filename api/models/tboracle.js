const Sequelize = require('sequelize')

module.exports = () => {
    const conexao = require('../database/bancodados')
    const tbOracle = conexao.define('tboracle', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        host: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        port: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sid: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pass: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    // connection.sync({force: true});
    conexao.sync()

    return tbOracle
}
