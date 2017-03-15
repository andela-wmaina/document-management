'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Roles', [
        {name: 'ADMIN', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Users', createdAt: new Date(), updatedAt: new Date()}
        ]
      );
    },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Roles', null, {});
    
  }
};

