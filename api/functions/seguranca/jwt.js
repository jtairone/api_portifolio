const jwt = require('jsonwebtoken')
const config = require('config')

let blacklist = []

setInterval(() => {
    blacklist = []
}, 86400000)

module.exports = () => {
    const funcoes = {}
    funcoes.verificarJWT = async (req, res, next) => {
        try {
            const token = req.cookies.accessToken
            const decoded = await jwt.verify(token, config.get('server.SECRET_JWT'))
            if (blacklist.includes(token)) {
                return res.status(401).json({ status: 'Token Inválido!' }).end()
            }
            req.userId = decoded.userId
            next()
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ erro: 'Token Expirado!' }).end()
            }
            return res.status(401).json({ status: 'Token Inválido!' }).end()
        }
    }

    funcoes.assinarJWT = (email) => {
        const token = jwt.sign({ email }, config.get('server.SECRET_JWT'), { expiresIn: '1d' })
        return token
    }
    funcoes.invalidarToken = (token) => {
        blacklist.push(token)
    }

    return funcoes
}
