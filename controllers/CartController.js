const { Cart, User, Product} = require('../models')

class CartController {
  static create ( req, res, next ) {
      let data = {
        UserId: req.currentUser.id,
        ProductId: req.params.ProductId,
        stock: 0
      }
      Cart.findOrCreate({
        where: {
          UserId: req.currentUser.id,
          ProductId: req.params.ProductId
        },
        defaults: data,
        attributes: ['id', 'UserId', 'ProductId', 'stock']
      })
        .then(data => {
          data[0].stock += 1
          const cart = {
            stock: data[0].stock
          }
          return Cart.update(cart, {
            where: {
              ProductId: data[0].ProductId
            },
            returning: true
          })
        })
        .then(data=>{
          const cart = {
            UserId: data[1][0].UserId,
            ProductId: data[1][0].ProductId,
            stock: data[1][0].stock
          }
          res.status(200).json(cart)
        })      
        .catch(err=>{
          next(err)
        })
  }
  static async fetchCarts (req, res, next) {
    try {
      const carts = await Cart.findAll({
        where: {
          UserId: req.currentUser.id
        },
        include: Product,
        attributes: ['id', 'UserId', 'ProductId', 'stock']
      })
      const dataCarts = carts.map(el => {
        return {
          id: el.id,
          UserId: el.UserId,
          ProductId: el.ProductId,
          stock: el.stock,
          Product: {
            id: el.Product.id,
            name: el.Product.name,
            image_url: el.Product.image_url,
            price: el.Product.price,
            stock: el.Product.stock
          }
        }
      })
      res.status(200).json(dataCarts)
    } catch (error) {
      next(error)
    }
  }
  static async deleteCart (req, res, next) {
    try {
      await Cart.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({message: "Successfully delete Product"})
    } catch (error) {
      next(error)
    }
  }
  static async updateStockCart (req, res, next) {
    try {
      const data = {
        stock: req.body.stock
      }
      const cart = await Cart.update(data, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      const dataCart = {
        UserId: cart[1][0].UserId,
        ProductId: cart[1][0].ProductId,
        stock: cart[1][0].stock
      }
      res.status(200).json(dataCart)
    } catch (error) {
      next(error)
    }
  }
  static checkout (req, res, next) {
    Cart.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        let data = {
          stock: req.body.stockProduct - req.body.stock
        }
        return Product.update(data, {
          where: {
            id: req.body.ProductId
          },
          returning: true
        })
      })
      .then(data => {
        res.status(200).json({
          id: data[1][0].id,
          name: data[1][0].name,
          image_url: data[1][0].image_url,
          price: data[1][0].price,
          stock: data[1][0].stock
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController