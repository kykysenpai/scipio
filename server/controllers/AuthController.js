import Session from "../modules/Session";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "../modules/Logger";
import Config from "../config/Config";
import UserUcc from "../ucc/UserUcc";
import HttpError from "../modules/HttpError";
import HttpParams from "../config/constants/HttpParams";
import PermissionUcc from "../ucc/PermissionUcc";
import FrontPermissions from "../config/constants/FrontPermissions";
import Permissions from "../config/constants/Permissions";

/**
 * Try to authenticate request by putting a token in it if it's not already present
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>} the permissions of the now logged in user
 */
const authenticate = async (req, res, next) => {
    try {
        if (!req.body[HttpParams.LOGIN] || !req.body[HttpParams.PASSWORD]) throw new HttpError('The login or the password is missing !', HttpStatus.BAD_REQUEST);

        let infoToSignInToken = {};

        let user = await UserUcc.authenticate(req.body[HttpParams.LOGIN], req.body[HttpParams.PASSWORD]);
        infoToSignInToken.id = user.id;
        infoToSignInToken.first_name = user.first_name;
        infoToSignInToken.last_name = user.last_name;
        infoToSignInToken.login = user.login;
        infoToSignInToken.email = user.email;
        infoToSignInToken.permissions = [];

        user.permissions.forEach(permission => {
            infoToSignInToken.permissions.push(permission.name);
        });

        let permissionsWithIcons = [];

        user.permissions.forEach(permission => {
            permissionsWithIcons.push({
                name: permission.name,
                icon: FrontPermissions[permission.name]
            });
        });

        let signedToken = await Session.signToken(infoToSignInToken);

        res
            .cookie(Config.COOKIE_NAME, signedToken)
            .status(HttpStatus.OK)
            .send(permissionsWithIcons);
    } catch (err) {
        Logger.debug(err);
        next(err)
    }
};

/**
 * Clear the jwt token from the session
 * @param req
 * @param res
 */
const deleteSession = (req, res) => {
    res
        .clearCookie(Config.COOKIE_NAME)
        .status(HttpStatus.OK)
        .end();
};

const checkAuthenticated = async (req, res) => {
    try {
        let decodedToken = await Session.getTokenFromSession(req);
        let permissionsWithIcons = [];

        //get icons for front
        decodedToken.permissions.forEach(permission => {
            permissionsWithIcons.push({
                name: permission,
                icon: FrontPermissions[permission]
            });
        });
        res
            .status(HttpStatus.OK)
            .send({
                isAuthenticated: true,
                permissions : permissionsWithIcons
            });
    } catch (err) {
        /**
         * Empty cookie
         */
        res
            .status(HttpStatus.OK)
            .send({
                isAuthenticated: false
            })
    }
};

export default {authenticate, deleteSession, checkAuthenticated}