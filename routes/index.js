const express = require('express')
const app = require('../app')
const router = express.Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/productController')
const {authtentic,authtenticAdmin, authorize} = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send("Ecommerce CMS")
})

router.post('/login', UserController.login)

router.use(authtentic)
router.get('/products', ProductController.fetchAll)
router.post('/products', authtenticAdmin, ProductController.create)
router.get('/products/:id', authtenticAdmin, ProductController.findProduct)
router.put('/products/:id', authtenticAdmin, ProductController.update)
router.delete('/products/:id', authtenticAdmin, ProductController.delete)

module.exports = router