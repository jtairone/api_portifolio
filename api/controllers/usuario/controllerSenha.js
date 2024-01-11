const config = require('config')

module.exports = (app) => {
    const { getUserByEmail } = app.functions.getUserByEmail
    const { criar } = app.functions.gerarTemplates
    const { enviar } = app.functions.enviaremails
    const tbUsuario = app.models.tbusuarios
    const { saltHash } = app.functions
    const controller = {}

    controller.emailRecuperacao = async (req, res) => {
        try {
            const usuario = await getUserByEmail(req.body.email)
            if (usuario !== null) {
                const urlAlterarSenha = `${config.get('mailer.URL')}/novasenha?validar=${usuario.salt}`
                const ret = await enviar(usuario.email, await criar('recuperarSenha', { url: urlAlterarSenha, nome: usuario.nome }))
                res.status(200).json(`E-mail enviado com sucesso. ${ret}`)
            } else {
                res.status(401).json('Nenhum usuario foi localizado para este e-mail.')
            }
        } catch (error) {
            res.status(500).json(`Houve um erro ao enviar o e-mail: ${error}`)
        }
    }

    controller.validarSalt = async (req, res, next) => {
        try {
            const { salt } = req.params
            const usuario = await tbUsuario.findOne({ raw: true, attributes: ['id'], where: { salt } })
            if (usuario === null) {
                res.status(401).json('Acesso negado, salt invalido')
            }
            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }

    controller.alterarSenha = async (req, res) => {
        try {
            const { senha } = req.body; const saltAntigo = req.params.salt; const
                salt = saltHash.gerarSalt()
            if (senha && senha !== undefined) {
                const hash = saltHash.gerarHash(senha, salt)
                await tbUsuario.update({ senha: hash, salt }, { where: { salt: saltAntigo } })
                    .then((ret) => {
                        if (parseInt(ret, 10)) { res.status(200).json('Senha atualizada com sucesso.') }
                    })
            } else {
                res.status(401).json('Nova senha não informada')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    return controller
}
