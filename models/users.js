
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});
  users.associate = (models) => {
    users.hasOne(models.userDetails, { foreignKey: 'userId', as: 'userDetails' });
    users.hasMany(models.posts, { foreignKey: 'userId', as: 'posts' });
  };
  return users;
};
