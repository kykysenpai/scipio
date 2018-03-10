import express from 'express';
import apiController from '../controllers/api.controller';
import validator from '../modules/PermissionsManager';
import permissions from '../config/Permissions';

const router = express.Router();

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(validator.requireAny(permissions.USER),apiController.get);

export default router;