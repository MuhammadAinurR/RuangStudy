const AdminController = require('../controllers/admin');
const { isSuperUser } = require('../middlewares/auth');

const router = require('express').Router()

// apply middleware for admin routes
router.use(isSuperUser);

router.get('/admin', AdminController.home);

// category
router.get('/admin/categories', AdminController.getCategories);
router.get('/admin/categories/add', AdminController.getAddCategories);
router.post('/admin/categories/add', AdminController.postAddCategories);
router.get('/admin/categories/:id/courses', AdminController.getCoursesByCategories);

//courses
router.get('/admin/courses', AdminController.getCourses);
router.get('/admin/courses/add', AdminController.getAddCourse);
router.post('/admin/courses/add', AdminController.postAddCourse);
router.get('/admin/courses/:id/edit', AdminController.getEditCourse);
router.post('/admin/courses/:id/edit', AdminController.postEditCourse);

//users
router.get('/admin/users', AdminController.getUsers);
router.get('/admin/users/:id/detail', AdminController.getUserDetail);



module.exports = router;