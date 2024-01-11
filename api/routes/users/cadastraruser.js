module.exports = (app) => {
    const controller = app.controllers.users.cadastrarUserController
    const funcoes = app.functions.uploadFotoUser
    // console.log(funcoes)
    app.route('/api/v1/cadastraruser').post(funcoes.uploadFoto.single('foto'), controller.cadastrarUsuario)
}
