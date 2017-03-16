module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [
        { name: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Users', createdAt: new Date(), updatedAt: new Date() }
    ]),
  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};

