const config = require('config')

module.exports = (app) => {
    const tbUsuarios = app.models.tbusuarios
    const { validarSenha } = app.functions.saltHash
    const { assinarJWT } = app.functions.jwt
    const { agora } = app.functions.dataHoraAtual
    const { getUserByEmail } = app.functions.getUserByEmail
    const controller = {}

    controller.login = async (req, res) => {
        try {
            const { email, senha } = req.body
            const usuario = await getUserByEmail(email)
            if (usuario !== null && validarSenha(senha, usuario.hash)) {
                const token = assinarJWT(usuario.email)
                tbUsuarios.update({ ultimologin: agora() }, { where: { id: usuario.id } })
                res.cookie('accessToken', token, { httpOnly: true, sameSite: config.get('server.SAMESITE'), secure: Boolean(config.get('server.SECURE')) })
                delete usuario.hash
                res.status(200).json(usuario)
            } else if (usuario !== null) {
                res.status(401).json('Senha incorreta')
            } else {
                res.status(401).json('Usuario não cadastrado')
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    return controller
}
