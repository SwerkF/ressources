const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const Ressource = require('./ressource');
const Categorie = require('./categorie');

const SubCategorie = sequelize.define('subcategorie', {
    idsubcategorie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

SubCategorie.belongsToMany(Ressource, { through: 'ressource_subcategorie' });
Ressource.belongsToMany(SubCategorie, { through: 'ressource_subcategorie' });

module.exports = SubCategorie;