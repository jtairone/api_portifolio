module.exports = (app) => {
    const controller = app.controllers.email
    app.route('/email').get(controller.email)
}
