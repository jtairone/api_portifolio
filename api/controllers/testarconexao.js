module.exports = (app) => {
    const controller = {}

    controller.testarconexao = async (req, res) => {
        const oracle = await app.database.oracle
        try {
            const retorno = await oracle.testarConexao(req.body)
            res.json({ status: retorno })
        } catch (error) {
            console.log(error)
        }
    }
    return controller
}
