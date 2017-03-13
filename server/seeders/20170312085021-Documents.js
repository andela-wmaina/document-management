'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
        return queryInterface.bulkInsert('Documents', [
        {
          title: 'The art of being',
          content: "A person who has not been completely alienated",
          userId: '344',
          createdAt: new Date(),
          updatedAt: new Date()
        },
         {
          title: 'Knowledge',
          content: "There is no wealth like knowledge,\
          and no poverty like ignorance. - Buddha",
          userId: '345',
          createdAt: new Date(),
          updatedAt: new Date()
        }]
      );
    
  },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Documents', null, {});
    
  }
};
