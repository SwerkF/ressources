import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body; 

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  const email = payload.email;
  const name = payload.name;
  console.log(payload)

  // Vérifie si l'utilisateur existe
  let user = await prisma.user.findUnique({
    where: { email }
  });

  // Si l'utilisateur n'existe pas, le crée
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        password: '', // Add the required password property
        isGoogle: true
      }
    });
    
    let profile = await prisma.profile.create({
      data: {
        userId: user.id,
        image: payload.picture
      }
    });
  }

  // Vérifie que JWT_SECRET est défini
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Crée un token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  res.json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Vérifie si l'utilisateur existe
  const user = await prisma.user.findUnique({
    where: { email, isGoogle: false}
  });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Vérifie le mot de passe
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  // Vérifie que JWT_SECRET est défini
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Crée un token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  res.json({ token });
}

// getProfile with JWT

export const getProfile = async (req: Request, res: Response) => {
  const { user } = req;
  
  // user.id 
  const userProfile = await prisma.user.findUnique({
    select : {
      email: true,
      name: true,
      id: true,
      isGoogle: true,
      role: true,
      profile: true
    },
    where: { id: user.id }
  });

  res.json(userProfile);
}