module.exports = (app) => {
    const controller = {}
    const tbemail = app.models.tbsendmail
    controller.configemailsave = async (req, res) => {
        if (req.body) {
            const dados = await tbemail.findAll({ attributes: ['host', 'port', 'user', 'pass', 'secure', 'tls'], raw: true, where: { id: 1 } })
            dados.length === 0 ? tbemail.create({
                host: req.body.host,
                port: req.body.port,
                user: req.body.user,
                pass: req.qbody.pass,
                secure: req.body.sslradios,
                tls: req.body.tlsradios,
            })
                : tbemail.update({
                    host: req.body.host,
                    port: req.body.port,
                    user: req.body.user,
                    pass: req.body.pass,
                    secure: req.body.sslradios,
                    tls: req.body.tlsradios,
                }, { where: { id: 1 } })
        }
        res.status(200).json('OK')
    }
    return controller
}
