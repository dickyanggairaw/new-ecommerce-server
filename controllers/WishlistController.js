const { User, Product, Wishlist } = require('../models')

class WishlistController {
  static async create (req, res, next) {
    try {
      let data = {
        UserId: req.currentUser.id,
        ProductId: req.params.ProductId
      }
      const wishlist = await Wishlist.create(data,{
        attributes: ['id', 'UserId', 'ProductId']
      })
  
      res.status(200).json({
        id: wishlist.id,
        UserId: wishlist.UserId,
        ProductId: wishlist.ProductId
      })
    } catch (error) {
      next(error)
    }
  }
  static async fetchAll (req, res, next) {
    try {
      const wishlists = await Wishlist.findAll({
        where:{
          UserId: req.currentUser.id
        },
        attributes: ['id', 'UserId', 'ProductId'],
        include: Product
      })

      const dataWishlists = wishlists.map(el=>{
        return {
          id: el.id,
          UserId: el.UserId,
          ProductId: el.ProductId,
          Product: {
            id: el.Product.id,
            name: el.Product.name,
            image_url: el.Product.image_url,
            price: el.Product.price,
            stock: el.Product.stock
          }
        }
      })
      res.status(200).json(dataWishlists)
    } catch (error) {
      next(error)
    }
  }
  static async deleteWishlist (req, res, next) {
    try {
      await Wishlist.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({message: "Successfully delete Wishlist"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WishlistController