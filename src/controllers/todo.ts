import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const data = await prisma.todo.findMany();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const id = req.admin?.id;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    if (!id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const data = await prisma.todo.create({ data: {
            title,
            description,
            status: 'pending',
            authorId: id,
            author: [
                {
                    id: id,
                    firstName: req.admin?.firstName,
                    lastName: req.admin?.lastName,
                    email: req.admin?.email,
                    phone: req.admin?.phone
                }
            ]
        }});
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const data = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, description, status }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.todo.delete({ where: { id: Number(id) } });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};