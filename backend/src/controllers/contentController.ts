import { Request, Response } from 'express';
import prisma from "../prisma/client";

export const getRessourceContent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const content = await prisma.content.findMany({
        where: {
            ressourceId: parseInt(id),
        },
    });
    res.json(content);
}