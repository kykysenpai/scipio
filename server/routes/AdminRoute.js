import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Permissions from "../config/constants/Permissions";
import Scopes from "../config/constants/Scopes";
import UserController from "../controllers/UserController";

const router = express.Router();

/**
 * All these routes are prefixed by /api/admin
 */

router.route('/create-code')
    .get(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.createCode);


export default router