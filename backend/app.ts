import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';
import ressourceRoutes from './src/routes/ressourceRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import contentRoutes from './src/routes/contentRoutes';
import { Interest } from '@prisma/client';
import prisma from './src/lib/prisma-client';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use('/api/users', userRoutes);
app.use('/api/ressources', ressourceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/images', express.static('src/images'));

app.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;