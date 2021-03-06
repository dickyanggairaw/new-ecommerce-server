'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: 'Cart'
      })
      Product.belongsToMany(models.User, {
        through: 'Wishlist'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        min: 0,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};