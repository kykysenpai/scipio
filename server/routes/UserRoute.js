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
    .get(UserController.findAll);

router.route('/create-user')
    .post(UserController.createUser);

router.route('/validate-code')
    .post(UserController.validateCode);

router.route('/create-code')
    .get(PermissionsManager(Scopes.ALL, Permissions.ADMIN), UserController.createCode);

router.route('/account-confirmation')
    .get(UserController.confirmAccount);

export default router