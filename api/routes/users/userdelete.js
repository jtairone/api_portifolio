module.exports = (app) => {
    const controller = app.controllers.users.userdelete
    app.route('/userdelete/:id').get(controller.userdelete)
}
