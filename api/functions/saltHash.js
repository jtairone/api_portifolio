const bcrypt = require('bcrypt');

const saltRounds = 12

module.exports = () => {
    const funcoes = {}
    funcoes.gerarSalt = () => bcrypt.genSaltSync(saltRounds)
    funcoes.gerarHash = (senha, salt) => bcrypt.hashSync(senha, salt)
    funcoes.validarSenha = (senha, hash) => bcrypt.compareSync(senha, hash)
    return funcoes
}
