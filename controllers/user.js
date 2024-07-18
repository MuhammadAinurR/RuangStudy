const { User, Course, UserCourse, UserProfile, Category } = require('../models')
const bcrypt = require('bcryptjs');

class UserController {
    static async register(req, res) {
        const { email, password } = req.query;
        try {
            if (email && password) {
                await User.create({
                    ...req.query,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                return res.redirect('/dashboard')
            }
            res.render('register-form')
        } catch (error) {
            res.send(error)
        }
    }

    static login(req, res) {
        const { message } = req.query
        res.render('login-form', { message })
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error('Email not found');
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error('Sorry, your password was incorrect.');
            req.session.user = { id: user.id, email: user.email, role: user.role }; // set session on controller when logged in
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error.message);
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
            const { user } = req.session
            const userProfile = await User.findByPk(user.id, {
                include: {
                    model: UserProfile,
                    attributes: ['name']
                },
                attributes: ['id', 'email']
            });
            const courseDetails = await User.findByPk(user.id, {
                include: {
                    model: Course
                },
                attributes: ['id']
            })
            res.render('user-dashboard', { userProfile, courseDetails, userImage: user.image })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async academy(req, res) {
        try {
            const { user } = req.session
            const allCourses = await Course.findAll();

            const userCourses = await User.findByPk(user.id, {
                include: {
                    model: Course
                },
                attributes: ['id']
            })
            res.render('academy', { allCourses, userCourses, userImage: user.image })
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
            res.render('course', { course, userEnrolled, userImage: user.image })
        } catch (error) {
            
        }
    }

    static async category(req, res) {
        const { user } = req.session
        const { id } = req.params;
        try {
            const pathCourses = await Category.findByPk(id, {
                include: Course
            })
            res.render('category', { pathCourses, userImage: user.image })
        } catch (error) {
            res.send(error)
        }
    }

}
module.exports = UserController;