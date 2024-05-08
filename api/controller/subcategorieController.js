const sequelize = require('../db/db');
const SubCategorie = require('../models/subcategorie');

exports.getListSubcategories = (req, res, next) => {
    SubCategorie.findAll()
        .then(subcategories => {
            res.status(200).json(subcategories);
        })
        .catch(error => {
            res.status(400).json({ error: error });
        });
}