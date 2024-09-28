// authMiddleware.js

import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];

    if (apiKey === process.env.API_KEY && apiSecret === process.env.API_SECRET) {
        // API key and secret are valid, proceed to the next middleware or route handler
        return next();
    }

    // If API key or secret is missing or incorrect, return a 401 Unauthorized error
    return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized: Invalid API key or secret',
    });
};

export default authMiddleware;