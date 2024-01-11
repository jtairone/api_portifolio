module.exports = (app) => {
    const tbUsers = app.models.tbusuarios
    const controller = {}
    controller.userdelete = async (req, res) => {
        try {
            await tbUsers.destroy({ where: { id: req.params.id } })
            res.json('Excluido')
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    return controller
}
