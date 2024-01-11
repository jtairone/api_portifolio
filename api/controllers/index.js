module.exports = () => {
    const controller = {}
    controller.paginainicio = (req, res) => {
        res.render('index')
    }
    return controller
}
