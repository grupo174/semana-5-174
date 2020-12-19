"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Categoria", [
            {
                nombre: "Categoria_test",
                descripcion: "lorem limsus test",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nombre: "Donaciones",
                descripcion: "Quienes hacen aportaciones monetarias no esperan beneficios de la transacción.",
                estado: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nombre: "Recompensas",
                descripcion: "Quienes hacen aportaciones monetarias esperan una recompensa a cambio de su contribución.",
                estado: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nombre: "Acciones",
                descripcion: "Se invierte en masa en una empresa y se recibe acciones o participaciones de la misma.",
                estado: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },            
            {
                nombre: "Préstamos",
                descripcion: "Se financia en masa (con préstamos o créditos) a una empresa a cambio de un tipo de interés.",
                estado: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categoria', null, {});
    },
};
