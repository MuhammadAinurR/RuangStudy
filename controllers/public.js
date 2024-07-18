const { User, Course, UserCourse, UserProfile, Category } = require('../models')

class PublicController {
    static async courses(req, res) {
        const { category } = req.query
        const { user } = req.session
        try {
            let where = {}
            if (category) {
                where = {CategoryId: category}
            }
            const allCourses = await Course.findAll({
                where: where,
                order: [['name', 'ASC']]
            });
            const allCategories = await Category.findAll()
            res.render('courses', { allCourses, allCategories, user })
        } catch (error) {
            res.send(error)
        }
    }

    static async event(req, res) {
        const { user } = req.session
        try {
            res.render('event', { user })
        } catch (error) {
            res.send(error)
        }
    }

}
module.exports = PublicController;