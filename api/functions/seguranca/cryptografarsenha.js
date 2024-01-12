const cryptoJs = require('crypto-js');

module.exports = () => {
    const funcoes = {}
    funcoes.encryptSBDOra = (senha) => cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(senha))
    funcoes.decryptSBDOra = (senha) => cryptoJs.enc.Base64.parse(senha).toString(cryptoJs.enc.Utf8)
    return funcoes
}
