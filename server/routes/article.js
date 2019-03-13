const router = require('express').Router()
const articleController = require('../controllers/article.js')
const auth = require('../middlewares/authenticate')

router.use(auth)

router.post('/', articleController.create)
router.get('/', articleController.readAll)
router.get('/:id',articleController. readOne)
router.put('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router