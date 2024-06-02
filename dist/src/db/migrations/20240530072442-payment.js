'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Payments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id'
                }
            },
            pMethod: {
                type: Sequelize.STRING,
                allowNull: false
            },
            total: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Payments');
    }
};
//# sourceMappingURL=20240530072442-payment.js.map