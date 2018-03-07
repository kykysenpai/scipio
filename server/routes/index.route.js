import express from 'express';
import indexController from '../controllers/index.controller';

const router = express.Router();

/**
 * Get on root url, should be an HTML accepting request
 */
router.route('/')
    .get(indexController.index)

module.exports = router;