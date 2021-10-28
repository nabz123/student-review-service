'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Institutions', [{
      Institution_name: 'University of Otago',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'Otago Polytechnic',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'University of Canterbury',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'Lincoln University',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'Victoria University of Wellington',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'University of Auckland',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      Institution_name: 'Auckland University of Technology',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Institutions', null, {});
    
  }
};
