
module.exports = (sequelize, DataTypes) => {
  const users_groups = sequelize.define('users_groups', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
  }, {});
  users_groups.associate = (models) => {
    users_groups.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
    users_groups.belongsTo(models.groups, { foreignKey: 'groupId', as: 'group' });
  };
  return users_groups;
};
