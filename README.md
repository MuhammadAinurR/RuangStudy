# RuangStudy

### run in order
- npm i
- sequelize db:drop
- sequelize db:create
- sequelize db:migrate
- sequelize db:seed:all
- node --watch .

copy this bash for hard reset DB <br>
```bash
sequelize db:drop && \
sequelize db:create && \
sequelize db:migrate && \
sequelize db:seed:all && \
node --watch .
```

## endpoint list
### Admin
```js
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
```
### User / Public
```js
router.get('/', UserController.landing)

router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)

router.get('/event', PublicController.event)
router.get('/academy', UserController.academy)
router.get('/course/:id', UserController.course)
router.get('/home', PublicController.home)
router.get('/dashboard', publicDashboard, UserController.dashboard)

// force dummy login => Uncomment to force the login so the development will be easier
// router.use((req, res, next) => {
//     req.session.user = { id: 1, email: "ainurmoh@gmail.com", role: "SuperUser", image: "https://as2.ftcdn.net/v2/jpg/00/81/49/73/1000_F_81497385_G0PLVpeTpxNmMpmrd1X5ZhcBeNuYEfdK.jpg" };
//     next()
// })

// login middleware
router.use(isLoggedin)
router.get('/course/:id/class', isPurchase, UserController.courseClass)
router.get('/category/:id', UserController.category)
router.get('/purchase/:UserId/:CourseId', UserController.purchase)
router.post('/purchase/:UserId/:CourseId', UserController.purchasePost)
router.get('/user/edit', UserController.editUser)
router.post('/user/edit', UserController.editUserPost)
router.get('/signout', UserController.logOut)
```