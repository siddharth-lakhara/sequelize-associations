
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users_groups', {
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
    groupId: {
      type: Sequelize.INTEGER,
      references: { model: 'groups', key: 'id' },
      onDelete: 'CASCADE',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users_groups'),
};
