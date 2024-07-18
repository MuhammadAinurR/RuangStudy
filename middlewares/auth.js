const session = require('express-session')

const isLoggedin = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login?message=you need login to get the access')
}

const isSuperUser = (req, res, next) => {
    if (req.session.user === undefined) return res.redirect('/login?message=you need login to get the access')
    if (req.session.user.role !== 'SuperUser') return res.redirect('/login?message=your account doesnt have access for this site');
    next();
}

const publicDashboard = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/home')
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

module.exports = { isLoggedin, sessionConfig, isSuperUser, publicDashboard };