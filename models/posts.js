
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  }, {});
  posts.associate = (models) => {
    posts.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
  };
  return posts;
};
