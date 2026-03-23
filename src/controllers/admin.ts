import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const loginAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const admin = await prisma.admin.findUnique({ where: { username } });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET!, { expiresIn: '12h' });

        return res.json({
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                phone: admin.phone
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to login' });
    }
};

export const getAdmins = async (req: Request, res: Response) => {
    try {
        const data = await prisma.admin.findMany({
            select: {
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await prisma.admin.findUnique({
            where: { id: Number(id) },
            select: {
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
            }
        });
        if (!data) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin' });
    }
};

export const createAdmin = async (req: Request, res: Response) => {
    const { username, password, firstName, lastName, email, phone } = req.body;
    if (!username || !password || !firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existingAdmin = await prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const data = await prisma.admin.create({ data: {
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            phone
        }});
        
        res.status(201).json('Admin created successfully');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
};