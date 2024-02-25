const data = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 20);
        const user = await User.create({
            email: req.body.email,
            password: hash
        });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        res.status(200).json({
            userId: user.id,
            token: jwt.sign(
                { userId: user.id },
                process.env.TOKEN,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.update({
            email: req.body.email
        }, {
            where: { id: req.params.id }
        });
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}