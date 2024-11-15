import 'reflect-metadata'; // Necesario para TypeORM y class-transformer
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection successfully');
  })
  .catch((error) => console.log('Error connecting to database', error));

app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
