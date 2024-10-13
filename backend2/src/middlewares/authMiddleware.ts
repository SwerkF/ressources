import { Request, Response, NextFunction } from 'express';
import { Lucia, TimeSpan } from 'lucia';
import adapter from '../lib/lucia';

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "w")
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.headers['authorization'];
    console.log('sessionId', sessionId);
    console.log('body', req.body);
    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { session, user } = await lucia.validateSession(sessionId.toString());
    if (!session || !user) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    req.session = session;

    next();
}; 