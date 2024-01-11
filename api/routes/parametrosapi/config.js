module.exports = (app) => {
    const controller = app.controllers.config
    app.route('/config')
        .get(controller.config)
}
