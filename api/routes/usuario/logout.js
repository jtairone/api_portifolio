module.exports = (app) => {
    const controller = app.controllers.usuario.controllerLogout
    const { verificarJWT } = app.functions.jwt
    app.route('/api/logout').post(verificarJWT, controller.logout /* #swagger.tags = ['Autenticação e Cadastro'] */)
}
