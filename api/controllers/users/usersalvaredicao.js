module.exports = (app) => {
    const tbUsers = app.models.tbusuarios
    const controller = {}
    controller.usersalvaredicao = async (req, res) => {
        try {
            await tbUsers.update({
                nome: req.body.nome,
                email: req.body.email,
                matricula: req.body.matricula,
            }, { where: { id: req.body.id } })
            res.json('editado')
        } catch (error) {
            console.log(error)
        }
    }
    return controller
}
