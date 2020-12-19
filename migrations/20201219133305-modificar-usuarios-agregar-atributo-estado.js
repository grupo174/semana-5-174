"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn("Usuarios", "estado", {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Usuarios", "estado");
    },
};
