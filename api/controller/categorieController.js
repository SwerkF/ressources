const Categorie = require('../models/categorie');
require('dotenv').config();

exports.getListCategories = async (req, res, next) => {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
