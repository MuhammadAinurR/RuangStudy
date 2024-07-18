const router = require('express').Router()
const UserController = require('../controllers/user');
const { isLoggedin }= require('../middlewares/auth');

router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)


router.get('/courses')

// dummy login
router.use((req, res, next) => {
    req.session.user = { id: 1, email: "ainurmoh@gmail.com", role: "SuperUser", image: "https://as2.ftcdn.net/v2/jpg/00/81/49/73/1000_F_81497385_G0PLVpeTpxNmMpmrd1X5ZhcBeNuYEfdK.jpg" };
    next()
})

router.use(isLoggedin)
router.get('/dashboard', UserController.dashboard)
router.get('/academy', UserController.academy)
router.get('/signout', UserController.logOut)
router.get('/course/:id', UserController.course)
router.get('/category/:id', UserController.category)

module.exports = router;