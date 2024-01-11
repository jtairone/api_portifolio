module.exports = (app) => {
    const tbUsers = app.models.tbusuarios
    const controller = {}
    controller.useredit = async (req, res) => {
        try {
            const dados = await tbUsers.findOne({ where: { id: req.params.id }, attributes: ['id', 'nome', 'email', 'matricula'] })
            res.json(dados)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    return controller
}
