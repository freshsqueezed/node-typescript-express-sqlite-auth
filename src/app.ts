import express, { json } from 'express';
import cors, { CorsRequest } from 'cors';
import { authMiddleware } from './middleware/auth';
import mainRoutes from './routes/main';
import authRoutes from './routes/auth';

const app = express();

// middleware
app.use(json());
app.use(cors());

// custom middleware
app.use(authMiddleware);

// routes
app.use(mainRoutes);
app.use(authRoutes);

export default app;
