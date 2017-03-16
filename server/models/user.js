'use strict';
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    username: { 
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });

        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents',
        });
      }
    }
  });
  return User;
};