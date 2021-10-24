'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Hall, {
        foreignKey: 'hall_id',
        as: 'hall'
      });
    }
  };
  Review.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    class_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
