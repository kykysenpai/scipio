import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();

/**
 * All these routes are prefixed by /api/auth
 */

/**
 * Post request to try and get a valid session back if credentials are valids
 */
router.route('/')
    .post(AuthController.authenticate);

/**
 * Delete request to destroy cookie from session
 */
router.route('/')
    .delete(AuthController.deleteSession);

export default router