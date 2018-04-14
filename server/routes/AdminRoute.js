import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Permissions from "../config/constants/Permissions";
import Scopes from "../config/constants/Scopes";
import UserController from "../controllers/UserController";
import Permission from "../models/Permission";

const router = express.Router();

/**
 * All these routes are prefixed by /api/admin
 */

router.route('/create-code')
    .post(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.createCode);

router.route('/deactivate-user')
    .post(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.deactivateUser);

router.route('/resend-mail')
    .post(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.resendMail);

export default router