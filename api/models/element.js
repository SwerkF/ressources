const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const Ressource = require('./ressource');

const Element = sequelize.define('element', {
    idelement: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Element.belongsTo(Ressource, { foreignKey: 'idressource' });
Ressource.hasMany(Element, { foreignKey: 'idressource' });

module.exports = Element;
