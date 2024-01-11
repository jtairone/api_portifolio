const rateLimit = require('express-rate-limit')

module.exports = () => {
    const funcoes = {}
    funcoes.limitarRequest = rateLimit({
        windowMs: 60000, // maximo 50 requisições por minuto por IP
        max: 50,
        message: { 'Rate-Limit': 'Limite de requisições excedido favor aguardar 30 segundos solicitar novamente' },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    return funcoes
}
