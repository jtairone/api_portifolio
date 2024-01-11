const nodemailer = require('nodemailer')

module.exports = (app) => {
    const sendmail = {}
    const tbemail = app.models.tbsendmail
    let toSend
    sendmail.init = async () => {
        const dados = await tbemail.findOne({
            attributes: ['host', 'port', 'user', 'pass', 'secure', 'tls'],
            raw: true,
            where: { id: 1 },
        }) ?? {
            host: '', port: '', user: '', pass: '', secure: '', tls: '',
        }
        toSend = dados.user
        const transport = await nodemailer.createTransport({
            host: dados.host,
            port: Number(dados.port),
            secure: dados.secure === 'true', // true for 465, false for other ports
            auth: {
                user: dados.user,
                pass: dados.pass,
            },
            tls: { rejectUnauthorized: dados.tls === 'true' },
        })

        return transport
    }

    sendmail.testarsmtp = async (email) => {
        try {
            const transport = await sendmail.init();

            const mailOptions = {
                from: `Teste <${toSend}>`, // Seu endereço de email
                to: email, // Endereço de email de destino
                subject: 'Teste SMTP', // Assunto do email
                text: 'E-mail de teste configuração SMTP', // Corpo do email
            }
            // Envie o email de teste
            const retorno = await transport.sendMail(mailOptions)
            return retorno
        } catch (error) {
            console.error('Erro ao enviar o email de teste:', error)
        }
    }

    sendmail.enviar = async (email, msgTemplate) => {
        try {
            const transport = await sendmail.init()
            const mailOptions = {
                from: `JT.I - Tecnologia <${toSend}>`,
                to: email,
                subject: 'Recuperação de Senha',
                html: msgTemplate,
            }
            const retorno = await transport.sendMail(mailOptions)
            return retorno.response
        } catch (error) {
            return error.response
        }
    }

    return sendmail
}
