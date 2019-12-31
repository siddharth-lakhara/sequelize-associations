
module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
    userId: DataTypes.INTEGER,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT,
  }, {});
  // Example of belongsTo association
  // This is commented because we don't need this
  // userDetails.associate = (models) => {
    // userDetails.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
  // };
  return userDetails;
};
