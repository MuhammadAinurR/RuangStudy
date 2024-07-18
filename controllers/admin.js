const { where, Op } = require('sequelize');
const { Category, Course, User, UserCourse, UserProfile } = require('../models');

class AdminController {
    static async home(req, res){
        try {
            const categoriesCount = await Category.count();
            const coursesCount = await Course.count();
            const usersCount = await User.count();
            res.render('admin/Home', { categoriesCount, coursesCount, usersCount });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getCategories(req, res){
        const { search, msg } = req.query;
        try {
            const categories = await Category.findAll({
                where: search ? { name: { [Op.iLike]: `%${search}%` } } : {}
            });

            res.render('admin/Categories', { categories, msg });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getAddCategories(req, res){
        const { err } = req.query;
        try {
            res.render('admin/AddCategory', { err });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postAddCategories(req, res){
        const { name } = req.body;
        try {
            const categories = await Category.create({ name });

            const msg = `Success add New Category ${name}`

            res.redirect(`/admin/categories?msg=${msg}`);
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                const err = error.errors.map((e) => {
                    return e.message
                })

                res.redirect(`/admin/categories/add?err=${err}`)
            }else{
                res.send(error);
            }
        }
    }

    static async getCoursesByCategories(req, res){
        const { id } = req.params;
        try {
            const courses = await Course.findAll({ 
                where: {CategoryId: id},
                include: {
                    model: User
                }
             });

             const cat = await Category.findByPk(id)

            //  res.send(courses)
            res.render('admin/CoursesByCategory', { courses, cat });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getCourses(req, res){
        const { search, msg } = req.query;
        try {
            const courses = await Course.findAll({
                where: search ? { name: { [Op.iLike]: `%${search}%` } } : {},
                include: {
                    model: User
                }
            });

            // res.send(courses)
            res.render('admin/Courses', { courses, msg });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getAddCourse(req, res){
        const { err } = req.query;
        try {
            const categories = await Category.findAll() 
            res.render('admin/AddCourse', { categories, err });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postAddCourse(req, res){
        const { CategoryId, name, description, image, jumlahModul } = req.body;
        try {
            const course = await Course.create({ CategoryId, name, description, image, jumlahModul });

            const msg = `Success add New Course ${name}`

            res.redirect(`/admin/courses?msg=${msg}`);
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                const err = error.errors.map((e) => {
                    return e.message
                })

                res.redirect(`/admin/courses/add?err=${err}`)
            }else{
                res.send(error);
            }
        }
    }

    static async getEditCourse(req, res){
        const { id } = req.params;
        const { err } = req.query;
        try {
            const categories = await Category.findAll() 
            const course = await Course.findByPk(id) 
            res.render('admin/EditCourse', { course, categories, err });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postEditCourse(req, res){
        const { CategoryId, name, description, image, jumlahModul } = req.body;
        const { id } = req.params;
        try {
            const course = await Course.update({ CategoryId, name, description, image, jumlahModul }, {
                where: {id}
            });

            const msg = `Success Update Course ${name}`

            res.redirect(`/admin/courses?msg=${msg}`);
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                const err = error.errors.map((e) => {
                    return e.message
                })

                res.redirect(`/admin/courses/${id}/edit?err=${err}`)
            }else{
                res.send(error);
            }
        }
    }

    static async getUsers(req, res){
        const { search } = req.query;
        try {
            const users = await User.findAll({
                // where: search ? { name: { [Op.iLike]: `%${search}%` } } : {},
                include: [UserProfile,
                    {
                        model: Course
                    }
                ]
            });

            // res.send(users)
            res.render('admin/Users', { users });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getUserDetail(req, res){
        const { id } = req.params;
        try {
            const user = await User.findByPk(id, {
                include: [UserProfile,
                    {
                        model: Course,
                        include: Category
                    }
                ]
            });

            // res.send(user)
            res.render('admin/UserDetail', { user });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}
module.exports = AdminController;