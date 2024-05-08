const Ressource = require('../models/ressource');
const SubCategorie = require('../models/subcategorie');
const Categorie = require('../models/categorie');
require('dotenv').config();

exports.getListRessources = async (req, res, next) => {
    try {
        const ressources = await Ressource.findAll();
        res.status(200).json(ressources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRessourceByCategory = async (req, res, next) => {
    try {
        const ressources = await Ressource.findAll({
            include: [{
                model: SubCategorie,
                include: [{
                    model: Categorie,
                    where: { idcategorie: req.params.id }
                }]
            }]
        });
        res.status(200).json(ressources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRessourceBySubCategory = async (req, res, next) => {
    try {
        const ressources = await Ressource.findAll({
            include: [{
                model: SubCategorie,
                where: { idsubcategorie: req.params.id }
            }]
        });
        res.status(200).json(ressources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}