import { Request, Response } from "express";
import prisma from "../lib/prisma-client";
import bcrypt from "bcrypt";
import { userPostSchema } from "../lib/requestSchemas";
import { AvatarType } from "@prisma/client";
import lucia from '../lib/lucia-client';

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
  const { email, password, loginType, accessToken } = req.body;

  if (loginType === "google") {
    return await googleLogin(accessToken, res);
  } else if (loginType === "github") {
    return await githubLogin(accessToken, res);
  }

  return res.status(400).json({
    error: "Type de connexion non pris en charge",
    status: 400,
  })
};

const googleLogin = async (accessToken: string, res: Response) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return res.status(400).json({
      error: 'Unable to fetch user info from Google',
      status: response.status,
    });
  }

  const userInfo = await response.json();

  const email = userInfo.email;
  if (!email) {
    return res.status(400).json({
      error: "Email non trouvé",
      status: 400,
    });
  }

  let user = await prisma.user.findUnique({
    where: { email },
    include: { authProviders: true },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        uniqueuser: userInfo.name.toLowerCase(),
        name: userInfo.name,
        password: '',
        avatarType: AvatarType.UPLOAD,
        avatarData: userInfo.picture,
      },
    });

    await prisma.authProvider.create({
      data: {
        userId: user!.id,
        name: "GOOGLE",
      },
    });
  } else if (user.authProviders.length !== 0 && user.authProviders[0].name !== "GOOGLE") {
    return res.status(400).json({
      error: "Email déjà utilisé pour un autre service.",
      status: 400,
    });
  }

  const session = await lucia.createSession(user!.id, {});

  res.status(200).json({
    message: "Connexion réussie",
    status: 200,
    data: { user, session },
  });
};

const githubLogin = async (accessToken: string, res: Response) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: accessToken,
    }),
  });

  if (!response.ok) {
    return res.status(400).json({
      error: 'Unable to fetch access token from GitHub',
      status: response.status,
    });
  }

  const data = await response.json();
  const access_token = data.access_token;

  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  if (!userResponse.ok) {
    return res.status(400).json({
      error: 'Unable to fetch user info from GitHub',
      status: userResponse.status,
    });
  }

  const userInfo = await userResponse.json();

  const emailsResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  if (!emailsResponse.ok) {
    return res.status(400).json({
      error: 'Unable to fetch user emails from GitHub',
      status: emailsResponse.status,
    });
  }

  const emails = await emailsResponse.json();
  const primaryEmail = emails.find((email: any) => email.primary)?.email;

  if (!primaryEmail) {
    return res.status(400).json({
      error: "Primary email not found",
      status: 400,
    });
  }

  const email = primaryEmail;
  if (!email) {
    return res.status(400).json({
      error: "Email non trouvé",
      status: 400,
    });
  }

  let user = await prisma.user.findUnique({
    where: { email },
    include: { authProviders: true },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        uniqueuser: userInfo.name.toLowerCase(),
        name: userInfo.name,
        password: '',
        bio: userInfo.bio,
        avatarType: AvatarType.UPLOAD,
        avatarData: userInfo.avatar_url,
      },
    });

    await prisma.authProvider.create({
      data: {
        userId: user?.id,
        name: "GITHUB",
      },
    });
  } else if (user.authProviders.length !== 0 && user.authProviders[0].name !== "GITHUB") {
    return res.status(400).json({
      error: "Email déjà utilisé pour un autre service.",
      status: 400,
    });
  }

  const session = await lucia.createSession(user!.id, {});


  res.status(200).json({
    message: "Connexion réussie",
    status: 200,
    data: { user, session },
  });
};

/**
 * Removed temporarily
 */

/*
const classicLogin = async (email: string, password: string, res: Response) => {
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
};
*/

// router.get('/me', authenticateJWT, getProfile);
export const getProfile = async (req: Request, res: Response) => {
  const user = req.user;

  const completeUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      socialMedias: true,
      interests: true,
    },
  });

  res.status(200).json({
    message: "Profil récupéré avec succès",
    status: 200,
    data: completeUser,
  });
};


//router.put('/me', authenticateJWT, updateProfile);
export const updateProfile = async (req: Request, res: Response) => {};
