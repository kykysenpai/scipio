import express from 'express';
import apiController from '../controllers/api.controller';
import authController from '../controllers/auth.controller';
import validator from '../modules/PermissionsManager';
import permissions from '../config/Permissions';

const router = express.Router();

/**
 * All these routes are prefixed by /api
 */

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(validator.requireAll(permissions.ADMIN),apiController.get);

/**
 * Post request to try and get a valid session back if credentials are valids
 */
router.route('/auth')
    .post(authController.post);

/**
 * Delete request to destroy cookie from session
 */
router.route('/auth')
    .delete(authController.deleteSession);

export default router;