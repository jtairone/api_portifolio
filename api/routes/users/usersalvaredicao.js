module.exports = (app) => {
    const controller = app.controllers.users.usersalvaredicao
    app.route('/usersalvaredicao').post(controller.usersalvaredicao)
}
