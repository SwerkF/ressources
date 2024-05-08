const sequelize = require('../db/db');
const Categorie = require('../models/categorie');
const Ressource = require('../models/ressource');
const SubCategorie = require('../models/subcategorie');

exports.createDatabase = (req, res, next) => {
    sequelize.sync({ force: true })
        .then(() => {
            res.status(200).json({ message: 'Database created' });
        })
        .catch(error => {
            res.status(400).json({ error: error });
        });
}

exports.initDatabase = (req, res, next) => {
    Categorie.bulkCreate([
        { nom: 'Outils' },
        { nom: 'Back End' },
        { nom: 'Front End' },
        { nom: 'API' },
        { nom: 'Intelligence Artificielle' },
        { nom: 'Framework' },
        { nom: 'Base de données' },
    ]) 
    .then(() => {
        SubCategorie.bulkCreate([
            { nom: 'Sites Web', idcategorie: 1 },
            { nom: 'Vidéos', idcategorie: 1 },
            { nom: 'Extensions', idcategorie: 1 },
            { nom: 'Logiciels', idcategorie: 1 },
            { nom: 'Frameworks', idcategorie: 2 },
            { nom: 'Hébergement', idcategorie: 2 },
            { nom: 'Langages', idcategorie: 2 },
            { nom: 'Bibliothèques', idcategorie: 2 },
            { nom: 'CMS', idcategorie: 2 },
            { nom: 'Frameworks', idcategorie: 3 },
            { nom: 'Bibliothèques', idcategorie: 3 },
            { nom: 'Free', idcategorie: 3 },
            { nom: 'Payant', idcategorie: 3 },
            { nom: 'Machine Learning', idcategorie: 5 },
            { nom: 'Deep Learning', idcategorie: 5 },
            { nom: 'Reinforcement Learning', idcategorie: 5 },
            { nom: 'Front End', idcategorie: 6 },
            { nom: 'Back End', idcategorie: 6 },
            { nom: 'Full Stack', idcategorie: 6 },
            { nom: 'SQL', idcategorie: 7 },
            { nom: 'Hébergement', idcategorie: 7 },
        ])
        .then(() => {
           // ressource belongsToMany subcategorie through ressource_subcategorie
              Ressource.bulkCreate([
                { titre: 'React', description: 'React est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateurs.', url: 'https://reactjs.org/', idcategorie: 3, subcategories: [11, 12, 13] },
                { titre: 'Angular', description: 'Angular est un framework open-source développé par Google.', url: 'https://angular.io/', idcategorie: 3, subcategories: [11, 12, 13] },
                { titre: 'Vue.js', description: 'Vue.js est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web.', url: 'https://vuejs.org/', idcategorie: 3, subcategories: [11, 12, 13] },
                { titre: 'Node.js', description: 'Node.js est un environnement d\'exécution JavaScript côté serveur.', url: 'https://nodejs.org/', idcategorie: 2, subcategories: [5, 6, 7, 8, 9] },
                { titre: 'Python', description: 'Python est un langage de programmation interprété, multi-paradigme et multiplateformes.', url: 'https://www.python.org/', idcategorie: 2, subcategories: [5, 6, 7, 8, 9] },
                { titre: 'Java', description: 'Java est un langage de programmation orienté objet.', url: 'https://www.java.com/', idcategorie: 2, subcategories: [5, 6, 7, 8, 9] },
                { titre: 'C++', description: 'C++ est un langage de programmation compilé permettant la programmation sous plusieurs paradigmes.', url: 'http://www.cplusplus.com/', idcategorie: 2, subcategories: [5, 6, 7, 8, 9] },
                { titre: 'TensorFlow', description: 'TensorFlow est une bibliothèque logicielle open-source de Google destinée au calcul numérique.', url: 'https://www.tensorflow.org/', idcategorie: 5, subcategories: [14, 15, 16] },
              ])
              
        })


    })

    .then(() => {
        res.status(200).json({ message: 'Database initialized' });
    })
        
}