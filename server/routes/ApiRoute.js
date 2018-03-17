import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import ApiController from "../controllers/ApiController";
import AuthController from "../controllers/AuthController";

const router = express.Router();

/**
 * All these routes are prefixed by /api
 */

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(PermissionsManager(Scopes.ALL, Permissions.ADMIN), ApiController.get);

/**
 * Post request to try and get a valid session back if credentials are valids
 */
router.route('/auth')
    .post(AuthController.authenticate);

/**
 * Delete request to destroy cookie from session
 */
router.route('/auth')
    .delete(AuthController.deleteSession);


export default router