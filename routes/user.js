const router = require('express').Router()
const UserController = require('../controllers/user');
const { isLoggedin }= require('../middlewares/auth');

router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)

router.use(isLoggedin)
router.get('/dashboard', UserController.dashboard)

module.exports = router;