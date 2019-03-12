const router = require('express').Router()
const userController = require('../controllers/user.js')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/googleauth')
// router.get('/')

module.exports = router