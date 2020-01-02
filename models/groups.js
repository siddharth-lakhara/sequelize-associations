
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    groupName: DataTypes.STRING,
  }, {});
  groups.associate = (models) => {
    groups.belongsToMany(models.users, { foreignKey: 'groupId', through: 'users_groups', as: 'users' });
  };
  return groups;
};
