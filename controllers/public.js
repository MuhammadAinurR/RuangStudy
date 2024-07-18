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
            console.log(allCategories)
            res.render('courses', { allCourses, allCategories, user })
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }

}
module.exports = PublicController;