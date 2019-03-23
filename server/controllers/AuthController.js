import Session from "../modules/Session";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "../modules/Logger";
import Config from "../config/Config";
import UserUcc from "../ucc/UserUcc";
import FrontPermissions from "../config/constants/FrontPermissions";
import keycloak from "../modules/Keycloak";
import HttpError from "../modules/HttpError";

/**
 * Try to authenticate request by putting a token in it if it's not already present
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>} the permissions of the now logged in user
 */
const authenticate = async (req, res, next) => {
    try {

        let infoToSignInToken = {};

        let user = await keycloak.getAccount(req.body.token);

        infoToSignInToken.first_name = user.given_name;
        infoToSignInToken.last_name = user.family_name;
        infoToSignInToken.login = user.preferred_username;
        infoToSignInToken.email = user.email;
        infoToSignInToken.permissions = [];

        let localUser = await UserUcc.findUserByKeycloakId(user.sub);
        infoToSignInToken.id = localUser.id;
        if(localUser == null){
            throw new Error("Sorry user creation is not available at this time");
            //create local user
        }

        localUser.permissions.forEach(permission => {
            infoToSignInToken.permissions.push(permission.name);
        });

        let permissionsWithIcons = [];

        localUser.permissions.forEach(permission => {
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
        next(new HttpError(err, HttpStatus.BAD_REQUEST));
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
                permissions: permissionsWithIcons
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
