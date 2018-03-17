import express from "express";
import ViewsController from "../controllers/ViewsController";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";

const router = express.Router();

    /**
     * All these routes are prefixed by /views
     */

    /**
     * Get on root of api, returns api informations in JSON format
     */
    router.route('/index')
        .get(ViewsController.index);

    /**
     * Get profile infos in JSON format
     */
    router.route('/profile')
        .get(PermissionsManager(Scopes.ALL, true, Permissions.USER), ViewsController.profile);

    router.route('/tables')
        .get(ViewsController.tables);

    router.route('/admin')
        .get(PermissionsManager(Scopes.ALL, true, PermissionsManager.ADMIN), ViewsController.admin);

export default router