import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import ApiController from "../controllers/ApiController";
import AuthenticationRoute from "./AuthenticationRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import PermissionRoute from "./PermissonRoute";
import GameServerRoute from "./GameServerRoute";

const router = express.Router();

/**
 * All these routes are prefixed by /api
 */

/**
 * Get on root of api, returns api informations in JSON format
 */
router.route('/')
    .get(PermissionsManager(Scopes.ALL, Permissions.ADMIN), ApiController.get);

router.use('/auth', AuthenticationRoute);

router.use('/user', UserRoute);

router.use('/admin', AdminRoute);

router.use('/permission', PermissionRoute);

router.use('/game_server', GameServerRoute);

export default router