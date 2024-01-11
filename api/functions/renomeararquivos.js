const path = require('path')
const fs = require('fs')

module.exports = () => {
    const funcoes = {}
    funcoes.renomearArquivos = (files, nomeArquivo) => {
        // Verifique se 'files' é um array
        if (!Array.isArray(files)) {
            files = [files]; // Se não for um array, transforme em um array com um único elemento
        }
        files.map((file, index) => {
            fs.renameSync(
                `${path.resolve(__dirname, '../..')}\\${file.path}`,
                `${path.resolve(__dirname, '../..')}\\${path.dirname(file.path)}\\${nomeArquivo[index]}${path.extname(file.originalname)}`,
            )
        })
    }

    return funcoes
}
