const { Op } = require('sequelize');
const dateFormat = require('../helpers/dateFormat');
const { User, Course, UserCourse, UserProfile, Category } = require('../models')
const bcrypt = require('bcryptjs');
const errorFormat = require('../helpers/errorFormat');

class UserController {
    static async register(req, res) {
        const { email, password, confirmPassword, message } = req.query;
        try {
            console.log(req.query)
            if (password != confirmPassword) return res.redirect("/register?message=password doesn't match")
            if (email && password) {
                await User.create({
                    ...req.query,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                return res.redirect('/login?messageSuccess=email success registered, login now!')
            }
            res.render('register-form', { message })
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.redirect("/register?message=email already registered")
            }
            if (error.name === "SequelizeValidationError") {
                // validation isEmail, password length
                return res.redirect(`/register?message=${errorFormat(error)}`)
            }
            res.send(error)
        }
    }

    static login(req, res) {
        const { message, messageSuccess } = req.query
        res.render('login-form', { message, messageSuccess })
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ include: UserProfile, where: { email } });
            if (!user) throw new Error('Email not found');
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error('Sorry, your password was incorrect.');
            req.session.user = { id: user.id, email: user.email, role: user.role, image: user.UserProfile.image }; // set session on controller when logged in
            res.redirect('/dashboard');
        } catch (error) {
            res.status(401).redirect(`/login?message=${error.message}`); // Unauthorized status for incorrect email/password
        }
    }

    static logOut(req, res) {
        try {
            if (req.session) req.session.destroy();
            res.redirect(`/login?message=logout success`)
        } catch (error) {
            res.send(error)
        }
    }

    static async dashboard(req, res) {
        try {
            const { message } = req.query;
            const { user } = req.session
            const { userProfile, courseDetails } = await User.getDashboard({ user })
            res.render('user-dashboard', { userProfile, courseDetails, user, message })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async academy(req, res) {
        try {
            const { user } = req.session
            const { category, search } = req.query
            let userCourses = []
            let allCourses = []
            let where = {}

            const allCategories = await Category.findAll()

            if (category === 'myclass') {
                if (!user) return res.redirect('/login');
                userCourses = await User.findByPk(user.id, {
                    include: {
                        model: Course
                    },
                    attributes: ['id'],
                    order: [[{ model: Course }, 'name', 'ASC']]
                })
                return res.render('academy', { allCourses, userCourses, user, allCategories })
            }

            if (category) where = { CategoryId: category }
            if (search) where = { name: {
                [Op.iLike]: `%${search}%`
            } }
            allCourses = await Course.findAll({ where: where, order: [['name', 'ASC']] });
            res.render('academy', { allCourses, userCourses, user, allCategories })
        } catch (error) {
            res.send(error)
        }
    }

    static async course(req, res) {
        const { user } = req.session
        const { id } = req.params
        try {
            const course = await Course.findByPk(id, {
                include: Category
            })
            const userEnrolled = await UserCourse.count({
                where: {
                    CourseId: id
                }
            })
            res.render('course', { course, userEnrolled, user })
        } catch (error) {

        }
    }

    static async category(req, res) {
        const { user } = req.session
        const { id } = req.params;
        try {
            const pathCourses = await Category.findByPk(id, {
                include: Course,
                order: [[{ model: Course }, 'name', 'ASC']]
            })
            res.render('category', { pathCourses, user })
        } catch (error) {
            res.send(error)
        }
    }

    static async courseClass(req, res) {
        const { id } = req.params;
        const kelas = await Course.findByPk(id)
        try {
            res.render('course-class', { kelas })
        } catch (error) {
            res.send(error)
        }
    }

    static async purchase(req, res) {
        const { user } = req.session
        const { message } = req.query
        const { CourseId } = req.params;
        try {
            const course = await Course.findByPk(CourseId);
            res.render('purchase', { message, user, course })
        } catch (error) {
            res.send(error)
        }
    }

    static async purchasePost(req, res) {
        try {
            await UserCourse.create({
                ...req.params,
                createdAt: new Date(),
                deletedAt: new Date()
            })
            res.redirect('/dashboard?message=selamat kelas anda telah bertambah')
        } catch (error) {
            res.send(error)
        }
    }

    //landing page
    static async landing(req, res) {
        try {
            res.render('LandingPage')
        } catch (error) {
            res.send(error)
        }
    }

    static async editUser(req, res) {
        const { user } = req.session
        try {
            const selectedUser = await UserProfile.findOne({
                where: {
                    UserId: user.id
                }
            })
            res.render('edit-profil-form', { user, selectedUser, dateFormat })
        } catch (error) {
            res.send(error)
        }
    }
    static async editUserPost(req, res) {
        const { user } = req.session
        try {
            const selectedUser = await UserProfile.findOne({
                where: {
                    UserId: user.id
                }
            })
            const { dob, ...rest } = req.body;
            const updateObj = { ...rest }
            if (dob) updateObj.dob = dob
            await selectedUser.update(updateObj)
            res.redirect('/dashboard')
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = UserController;