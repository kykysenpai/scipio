import express from "express";
import UserController from "../controllers/UserController";

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

router.route('/account-confirmation')
    .get(UserController.confirmAccount);

export default router