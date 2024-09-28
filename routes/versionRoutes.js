// routes/versionRoutes.js

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Define the /get-game-version route
router.post('/get-game-version', (req, res) => {
    const gameVersion = process.env.GAME_VERSION;

    // Respond with the game version from the .env file
    return res.status(200).json({
        status: 'success',
        gameVersion: gameVersion
    });
});

export default router;
