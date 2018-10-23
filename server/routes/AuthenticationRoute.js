import express from "express";
import AuthController from "../controllers/AuthController";
import Keycloak from "../modules/Keycloak";

const router = express.Router();

/**
 * All these routes are prefixed by /api/auth
 */

/**
 * Post request to try and get a valid session back if credentials are valids
 */
router.route('/')
    .post(Keycloak.protect(), AuthController.authenticate);

router.route('/check')
    .post(AuthController.checkAuthenticated);

/**
 * Delete request to destroy cookie from session
 */
router.route('/')
    .delete(AuthController.deleteSession);

export default router