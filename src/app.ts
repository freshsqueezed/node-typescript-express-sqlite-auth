import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authMiddleware from './middleware/auth';
import mainRoutes from './routes/main';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
  }),
);
app.use(json());
app.use(cookieParser());

// custom middleware
app.use(authMiddleware);

// routes
app.use(authRoutes);
app.use(mainRoutes);
app.use(userRoutes);

export default app;
