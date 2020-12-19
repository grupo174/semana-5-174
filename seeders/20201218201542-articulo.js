"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Articulos",
            [
                {
                    codigo: "1111",
                    nombre: "The Mystique of Pather Panchali",
                    descripcion: "A biographical documentary film about the legendary filmmaker Satyajit Ray.",
                    estado: 1,
                    categoriaId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    codigo: "1001",
                    nombre: "First Person Plural: EI & Beyond Podcast with Daniel Goleman",
                    descripcion:
                        "A podcast about us, the systems we’re a part of, and how we create an emotionally intelligent future.",
                    estado: 1,
                    categoriaId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    codigo: "2001",
                    nombre: "Arcadia: The Awaken",
                    descripcion:
                        "Everything that exists and that doesn't, can only be found in one place, and that place is beyond the magical barriers of Erevorht.",
                    estado: 1,
                    categoriaId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    codigo: "3331",
                    nombre: "The Bare Caribbean Beauty",
                    descripcion: "Hello , we are creating a nude photography virtual book about beauty of caribbean,",
                    estado: 1,
                    categoriaId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    codigo: "48001",
                    nombre: "Help Officially Launch Danny's Nut Butter",
                    descripcion:
                        "Our mission is simple. Provide a healthy, delicious and locally made Nut Butter while staying true to our New York Roots.",
                    estado: 1,
                    categoriaId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Articulos", null, {});
    },
};
