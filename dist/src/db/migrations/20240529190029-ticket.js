'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tickets', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            heritageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Heritages',
                    key: 'id'
                }
            },
            typeTicket: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            timeStart: {
                type: Sequelize.DATE,
                allowNull: false
            },
            timeEnd: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tickets');
    }
};
//# sourceMappingURL=20240529190029-ticket.js.map