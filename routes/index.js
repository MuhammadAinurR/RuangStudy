const router = require('express').Router()

router.use('/', require('./user'))
router.use('/', require('./admin'))

module.exports = router;