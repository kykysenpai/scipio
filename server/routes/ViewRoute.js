import express from "express";
import ViewController from "../controllers/ViewController";

const router = express.Router();

/**
 * All these routes are prefixed by /views
 */

router.route('/success/:viewName')
    .get(ViewController.getView);

router.route('/errors/:errorNumber')
    .get(ViewController.getError);

export default router