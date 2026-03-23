import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!JWT_SECRET) {
        return res.status(500).json({ error: 'JWT secret is not configured.' });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string };        
        req.admin = decoded; 
    
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};