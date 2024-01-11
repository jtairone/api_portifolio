module.exports = (app) => {
    const controller = app.controllers.index
    app.route('/').get(controller.paginainicio)
}
