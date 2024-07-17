const router = require('express').Router()

router.use('/', require('./admin'))
router.use('/', require('./user'))

module.exports = router;