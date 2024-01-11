module.exports = (app) => {
    const controller = app.controllers.testarsmtp
    app.route('/testarsmtp').post(controller.testarsmtp)
}
