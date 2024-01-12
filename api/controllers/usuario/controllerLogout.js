module.exports = (app) => {
    const controller = {}
    const { invalidarToken } = app.functions.seguranca.jwt
    controller.logout = (req, res) => {
        invalidarToken(req.cookies.accessToken)
        // limpar o cookie do navegador do usuário
        res.clearCookie('accessToken')
        res.status(204).json({ status: 'Logout OK!' })
    }
    return controller
}
