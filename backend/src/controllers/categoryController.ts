import { Request, Response } from 'express';
import prisma from '../lib/prisma-client';

export const getCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
}

