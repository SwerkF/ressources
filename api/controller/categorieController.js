const Categorie = require('../models/categorie');
const SubCategories = require('../models/subcategorie');
require('dotenv').config();

exports.getListCategories = async (req, res, next) => {
    try {
        const categories = await Categorie.findAll(
            {
                include: [{
                    model: SubCategories,
                    required: false
                }]
            }
        );
        res.status(200).json(categories);
    } catch (error) {
        console.log('error: ', error.message)
        res.status(500).json({ message: error.message });
    }
}
