
module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
    userId: DataTypes.INTEGER,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT,
  }, {});
  userDetails.associate = function (models) {
    // Example of belongsTo association
    // This is commented because we don't need this
    // userDetails.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
  };
  return userDetails;
};
