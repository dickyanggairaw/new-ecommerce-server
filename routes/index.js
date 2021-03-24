const express = require('express')
const app = require('../app')
const router = express.Router()
const UserController = require('../controllers/UserController')
// const CategoryController = require('../controllers/CategoryController')
const ProductController = require('../controllers/productController')
const CartController = require('../controllers/CartController')
const {authtentic,authtenticAdmin, authorize} = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send("Ecommerce CMS")
})

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(authtentic)
router.get('/products', ProductController.fetchAll)
router.post('/carts/:ProductId', CartController.create)
router.get('/carts', CartController.fetchCarts)
router.delete('/carts/:id', CartController.deleteCart)
router.put('/carts/:id', CartController.updateStockCart)
router.put('/checkout', CartController.checkout)
router.post('/products', authtenticAdmin, ProductController.create)
router.get('/products/:id', authtenticAdmin, ProductController.findProduct)
router.put('/products/:id', authtenticAdmin, ProductController.update)
router.delete('/products/:id', authtenticAdmin, ProductController.delete)
// router.post('/categories/:id', authtenticAdmin, CategoryController.create)
// router.get('/categories', authtenticAdmin, CategoryController.fetchCategories)
// router.get('/categories/:name', authtenticAdmin, CategoryController.findCategoryByName)
// router.delete('/categories/:name', authtenticAdmin, CategoryController.deleteCategory)

module.exports = router