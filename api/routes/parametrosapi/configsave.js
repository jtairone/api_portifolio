module.exports = (app) => {
    const controller = app.controllers.configsave
    app.route('/configsave')
        .post(controller.configsave)
}
