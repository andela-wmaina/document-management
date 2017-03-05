'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users',
        });
      }
    }
  });
  return Role;
};