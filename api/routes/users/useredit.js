module.exports = (app) => {
    const controller = app.controllers.users.useredit
    app.route('/useredit/:id').get(controller.useredit)
}
