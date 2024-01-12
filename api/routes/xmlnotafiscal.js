module.exports = (app) => {
    const controller = app.controllers.xmlnotafiscal
    const { verificarJWT } = app.functions.seguranca.jwt
    app.route('/api/v1/buscarxml').get(verificarJWT, controller.buscarXml)
}
