module.exports = (Sequelize, DataTypes) => {
  const Document = Sequelize.define('Document', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    access: {
      type: DataTypes.STRING,
      required: true,
      default: 'private',
      enum: ['private', 'public']
    }
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
