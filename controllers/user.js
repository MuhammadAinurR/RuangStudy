const { User } = require('../models')
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
            console.log(user)
            req.session.user = { id: user.id, email: user.email, role: user.role }; // set session on controller when logged in
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error.message);
            res.status(401).redirect(`/login?message=${error.message}`); // Unauthorized status for incorrect email/password
        }
    }

    static async dashboard(req, res) {
        try {
            res.render('user-dashboard')
        } catch (error) {
            
        }
    }
}
module.exports = UserController;