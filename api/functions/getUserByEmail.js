module.exports = (app) => {
    const tbUsers = app.models.tbusuarios
    const funcoes = {}
    funcoes.getUserByEmail = async (email) => {
        const user = tbUsers.findOne({ raw: true, attributes: ['id', 'nome', 'email', 'matricula', 'foto', 'salt', 'hash'] }, { where: { email: email.toLowerCase() } })
        return user
    }
    return funcoes
}
