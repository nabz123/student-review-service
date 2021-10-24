'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('Halls', [{
      hall_name: 'Aquinas College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Arana College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Carloine Freeman College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Carringoton College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Cumberland College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Hayward College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Knox College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'St Margarets College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Salmond College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Selwyn College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Studholme College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Te Rangi Hiroa College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Toroa College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'University College',
      institution_id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Student Village',
      institution_id: "2",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Arcady Hall',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'College House',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Hayashi',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Ilam Apartments',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Kirkwood Avenue Hall',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Kirkwood Flats',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Rochester and Rutherford Hall',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Sonoda Christchurch Campus',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Tupuānuku, University Hall',
      institution_id: "3",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Centennial Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Colombo Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Hudson Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Lowrie Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'The Quarters',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Southland Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Stevens Hall',
      institution_id: "4",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Boulcott Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Capital Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Everton Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Helen Lowry Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Joan Stevens Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Katharine Jermyn Hall',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Te Puni Village',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'UniLodge - Stafford House',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Kelburn Flats—Whare Hīnau',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Whānau Housing—Whare Hīnau: Kelburn Flats',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Victoria House',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Weir House',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Willis Street Halls - Cumberland House',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Willis Street Halls - Education House',
      institution_id: "5",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'UniLodge Anzac/Beach',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Te Tirohanga o te Tōangaroa',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Carlaw Park Student Village',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Waikohanga House',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'O’Rorke Hall',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: '55 Symonds',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'University Hall – Apartments',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'University Hall – Towers',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'UniLodge Whitaker',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Waipärürü – Whitaker Block',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Waipärürü Hall',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Grafton Student Flats',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Grafton Hall',
      institution_id: "6",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Mayoral Drive Student Accommodation',
      institution_id: "7",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Wellesley Student Apartments',
      institution_id: "7",
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      hall_name: 'Akoranga Student Village',
      institution_id: "7",
      createdAt: new Date(),
      updatedAt: new Date()
      
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Halls', null, {});
    
  }
};
