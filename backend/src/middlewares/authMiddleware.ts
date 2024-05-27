import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    

    jwt.verify(token.split(' ')[1], secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
