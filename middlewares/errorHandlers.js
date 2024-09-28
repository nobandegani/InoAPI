// middlewares/errorHandlers.js

// 404 Not Found Middleware
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
};

// Global Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
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
};
