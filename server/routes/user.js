const router = require('express').Router()
const userController = require('../controllers/user.js')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/', userController.getAllUser)
// router.post('/googleauth')

module.exports = router