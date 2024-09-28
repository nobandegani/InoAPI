/* Copyright (c) 2021-2024 by Inoland */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import mazeRoutes from './routes/mazeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());

const corsOptions = {
    origin: ['https://apiv2.inoland.net', 'http://127.0.0.1'], // Allow all origins for now, but you can restrict it to specific domains like 'http://yourdomain.com'
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-api-secret'], // Allow these headers
    credentials: true, // Enable sending cookies or credentials with requests
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    headers: true, // Include rate limit info in the response headers
});
app.use(limiter);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API server is running!');
});

app.use('/', mazeRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`); // Log the error for debugging

    // Construct a standardized error response
    const errorResponse = {
        status: err.status || 'error',
        message: err.message || 'Something went wrong!',
        errors: err.errors || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}, // Show stack trace only in development
    };

    // Send the error response
    res.status(err.statusCode || 500).json(errorResponse);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});