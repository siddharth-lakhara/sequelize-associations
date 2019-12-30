
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    mobileNum: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userDetails'),
};
