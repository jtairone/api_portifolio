const Sequelize = require('sequelize');

module.exports = () => {
    const conexao = require('../database/bancodados');
    const tbsendmail = conexao.define('tbemail', {
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
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pass: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        secure: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tls: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })
    // connection.sync({force: true})
    conexao.sync()

    return tbsendmail
}
