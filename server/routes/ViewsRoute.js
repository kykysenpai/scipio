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
        .get(PermissionsManager.requires(Scopes.ALL, Permissions.USER), ViewsController.profile);

export default router