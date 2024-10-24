import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_TIME * 60 * 1000, // 15 minutes window
    max: process.env.RATE_LIMIT_MAX, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    headers: true, // Include rate limit info in the response headers
});

export default limiter;