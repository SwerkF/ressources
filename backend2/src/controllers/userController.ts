import { Request, Response } from "express";
import prisma from "../lib/prisma-client";
import adapter from "../lib/lucia";
import { Lucia, TimeSpan } from "lucia";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import sharp from "sharp";
import crypto from "crypto";
import { userPostSchema } from "../lib/requestSchemas";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import fs from "fs";
import path from "path";
import * as yup from "yup";

const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
});

// router.get('/', getUsers);
export const getUsers = async (req: Request, res: Response) => {};

// router.get('/:id', getUserById);
export const getUserById = async (req: Request, res: Response) => {};

// router.post('/register', createUser);
export const createUser = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    await userPostSchema.validate(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.errors });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      error: "L'utilisateur existe déjà",
      status: 400,
    });
  }

  // compare password and confirm password
  if (user.password !== user.confirmPassword) {
    return res.status(400).json({
      error: "Les mots de passe ne correspondent pas",
      status: 400,
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // create user
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: hashedPassword,
      bio: user.bio,
      avatarType: user.avatarType,
      avatarData: user.avatarData,
      socialMedias: {
        create: user.socialMedias,
      },
    },
  });

  // for each interest, find it and append it to user
  for (const interest of user.interests) {
    const existingInterest = await prisma.interest.findUnique({
      where: {
        name: interest,
      },
    });

    if (existingInterest) {
      await prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          interests: {
            connect: {
              id: existingInterest.id,
            },
          },
        },
      });
    } else {
      const newInterest = await prisma.interest.create({
        data: {
          name: interest,
        },
      });

      await prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          interests: {
            connect: {
              id: newInterest.id,
            },
          },
        },
      });
    }
  }

  res.status(201).json({
    message: "Utilisateur créé avec succès",
    status: 201,
    data: newUser,
  });
};

// router.post('/login', loginUser);
export const loginUser = async (req: Request, res: Response) => {
  const { email, password, loginType, token } = req.body;

  if (loginType === "google") {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({
        error: "Une erreur s'est produite",
        status: 400,
      });
    }

    const email = payload.email;

    if (!email) {
      return res.status(400).json({
        error: "Email non trouvé",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
        status: 404,
      });
    }

    const session = await lucia.createSession(user.id, {});

    res.status(200).json({
      message: "Connexion réussie",
      status: 200,
      data: {
        user,
        session,
      },
    });
  } else if (loginType === "github") {
    // login with github
  } else {
    if (!email || !password) {
      return res.status(400).json({
        error: "Email et mot de passe requis",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
        status: 404,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: "Mot de passe incorrect",
        status: 400,
      });
    }

    const session = await lucia.createSession(user.id, {});

    res.status(200).json({
      message: "Connexion réussie",
      status: 200,
      data: {
        user,
        session,
      },
    });
  }
};

// router.get('/me', authenticateJWT, getProfile);
export const getProfile = async (req: Request, res: Response) => {};

//router.put('/me', authenticateJWT, updateProfile);
export const updateProfile = async (req: Request, res: Response) => {};

const googleAuth = async (req: Request, res: Response) => {
  const { token: idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_OAUTH_CLIENT,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    return res.status(400).json({
      error: "Une erreur s'est produite",
      status: 400,
    });
  }

  const email = payload.email;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "Utilisateur non trouvé",
      status: 404,
    });
  }

  const session = await lucia.createSession(user.id, {});

  res.status(200).json({
    message: "Connexion réussie",
    status: 200,
    data: {
      user,
      session,
    },
  });
};
