module.exports = (app) => {
    const cliente = 'SELECT C.CODCLI, C.CLIENTE FROM PCCLIENT C WHERE C.CODCLI = :CODCLI'

    return cliente
}
