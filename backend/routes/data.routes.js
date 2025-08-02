import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getSensorData, getTradeData } from '../controllers/data.controller.js';

const router = express.Router();

// This route is protected, only logged-in users can access it
router.get("/sensors", protectRoute, getSensorData);
router.get("/trade", protectRoute, getTradeData);

export default router;