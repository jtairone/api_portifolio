const oracledb = require('oracledb')

oracledb.fetchAsString = [oracledb.CLOB]
// banco oracle acima 12.1 não preciso do instant client
// oracledb.initOracleClient({libDir: './instantclient'});
module.exports = async (app) => {
    const oracle = {}

    oracle.init = async () => {
        try {
            const dados = app.models.tboracle
            const funcoes = require('../functions/cryptografarsenha')
            const config = await dados.findOne({
                attributes: ['host', 'port', 'sid', 'user', 'pass'],
                raw: true,
                where: { id: 1 },
            }) ?? {
                host: '', port: '', sid: '', user: '', pass: '',
            }

            const dbConfig = {
                user: config.user,
                password: funcoes().decryptSBDOra(config.pass),
                connectString: `${config.host}:${config.port}/${config.sid}`,
                poolAlias: 'default',
                extendedMetaData: true,
            }

            await oracledb.createPool(dbConfig)
            // console.log('Pool de conexão Oracle criado com sucesso.');
        } catch (err) {
            console.error('Erro ao criar pool de conexão Oracle: ', err.message)
            process.exit(1)
        }
    }

    oracle.closePool = async () => {
        try {
            await oracledb.getPool().close()
            // console.log('Pool de conexão Oracle fechado com sucesso.')
        } catch (err) {
            console.error('Erro ao fechar pool de conexão Oracle: ', err.message)
        }
    }

    oracle.execute = async (query, binds = [], options = {}) => {
        let connection
        let result

        options.outFormat = oracledb.OUT_FORMAT_OBJECT

        try {
            await oracle.init()
            connection = await oracledb.getConnection()
            result = await connection.execute(query, binds, options)
        } catch (err) {
            console.error('Erro ao executar consulta Oracle: ', err.message)
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close()
                    await oracle.closePool()
                } catch (err) {
                    console.error('Erro ao fechar conexão Oracle: ', err.message)
                }
            }
        }
        return result
    }
    oracle.testarConexao = async (config) => {
        let connection
        // let result
        const dbconfig = {
            user: config.user,
            password: config.pass,
            connectString: `${config.host}:${config.port}/${config.sid}`,
            poolAlias: 'default',
            extendedMetaData: true,
        }
        try {
            connection = await oracledb.createPool(dbconfig)
            return true
        } catch (error) {
            return false
        } finally {
            if (connection) {
                try {
                    await connection.close()
                    // await oracle.closePool()
                } catch (err) {
                    // console.error('Erro ao fechar conexão Oracle: ', err.message)
                }
            }
        }
    }
    return oracle
}
