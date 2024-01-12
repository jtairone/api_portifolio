const path = require('path')
// const sequelize = require('sequelize')

module.exports = (app) => {
    const controller = {}
    const { saltHash } = app.functions.seguranca
    const arquivos = app.functions.renomeararquivos
    const tbUsers = app.models.tbusuarios
    controller.cadastrarUsuario = async (req, res) => {
        try {
            const { nome, email, senha, matricula,
            } = req.body
            if (nome && email) {
                const nUsuarios = await tbUsers.findAll({ raw: true, attributes: ['nome', 'email', 'matricula', 'salt'], where: { email } })
                if (nUsuarios !== null) {
                    const salt = saltHash.gerarSalt()
                    const hash = saltHash.gerarHash(senha, salt)
                    const user = await tbUsers.create({
                        nome,
                        email: email.toLowerCase(),
                        matricula,
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

    controller.relogar = async (req, res) => {
        try {
            const user = await tbUsers.findOne({ raw: true, attributes: ['nome', 'email', 'matricula', 'foto', 'salt'] }, { where: { salt: req.body.salt } })
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(401).json({ status: 'error' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    controller.userdelete = async (req, res) => {
        try {
            await tbUsers.destroy({ where: { id: req.params.id } })
            res.json('Excluido')
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    controller.useredit = async (req, res) => {
        try {
            const dados = await tbUsers.findOne({ where: { id: req.params.id }, attributes: ['id', 'nome', 'email', 'tipoperfil', 'rca', 'matricula'] })
            res.json(dados)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    controller.users = async (req, res) => {
        // let dataO = {'host': '', 'port':'', 'user':'', 'pass':'', 'sid':''}
        const dados = await tbUsers.findAll({ attributes: ['id', 'nome', 'email', 'rca', 'matricula', 'tipoperfil', 'ultimologin', 'foto'], raw: true })
        dados.forEach((user) => {
            user.origem = req.rawHeaders[1]
        })
        res.render('users', {
            data: dados,
        })
    }

    controller.usersalvaredicao = async (req, res) => {
        try {
            const { id } = req.params
            await tbUsers.update({
                nome: req.body.nome,
                email: req.body.email,
                matricula: req.body.matricula,
            }, { where: { id } })
            if (req.file) {
                const nomefile = `${id}${path.extname(req.file.originalname)}`
                tbUsers.update({ foto: nomefile }, { where: { id } })
                arquivos.renomearArquivos(req.file, nomefile)
            }
            res.json('editado')
        } catch (error) {
            console.log(error)
        }
    }

    return controller
}
