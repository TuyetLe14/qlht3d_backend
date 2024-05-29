'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HistoricalEvents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      heritageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Heritages',
          key: 'id',
        },
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createAt: {
        type: Sequelize.DATE,
      },
      updateAt: {
        type: Sequelize.DATE,

      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistoricalEvents');
  }
};

