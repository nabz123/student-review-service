'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Cities', [{
      city_name: 'Auckland',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_name: 'Wellington',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_name: 'Christchurch',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      city_name: 'Dunedin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Cities', null, {});
    
  }
};
