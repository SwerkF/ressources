import { Request, Response } from 'express';
import prisma from "../prisma/client";
import { count } from 'console';

export const getRessources = async (req: Request, res: Response) => {

    const { take, skip, orderBy, search, category } = req.query;

    let ressources;
    console.log(search);

    ressources = await prisma.ressource.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            url: true,
            createdAt: true,
            categories: {
                select: {
                    name: true,
                },
            },
        },
        take: take ? parseInt(take as string) : undefined,
        skip: skip ? parseInt(skip as string) : undefined,
        orderBy: orderBy ? { [orderBy as string]: 'desc' } : undefined,
        where: {
            title: search ? { contains: search as string } : undefined,
            categories: category ? { some: { name: category as string } } : undefined,
        },
    });

    const totalRessources = await prisma.ressource.count({
        where: {
            categories: category ? { some: { name: category as string } } : undefined,
        },
    });
   
    res.json({data: ressources, count: totalRessources});
};

export const getRessource = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ressource = await prisma.ressource.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            url: true,
            createdAt: true,
            categories: {
                select: {
                    name: true,
                },
            },
            content: {
                select: {
                    type: true,
                    value: true,
                },
            },
        },
    });
    res.json(ressource);
};