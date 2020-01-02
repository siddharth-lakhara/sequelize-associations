
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});
  users.associate = (models) => {
    users.hasOne(models.userDetails, { foreignKey: 'userId', as: 'userDetails' });
    users.hasMany(models.posts, { foreignKey: 'userId', as: 'posts' });
    users.belongsToMany(models.groups, { foreignKey: 'userId', through: 'users_groups', as: 'groups' });
  };
  return users;
};
