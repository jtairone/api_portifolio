module.exports = (app) => {
    const controller = app.controllers.users.users
    app.route('/users').get(controller.users)
}
