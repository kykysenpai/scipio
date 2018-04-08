import Session from "../modules/Session";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "../modules/Logger";
import Config from "../config/Config";
import UserUcc from "../ucc/UserUcc";
import HttpError from "../modules/HttpError";
import HttpParams from "../config/constants/HttpParams";
import PermissionUcc from "../ucc/PermissionUcc";

/**
 * Try to authenticate request by putting a token in it if it's not already present
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>} the permissions of the now logged in user
 */
const authenticate = async (req, res, next) => {
    try {
        let decodedToken = await Session.getTokenFromSession(req);
        res.status(HttpStatus.OK).send(decodedToken.permissions);
        return;
    } catch (err) {
        Logger.debug("A client made a request with an empty cookie");
    }

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
        let permissions = await PermissionUcc.findAllByUserId(user.id);
        permissions.forEach(permission => {
            infoToSignInToken.permissions.push(permission.name);
        });

        let signedToken = await Session.signToken(infoToSignInToken);

        res
            .cookie(Config.COOKIE_NAME, signedToken)
            .status(HttpStatus.OK)
            .send(user.permissions);
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

export default {authenticate, deleteSession}