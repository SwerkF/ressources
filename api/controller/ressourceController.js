const Ressource = require('../models/ressource');
const Categorie = require('../models/categorie');
require('dotenv').config();

exports.getListRessources = async (req, res, next) => {
    try {
        const ressources = await Ressource.findAll({
            include: [{
                model: Categorie,
                attributes: ['nom'],
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(ressources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}