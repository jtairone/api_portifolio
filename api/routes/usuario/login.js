module.exports = (app) => {
    const controller = app.controllers.usuario.controllerLogin
    const { limitarRequest } = app.functions.seguranca.requestlimit
    app.route('/api/login').post(limitarRequest, controller.login)
}
