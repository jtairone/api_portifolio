module.exports = (app) => {
    const controller = {}
    const tbOracle = app.models.tboracle
    const funcoes = app.functions.cryptografarsenha
    controller.configsave = async (req, res) => {
        if (req.body) {
            const dados = await tbOracle.findOne({
                raw: true,
                attributes: ['host', 'port', 'sid', 'user', 'pass'],
                where: { id: 1 },
            })
            req.body.pass = funcoes.encryptSBDOra(req.body.pass)
            dados === null ? tbOracle.create(req.body) : tbOracle.update(req.body, { where: { id: 1 } })
        }
        res.status(200).json('ok')
    }
    return controller
}
