import express, { json } from 'express';
import cors, { CorsRequest } from 'cors';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error';
import mainRoutes from './routes/main';
import authRoutes from './routes/auth';

const app = express();

// middleware
app.use(json());
app.use(cors<CorsRequest>());

// custom middleware
app.use(authMiddleware);

// routes
app.use(mainRoutes);
app.use(authRoutes);

// error  middleware
app.use(errorHandler);

export default app;
