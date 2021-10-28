'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsToMany(models.Institution, {
        through: 'CityInstitution',
        as: 'institutions',
        foreignKey: 'city_id'
      });
    }
  };
  City.init({
    city_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
