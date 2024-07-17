const { User } = require('../models')
class UserController {
    static async getUsers(req, res) {
        try {
            res.send(await User.findAll())
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}
module.exports = UserController;