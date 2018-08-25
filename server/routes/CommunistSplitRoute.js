import express from "express";
import PermissionsManager from "../modules/PermissionsManager";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import CommunistSplitController from "../controllers/CommunistSplitController";

const router = express.Router();

/**
 * All these routes are prefixed by /api/communist_split
 */

router.route('/split_group')
    .post(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.addSplitGroup)
    .get(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.getAllSplitGroups);

router.route('/split_payment')
    .post(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.addSplitPayment)
    .get(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.getAllSplitPayments);

router.route('/split_group/:split_group_id')
    .get(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.getSplitGroup);

router.route('/split_payment/:split_payment_id')
    .get(PermissionsManager(Scopes.ANY, Permissions.COMMUNIST_SPLIT), CommunistSplitController.getSplitPayment);

export default router