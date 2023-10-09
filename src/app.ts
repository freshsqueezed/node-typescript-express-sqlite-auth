import express, { json } from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import mainRoutes from './routes/main';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

// middleware
app.use(json());
app.use(cors());

// custom middleware
app.use(authMiddleware);

// routes
app.use(mainRoutes);
app.use(authRoutes);
app.use(userRoutes);

export default app;
