const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const Ressource = require('./ressource');

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

Categorie.belongsToMany(Ressource, { through: 'ressource_categorie' });
Ressource.belongsToMany(Categorie, { through: 'ressource_categorie' });

module.exports = Categorie;