module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Documents', [
      {
        title: 'The art of being',
        content: 'A person who has not been completely alienated',
        access: 'public',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Knowledge',
        content: 'There is no wealth like knowledge, and no poverty like ignorance. - Buddha',
        access: 'public',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Song List',
        content: "I'm Yours - Jason Marz, The Man Who Can't Be Moved - The Script, Too Lost In You - Sugababes",
        access: 'private',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('Documents', null, {})
};
