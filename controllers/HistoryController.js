const { History } = require('../models')

class HistoryController {
  static async fetchHistory ( req, res, next ) {
    try {
      const histories = await History.findAll({
        where: {
          UserId: req.currentUser.id
        },
        order: [['id', 'DESC']]
      })
      const dataHistories = histories.map(el => {
        const pubDate = new Date(el.createdAt);
        const month = pubDate.getMonth() + 1;
        const date = pubDate.getDate();
        const fullDate = `${pubDate.getFullYear()}-${
        month <= 9 ? "0" + month : month
        }-${date <= 9 ? "0" + date : date}`;

        return {
          id: el.id,
          name: el.name,
          UserId: el.UserId,
          image_url: el.image_url,
          price: el.price,
          stock: el.stock,
          createdAt: fullDate
        }
      })
      res.status(200).json(dataHistories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HistoryController