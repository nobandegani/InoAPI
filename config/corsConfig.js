import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
    origin: [process.env.SITE_ENDPOINT, 'http://127.0.0.1'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-api-secret'],
    credentials: true, // Enable sending cookies or credentials with requests
};

export default corsOptions;