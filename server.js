/* Copyright (c) 2021-2024 by Inoland */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import corsOptions from './config/corsConfig.js';
import limiter from './config/ratelimiterConfig.js';

import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';
import authMiddleware from './middlewares/authMiddleware.js';

import versionRoutes from './routes/versionRoutes.js';
import mazeRoutes from './routes/mazeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());

app.use(cors(corsOptions));

app.use(limiter);

app.use(express.json());

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send('API server is running!');
});

app.use('/', versionRoutes);
app.use('/', mazeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});