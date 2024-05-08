const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const SubCategories = require('./subcategorie');

const Categorie = sequelize.define('categorie', {
    idcategorie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Categorie.hasMany(SubCategories, { foreignKey: 'idcategorie' });
SubCategories.belongsTo(Categorie, { foreignKey: 'idcategorie' });


module.exports = Categorie;