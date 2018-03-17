import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import ApiController from "../controllers/ApiController";
import AuthController from "../controllers/AuthController";
import AuthenticationRoute from "./AuthenticationRoute";
import UserRoute from "./UserRoute";

const router = express.Router();

/**
 * All these routes are prefixed by /api
 */

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(PermissionsManager(Scopes.ALL, true, Permissions.ADMIN), ApiController.get);

router.use('/auth', AuthenticationRoute);

router.use('/user', UserRoute);

export default router