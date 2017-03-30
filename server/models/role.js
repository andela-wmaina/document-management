module.exports = (Sequelize, DataTypes) => {
  const Role = Sequelize.define('Role', {
      name: {
      type: DataTypes.STRING,
      required: true
    },
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
