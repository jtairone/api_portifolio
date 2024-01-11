module.exports = (app) => {
    const controller = app.controllers.configemailsave
    app.route('/configemailsave')
        .post(controller.configemailsave)
}
