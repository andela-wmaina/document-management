'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
       return queryInterface.bulkInsert('Users', [
        {
          username: 'Peter',
          email: 'peter@tree.com',
          password: 'peter',
          roleId: '64',
          createdAt: new Date(),
          updatedAt: new Date()
        },
         {
          username: 'Fox',
          email: 'fox@tree.com',
          password: 'fox',
          roleId: '65',
          createdAt: new Date(),
          updatedAt: new Date()
        }]
      );
  },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
