const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Token is not valid' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token is not provided' });
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.decoded.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'You are not allowed to access this resource' });
    } 
}