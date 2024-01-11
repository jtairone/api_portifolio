module.exports = (app) => {
    const sendmail = app.functions.enviaremails
    const controller = {}
    controller.testarsmtp = async (req, res) => {
        try {
            const result = await sendmail.testarsmtp(req.body.email)
            res.status(200).json({ message: `Email de teste enviado com sucesso para ${result.envelope.to}`, status: result.response })
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json('Erro ao enviar o email de teste')
        }
    }
    return controller
}
