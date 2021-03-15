const {Product} = require('../models')

class ProductController{
    static create(req, res, next){
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(body)
            .then(data=>{
                res.status(201).json({
                    id: data.id,
                    name: data.name,
                    image_url: data.image_url,
                    price: data.price,
                    stock: data.stock
                })
            })
            .catch(err=>{
                // console.log(err)
                next(err)
            })
    }
    static update(req, res, next){
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(body, {
            where:{
                id: req.params.id
            }, 
            returning: true
        })
            .then(data=>{
                res.status(200).json({
                    id: data[1][0].id,
                    name: data[1][0].name,
                    image_url: data[1][0].image_url,
                    price: data[1][0].price,
                    stock: data[1][0].stock
                })
            })
            .catch(err=>{
                // console.log(err)
                next(err)
            })
    }

    static delete(req, res, next){
        console.log(req.params.id)
        Product.destroy({
            where:{
                id: req.params.id
            },
            returning: true
        })
            .then(data=>{
                console.log(data)
                res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err)
                next(err)
            })
    }
}

module.exports = ProductController