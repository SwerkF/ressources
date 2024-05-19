import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();


export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // Vérifie si l'utilisateur existe déjà
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crée un nouvel utilisateur
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  // Vérifie que JWT_SECRET est défini
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Crée un token JWT
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  res.json({ token });
};