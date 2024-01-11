module.exports = (app) => {
    const controller = {}
    const consulta = app.querys.xmlnotafiscal
    controller.buscarXml = async (req, res) => {
        const oracle = await app.database.oracle
        const { numtransvenda } = req.body
        // await oracle.init()
        const data = await oracle.execute(consulta, [numtransvenda])
        // await oracle.closePool()
        res.json(data.rows)
    }
    return controller
}
