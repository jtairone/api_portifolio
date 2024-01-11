module.exports = (app) => {
    const controller = {}
    const tbUsers = app.models.tbusuarios
    controller.users = async (req, res) => {
        // let dataO = {'host': '', 'port':'', 'user':'', 'pass':'', 'sid':''}
        const dados = await tbUsers.findAll({ attributes: ['id', 'nome', 'email', 'matricula', 'ultimologin', 'foto'], raw: true })
        dados.forEach((user) => {
            user.origem = req.rawHeaders[1]
        })
        res.render('users', {
            data: dados,
        })
    }
    return controller
}
