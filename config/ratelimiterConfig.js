import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    headers: true, // Include rate limit info in the response headers
});

export default limiter;