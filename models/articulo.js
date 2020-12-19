"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Articulo extends Model {
        static associate(models) {
            this.belongsTo(models.Categoria, 
                {
                    foreignKey: 'categoriaId',
                    as: 'categoria'
                });
        }
    }
    Articulo.init(
        {
            codigo: DataTypes.STRING,
            nombre: DataTypes.STRING,
            descripcion: DataTypes.STRING,
            estado: DataTypes.INTEGER,
            categoriaId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Articulo",
        }
    );
    return Articulo;
};
