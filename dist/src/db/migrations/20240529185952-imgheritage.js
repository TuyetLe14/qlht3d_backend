'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ImgHeritage', {
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
            url: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('ImgHeritage');
    }
};
//# sourceMappingURL=20240529185952-imgheritage.js.map