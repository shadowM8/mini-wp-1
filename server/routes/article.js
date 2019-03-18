const router = require('express').Router()
const articleController = require('../controllers/article.js')
const auth = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const { multer, sendUploadToGCS } = require('../helpers/upload')

router.use(auth)

router.post('/', multer.single('image'), sendUploadToGCS, articleController.create)
router.get('/', articleController.readAll)


router.get('/:id', articleController.readOne)

router.use('/:id', authorize)

router.put('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router