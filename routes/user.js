const router = require('express').Router()
router.get('/users', (req, res) => res.send('ini user'))

module.exports = router;