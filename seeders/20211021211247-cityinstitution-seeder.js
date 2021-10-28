'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('CityInstitutions', [{
      city_id: '4',
      institution_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '4',
      institution_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '2',
      institution_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '2',
      institution_id: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '3',
      institution_id: '5',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '1',
      institution_id: '6',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_id: '1',
      institution_id: '7',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('CityInstitutions', null, {});
    
  }
};
