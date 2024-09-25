import { Request, Response } from 'express';
import prisma from '../lib/prisma-client';
import adapter from '../lib/lucia';
import { Lucia, TimeSpan } from "lucia";
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import sharp from 'sharp';
import crypto from 'crypto';
import { userPostSchema } from '../lib/requestSchemas';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import fs from 'fs';
import path from 'path';

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "w")
});

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try  {
        // Validate the request body
        const userForm = req.body;
        const validatedUserForm = await userPostSchema(userForm);

        // Check if the user already exists
        const user = await prisma.user.findUnique({
            where: { email: validatedUserForm.email }
        });

        if (user) {
            return res.status(400).json({ status: 400, error: "L'email est déjà utilisé" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userForm.password, 10);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                email: userForm.email,
                name: userForm.name,
                password: hashedPassword,
                profile: {
                    create: {
                    bio: userForm.bio,
                    avatarType: 'boring',
                    avatarData: {
                        name: userForm.avatar.name,
                        colors: userForm.avatar.colors,
                        variant: userForm.avatar.variant
                    }
                    }
                },
                x: userForm.socials.x,
                instagram: userForm.socials.instagram,
                linkedin: userForm.socials.linkedin,
                github: userForm.socials.github,
            }
        });

        for (const interestName of userForm.interests) {
            const interest = await prisma.interest.findUnique({
                where: { name: interestName }
            });

            if (interest) {
                await prisma.user.update({
                    where: { id: newUser.id },
                    data: {
                        interests: {
                            connect: {
                                id: interest.id
                            }
                        }
                    }
                });
            }
        }

        // create prisma session
        const session = await lucia.createSession(newUser.id.toString(), {});

        // return
        res.status(201).json({ status: 201, message: 'Profile crée!', user: newUser, session });
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    }

};

export const googleLogin = async (req: Request, res: Response) => {
    try {
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
                    bio: '',
                    avatarType: 'upload',
                    avatarData: {
                        url: payload.picture
                    }
                }
            });
        };

        // Crée une session lucia
        const session = await lucia.createSession(user.id.toString(), {});

        res.json({ status: 200, message: 'Connecté!', user, session });
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    };
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { email, isGoogle: false}
        });

        if (!user) {
            return res.status(400).json({ status: 400, error: 'Vérifiez les informations saisies.' });
        }

        // Vérifie le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ status: 400, error: 'Vérifiez les informations saisies.' });
        }

        // Crée une session lucia
        const session = await lucia.createSession(user.id.toString(), {});

        res.status(200).json({ status: 200, message: 'Connecté!', user, session });
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    }
}

// getProfile with JWT

export const getProfile = async (req: Request, res: Response) => {
   try {
        const { user } = req;
        
        // user.id 
        const userProfile = await prisma.user.findUnique({
            select : {
                id: true,
                name: true,
                email: true,
                x: true,
                instagram: true,
                linkedin: true,
                github: true,
                isGoogle: true,
                role: true,
                profile: true,
                createdAt: true,
            },
            where: { id: user.id }
        });

        // get every interest. If user is interested in it, set it to true, else false
        const interests = await prisma.interest.findMany();
        const userInterests = await prisma.user.findUnique({
            select: {
                interests: {
                    select: {
                        id: true
                    }
                }
            },
            where: { id: user.id }
        });

        const userInterestIds = userInterests!.interests.map(interest => interest.id);
        const userInterestsMap = interests.map(interest => {
            return {
                ...interest,
                selected: userInterestIds.includes(interest.id)
            }
        });

        (userProfile as any).interests = userInterestsMap;


        res.json(userProfile);
   } catch (error) {
         res.status(500).json({ status: 500, error: 'Erreur serveur' });
   }
}


//router.put('/me', authenticateJWT, updateProfile);
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { user } = req;
        const { name, email, bio } = req.body;
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

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
            email,
            name,
            profile: {
                update: {
                    bio,
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
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Erreur serveur' });
    }
}