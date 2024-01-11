module.exports = (app) => {
    const customWallersDB = app.data.customerWallets// require('../data/customerWallets.json')
    const controller = {}

    controller.listCustomerWallets = async (req, res) => {
        res.status(200).json(customWallersDB)
    }

    return controller
}
