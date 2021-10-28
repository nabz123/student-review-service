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
      Institution.hasMany(models.Hall, {
        foreignKey: 'institution_id',
        as: 'hall',
      });
    }
  };
  Institution.init({
    hall_id: DataTypes.INTEGER,
    Institution_name: DataTypes.STRING
  }, {
    sequelize,
    tableName:"Institutions",
    modelName: 'Institution',
  });
  return Institution;
};
