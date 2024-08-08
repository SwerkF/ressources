import { Request, Response } from 'express';
import prisma from '../lib/prisma-client';
import adapter from '../lib/lucia';
import { Lucia, TimeSpan } from "lucia";
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "w")
});

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: id }
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

    // Crée une session lucia
    const session = await lucia.createSession(newUser.id.toString(), {});

    res.json({ user: newUser, session });
};

export const googleLogin = async (req: Request, res: Response) => {
    const { tokenId } = req.body; 

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload()!;
    const email = payload.email!;
    const name = payload.name!;
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
    };

    // Crée une session lucia
    const session = await lucia.createSession(user.id.toString(), {});

    res.json({ user, session });
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

    // Crée une session lucia
    const session = await lucia.createSession(user.id.toString(), {});

    res.json({ user, session });
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


//router.put('/me', authenticateJWT, upload.single('image'), updateProfile);
export const updateProfile = async (req: Request, res: Response) => {
    const { user } = req;
    const { name, email, bio } = req.body;
    const image = req.file;
    // get user with profile
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

    if(!userProfile) return res.status(404).json({ error: 'User not found' });

    // delete old image.
    if (image && userProfile.profile && userProfile.profile.image) {
        // check if image is not google image,
        const googleImage = userProfile.profile.image.includes('googleusercontent');
        if (!googleImage) {
        const fs = require('fs');
        const path = require('path');
        const oldPath = path.join(__dirname, '..', '..', 'src/images', userProfile.profile.image.split('/').pop());
        fs.unlinkSync(oldPath);
        }
    }

    // rename image uploaded to the new name to user.id + extension
    if (image) {
        const fs = require('fs');
        const path = require('path');
        const ext = image.mimetype.split('/')[1];
        const oldPath = path.join(__dirname, '..', '..', 'src/images', image.filename);
        const newPath = path.join(__dirname, '..', '..', 'src/images', `${user.id}.${ext}`);
        fs.renameSync(oldPath, newPath);
        image.filename = `${user.id}.${ext}`;
    }

    // update user, imageLink is http://localhost:3000/api/images/ + image.filename
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
        email,
        name,
        profile: {
            update: {
            bio,
            image: image ? `http://localhost:3000/api/images/${image.filename}` : userProfile.profile && userProfile.profile.image ? userProfile.profile.image : null
            }
        }
        }
    });

    const returnUser = await prisma.user.findUnique({
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

    res.json(returnUser);
  
}