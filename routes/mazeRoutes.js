import express from 'express';
import { check, validationResult } from 'express-validator';
import { BuildCustomMaze } from '../lib/maze/node.js';

const router = express.Router();

// Define the /generate-maze route with input validation and sanitization
router.post(
    '/generate-maze',
    [
        // Validation and sanitization middlewares
        check('width')
            .isInt({ min: 10, max: 200 }).withMessage('Width must be an integer between 10 and 200')
            .toInt(), // Convert to integer
        check('height')
            .isInt({ min: 10, max: 200 }).withMessage('Height must be an integer between 10 and 200')
            .toInt(), // Convert to integer
        check('seed')
            .isInt().withMessage('seed should be an integer')
            .toInt(), // Convert to integer
        check('algo')
            .optional()
            .isIn(['recursiveBacktrack', 'randomizedPrim', 'binaryTree']).withMessage('Invalid algorithm specified'),
        check('type')
            .optional()
            .isIn(['json', 'svg']).withMessage('Type must be either "json" or "svg"'),
    ],
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        try {
            // Extract and sanitize inputs after validation
            const width = req.body.width || 10;
            const height = req.body.height || 10;
            const seed = req.body.seed || '';
            const algo = req.body.algo || 'recursiveBacktrack';
            const type = req.body.type || 'json';

            // Call BuildCustomMaze with validated and sanitized inputs
            const svgString = BuildCustomMaze(width, height, algo, seed);

            if (type.toLowerCase() === 'svg') {
                res.setHeader('Content-Type', 'image/svg+xml');
                res.send(svgString);
                return;
            }

            // Standard response format
            const response = {
                status: 'success',
                data: {
                    width: width,
                    height: height,
                    algo: algo,
                    seed: seed,
                    content: svgString,
                }
            };

            res.json(response);
            console.log("maze generated");
        } catch (error) {
            console.error("Error generating maze:", error);
            next({
                statusCode: 500,
                message: 'An unknown error occurred while generating the maze.',
                details: error.message
            });
        }
    }
);

export default router;