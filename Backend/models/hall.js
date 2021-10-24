'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    static associate(models) {
      Hall.belongsTo(models.Institution, {
        foreignKey: 'institution_id',
        as: 'institution'
      });
      Hall.hasMany(models.Review, {
        foreignKey: 'review_id',
        as: 'reviews',
      });
    }
  };
  Hall.init({
    hall_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hall',
  });
  return Hall;
};
