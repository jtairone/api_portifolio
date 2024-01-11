module.exports = (app) => {
    const controller = {}
    const tbOracle = app.models.tboracle
    controller.config = async (req, res) => {
        const dados = await tbOracle.findOne({
            attributes: ['host', 'port', 'sid', 'user', 'pass'],
            raw: true,
            where: { id: 1 },
        }) ?? {
            host: '', port: '', user: '', pass: '', sid: '',
        }
        res.render('config', {
            data: dados,
        })
    }
    return controller
}
