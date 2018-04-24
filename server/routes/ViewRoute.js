import express from "express";
import ViewController from "../controllers/ViewController";
import Scopes from "../config/constants/Scopes";
import PermissionsManager from "../modules/PermissionsManager";
import Permissions from "../config/constants/Permissions";

const router = express.Router();

/**
 * All these routes are prefixed by /views
 */

router.route('/success/webrtc')
    .get(PermissionsManager(Scopes.ALL, Permissions.WEB_RTC));

router.route('/success/spotify')
    .get(PermissionsManager(Scopes.ALL, Permissions.SPOTIFY));

router.route('/success/admin')
    .get(PermissionsManager(Scopes.ALL, Permissions.ADMIN));

router.route('/success/:viewName')
    .get(ViewController.getView);

router.route('/errors/:errorNumber')
    .get(ViewController.getError);

export default router