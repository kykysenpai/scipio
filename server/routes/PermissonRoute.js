import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import PermissionController from "../controllers/PermissionController";

const router = express.Router();

/**
 * All these routes are prefixed by /api/user
 */

router.route('/')
    .get(PermissionsManager(Scopes.ANY, Permissions.ADMIN), PermissionController.findAll);

export default router