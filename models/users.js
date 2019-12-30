
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});
  users.associate = function (models) {
    users.hasOne(models.userDetails, { foreignKey: 'userId', as: 'userDetails', onDelete: 'CASCADE' });
  };
  return users;
};
