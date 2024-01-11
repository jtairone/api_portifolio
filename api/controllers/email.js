module.exports = (app) => {
    const controller = {}
    const tbemail = app.models.tbsendmail
    controller.email = async (req, res) => {
        const dados = await tbemail.findAll({ attributes: ['host', 'port', 'user', 'pass', 'secure', 'tls'], raw: true, where: { id: 1 } })
        // console.log(Object.entries(dados).length)
        const data0 = dados.length > 0 ? dados[0] : {
            host: '', port: '', user: '', secure: '', tls: '',
        }
        res.render('email', {
            data: data0,
        })
    }
    return controller
}
