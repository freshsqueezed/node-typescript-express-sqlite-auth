import express from 'express';
import cors, { CorsRequest } from 'cors';
import { authMiddleware } from './middleware/auth';

const app = express();

app.use(express.json());
app.use(cors<CorsRequest>());
app.use(authMiddleware);

export default app;
