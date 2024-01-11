const moment = require('moment')

module.exports = () => {
    const funcoes = {}
    funcoes.agora = () => {
        const data = moment().format('DD/MM/YYYY HH:mm:ss')
        return data
    }
    return funcoes
}
