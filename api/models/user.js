const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('user', {
    iduser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
});

module.exports = User;