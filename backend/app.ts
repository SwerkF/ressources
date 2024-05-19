import express from 'express';
import userRoutes from './src/routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;