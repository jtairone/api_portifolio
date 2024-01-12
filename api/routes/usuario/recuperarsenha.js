module.exports = (app) => {
    const controller = app.controllers.usuario.controllerSenha
    const { limitarRequest } = app.functions.seguranca.requestlimit
    // rota envia o e-mail de recuperação
    app.route('/api/recuperarsenha').post(limitarRequest, controller.emailRecuperacao)
    // rota valida o salt e depois altera a senha do usuário
    app.route('/api/alterarsenha/:salt').put(limitarRequest, controller.validarSalt, controller.alterarSenha)
}
