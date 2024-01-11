module.exports = (app) => {
    const empregados = 'SELECT P.MATRICULA, P.NOME, P.SEXO FROM PCEMPR P WHERE P.MATRICULA = :MATRICULA'
    return empregados
}
