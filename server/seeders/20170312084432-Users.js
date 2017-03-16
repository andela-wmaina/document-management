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
          password: '$2a$10$Jpu1xyNkTbTOOh58A0hPUedXcVsvkVveL93vvRVMh7wJ6UHo.VZlW',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
         {
          username: 'Fox',
          email: 'fox@tree.com',
          password: '$2a$10$Jpu1xyNkTbTOOh58A0hPUeKg88n1ReTfs05eD9Z8VdWPsOwG5s3BO',
          roleId: 2,
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
