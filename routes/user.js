const router = require('express').Router()
const PublicController = require('../controllers/public');
const UserController = require('../controllers/user');
const { isLoggedin }= require('../middlewares/auth');
const { isPurchase } = require('../middlewares/purchaseStatus');

router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)

router.get('/courses', PublicController.courses)

// force dummy login
// router.use((req, res, next) => {
//     req.session.user = { id: 1, email: "ainurmoh@gmail.com", role: "SuperUser", image: "https://as2.ftcdn.net/v2/jpg/00/81/49/73/1000_F_81497385_G0PLVpeTpxNmMpmrd1X5ZhcBeNuYEfdK.jpg" };
//     next()
// })

// login middleware
router.use(isLoggedin)
router.get('/course/:id', UserController.course)
router.get('/course/:id/class', isPurchase, UserController.courseClass)
router.get('/dashboard', UserController.dashboard)
router.get('/academy', UserController.academy)
router.get('/signout', UserController.logOut)
router.get('/category/:id', UserController.category)
router.get('/purchase/:UserId/:CourseId', UserController.purchase)
router.post('/purchase/:UserId/:CourseId', UserController.purchasePost)

module.exports = router;