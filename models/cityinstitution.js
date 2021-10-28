'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CityInstitution extends Model {
    static associate(models) {
      // define association here
    }
  };
  CityInstitution.init({
    city_id: DataTypes.INTEGER,
    institution_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CityInstitution',
  });
  return CityInstitution;
};