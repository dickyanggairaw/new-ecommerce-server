const express = require('express')
const app = require('../app')
const router = express.Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/productController')
const {authtentic, authorize} = require('../middlewares/auth')

router.post('/login', UserController.login)

router.use(authtentic)
router.post('/products', ProductController.create)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)

module.exports = router