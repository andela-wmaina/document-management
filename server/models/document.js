module.exports = (Sequelize, DataTypes) => {
  const Document = Sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    content: {
      type: DataTypes.STRING,
      required: true
    },
    access: {
      type: DataTypes.STRING,
      required: true,
      default: 'false',
      enum: ['true', 'false']
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
