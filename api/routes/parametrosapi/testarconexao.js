module.exports = (app) => {
    const controller = app.controllers.testarconexao
    app.route('/testarconexao')
        .post(controller.testarconexao)
}
