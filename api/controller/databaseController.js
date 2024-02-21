const sequelize = require('../db/db');
const Categorie = require('../models/categorie');
const Ressource = require('../models/ressource');

exports.createDatabase = (req, res, next) => {
    sequelize.sync({ force: true })
        .then(() => {
            res.status(200).json({ message: 'Database created' });
        })
        .catch(error => {
            res.status(400).json({ error: error });
        });
}