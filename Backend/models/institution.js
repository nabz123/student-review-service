'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    static associate(models) {
      Institution.belongsToMany(models.City, {
        through: 'CityInstitution',
        as: 'cities',
        foreignKey: 'institution_id'
      });
      Institution.hasOne(models.Hall, {
        foreignKey: 'hall_id',
        as: 'hall',
      });
    }
  };
  Institution.init({
    hall_id: DataTypes.INTEGER,
    institution: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Institution',
  });
  return Institution;
};
