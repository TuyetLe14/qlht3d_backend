'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Conservations', {
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
            dateCover: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            dateUncover: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            personRespon: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            createAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updateAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Conservations');
    }
};
//# sourceMappingURL=20240529190041-conservation.js.map