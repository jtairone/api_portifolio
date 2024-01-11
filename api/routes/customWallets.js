module.exports = (app) => {
    const controller = app.controllers.customerWallets

    app.route('/api/customer-wallets').get(controller.listCustomerWallets)
}
