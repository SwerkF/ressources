import { Request, Response, NextFunction } from 'express';
import lucia from '../lib/lucia-client';
import prisma from '../lib/prisma-client';
import dotenv from 'dotenv';
dotenv.config();


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.headers['authorization'];
    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const session = await lucia.validateSession(sessionId.replace(/"/g, '') as string);

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = session.user;
    
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    req.session

    next();
}; 