import { Request, Response } from 'express';
import prisma from '../prisma/client';
import adapter from '../prisma/lucia';
import { Lucia, TimeSpan } from "lucia";

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "w")
});

export const loginEmailPass = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const session = await lucia.createSession(user.id.toString(), {});

    console.log(session);

    res.json({ session });
}
