import express from 'express';
import apiController from '../controllers/api.controller';

const router = express.Router();

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(apiController.get)

export default router;