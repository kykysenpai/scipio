import express from 'express';
import apiController from '../controllers/api.controller';
import authController from '../controllers/auth.controller';
import validator from '../modules/PermissionsManager';
import permissions from '../config/Permissions';
import viewsController from '../controllers/views.controller';

const router = express.Router();

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/index')
    .get(viewsController.index);

export default router;