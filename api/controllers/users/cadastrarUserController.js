const path = require('path')
const sequelize = require('sequelize')

module.exports = (app) => {
    const controller = {}
    const { saltHast } = app.functions
    const arquivos = app.functions.renomeararquivos
    const tbUsers = app.models.tbusuarios
    controller.cadastrarUsuario = async (req, res) => {
        try {
            const {
                nome, email, codErp, tipoPerfil,
            } = req.body
            if (tipoPerfil && codErp) {
                const nUsuarios = await tbUsers.findAll({ raw: true, attributes: [[sequelize.fn('COUNT', sequelize.col('id'))]], where: { tipoperfil: tipoPerfil, coderp: codErp } })
                console.log(typeof nUsuarios)
                if (nUsuarios !== 0) {
                    const salt = saltHast.gerarSalt()
                    const hash = saltHast.gerarHash(req.body.senha, salt)
                    // const result = funcoes.validarSenha(req.body.senha, hash)
                    // console.log(`Senha é : ${result}`)
                    const user = await tbUsers.create({
                        nome,
                        email: email.toLowerCase(),
                        rca: (req.body.tipoPerfil === 'V' || req.body.tipoPerfil === 'S') ? req.body.codErp : null,
                        matricula: (req.body.tipoPerfil !== 'V' && req.body.tipoPerfil !== 'S') ? req.body.codErp : null,
                        tipoperfil: req.body.tipoPerfil,
                        salt,
                        hash,
                    })
                    if (req.file) {
                        const nomefile = `${user.id}${path.extname(req.file.originalname)}`
                        tbUsers.update({ foto: nomefile }, { where: { id: user.id } })
                        arquivos.renomearArquivos(req.file, nomefile)
                    }
                    res.json(`User Cadastrado Id: ${user.id} e nome: ${user.nome}`)
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    return controller
}
