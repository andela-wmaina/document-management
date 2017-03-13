'use strict';
module.exports = (Sequelize, DataTypes) => {
  const Document = Sequelize.define('Document', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Document;
};