const path = require('path')
const ejs = require('ejs')

module.exports = () => {
    const template = {};
    template.criar = async (arquivo, params) => {
        try {
            const htmlTemplate = await ejs.renderFile(
                path.join(__dirname, `../../views/templates/${arquivo}.ejs`),
                { dados: params },
            )
            return htmlTemplate
        } catch (error) {
            return error
        }
    }
    return template
}
