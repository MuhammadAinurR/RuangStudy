const UserController = require('../controllers/user');

const router = require('express').Router()

router.get('/', UserController.getUsers)

module.exports = router;