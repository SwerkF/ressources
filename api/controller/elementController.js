const Element = require('../models/element');
const Ressource = require('../models/ressource');
require('dotenv').config();

exports.getElementsRessources = async (req, res, next) => {
    try {
        const elements = await Element.findAll({
            include: [{
                model: Ressource,
                attributes: ['nom'],
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(elements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getElementsRessourcesById = async (req, res, next) => {
    try {
        const elements = await Element.findAll({
            include: [{
                model: Ressource,
                attributes: ['nom'],
                through: {
                    attributes: []
                }
            }],
            where: { idressource: req.params.id }
        });
        res.status(200).json(elements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createElement = async (req, res, next) => {
    try {
        const element = await Element.create({
            type: req.body.type,
            content: req.body.content
        });
        res.status(201).json(element);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateElement = async (req, res, next) => {
    try {
        const element = await Element.update({
            type: req.body.type,
            content: req.body.content
        }, {
            where: { idelement: req.params.id }
        });
        res.status(200).json({ message: 'Element updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteElement = async (req, res, next) => {
    try {
        const element = await Element.destroy({
            where: { idelement: req.params.id }
        });
        res.status(200).json({ message: 'Element deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
