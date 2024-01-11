module.exports = (app) => {
    const controller = app.controllers.usuario.controllerUsuario
    const funcoes = app.functions.uploadFotoUser
    const { verificarJWT } = app.functions.jwt
    const { limitarRequest } = app.functions.requestlimit
    // Rota para cadastro do usuario - Publica
    app.route('/api/cadastrarusuario').post(limitarRequest, funcoes.uploadFoto.single('foto'), controller.cadastrarUsuario)
    app.route('/api/relogar').post(limitarRequest, controller.relogar)
    // Rota para Atualização do cadastro - Publica
    app.route('/api/editarusuario/:id').put(verificarJWT, funcoes.uploadFoto.single('foto'), controller.usersalvaredicao)
}
