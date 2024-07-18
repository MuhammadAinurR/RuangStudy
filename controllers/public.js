const { User, Course, UserCourse, UserProfile, Category } = require('../models')

class PublicController {
    static async event(req, res) {
        const { user } = req.session
        try {
            res.render('event', { user })
        } catch (error) {
            res.send(error)
        }
    }

    static async home(req, res) {
        const { user } = req.session
        res.render('home', { user })
    }
}
module.exports = PublicController;