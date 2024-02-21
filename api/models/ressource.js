const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const Ressource = sequelize.define('ressource', {
    idcategorie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    short_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
});

module.exports = Ressource;