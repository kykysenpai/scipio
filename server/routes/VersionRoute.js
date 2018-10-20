import express from "express";
import VersionController from '../controllers/VersionController';

const router = express.Router();

/**
 * All these routes are prefixed by /api/version
 */

router.route('/')
    .get(VersionController.fetch);

export default router