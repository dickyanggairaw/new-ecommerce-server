const { History } = require('../models')

class HistoryController {
  static async create( req, res, next ) {
    try {
      let data = {
        UserId: req.currentUser.id,
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const history = await History.create(data)

      res.status(201).json({
        id: history.id,
        UserId: history.UserId,
        name: history.name,
        image_url: history.image_url,
        price: history.price,
        stock: history.stock
      })
    } catch (error) {
      next(error)
    }
  }
  static async fetchHistory ( req, res, next ) {
    try {
      const histories = await History.findAll({
        where: {
          UserId: req.currentUser.id
        }
      })
      res.status(200).json(histories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HistoryController