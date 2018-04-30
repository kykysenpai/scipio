import express from "express";
import UserController from "../controllers/UserController";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";

const router = express.Router();

/**
 * All these routes are prefixed by /api/user
 */

router.route('/')
    .get(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.findAll);

router.route('/create-user')
    .post(UserController.createUser);

router.route('/validate-code')
    .post(UserController.validateCode);

router.route('/account-confirmation')
    .get(UserController.confirmAccount);

router.route('/permission')
    .post(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.addPermission)
    .delete(PermissionsManager(Scopes.ANY, Permissions.ADMIN), UserController.removePermission);

export default router