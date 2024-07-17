const session = require('express-session')

const isLoggedin = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login?message=you need login to get the access')
}

const sessionConfig = session({
    secret: 'secret101',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
})

module.exports = { isLoggedin, sessionConfig };