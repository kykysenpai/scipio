import express from 'express';
import apiController from '../controllers/api.controller';
import authController from '../controllers/auth.controller';
import validator from '../modules/PermissionsManager';
import permissions from '../config/Permissions';
import viewsController from '../controllers/views.controller';
import scopes from "../config/Scopes";

const router = express.Router();

/**
 * All these routes are prefixed by /views
 */

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/index')
    .get(viewsController.index);

/**
 * Get profile infos in JSON format
 */
router.route('/profile')
    .get(validator.requires(scopes.ALL, permissions.USER), viewsController.profile);

export default router;