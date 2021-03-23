const { Category, Product } = require('../models')

class CategoryController {
  static create (req, res, next) {
    const data = {
      name: req.body.name,
      ProductId: req.params.id
    }
    Category.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
    Category.create()
  }
  static fetchCategories(req, res, next) {
    Category.findAll({
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  } 
  static findCategoryByName(req, res, next) {
    Category.findOne({
      where:{
        name: req.params.name
      },
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  } 
  static deleteCategory (req, res, next) {
    Category.destroy({
      where: {
        name: req.params.name
      }
    })
      .then(()=> {
        res.status(200).json({message: `Success delete Category ${req.params.name}`})
      })
  }
}

module.exports = CategoryController