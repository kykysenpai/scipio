import HttpError from "./HttpError";
import Logger from "./Logger";
import Session from "./Session";
import HttpStatus from "../config/constants/HttpStatus";
import Scopes from "../config/constants/Scopes";
import Permissions from "../config/constants/Permissions";
import Utils from "./Utils";

/**
 * Check if the user has the required permissions
 * @param scope can be one of the default scope defining how to determine which of the permissions are needed
 * @param perms all the permissions to be querried
 * @returns {function(*=, *, *)} pass the request to the next middleware if all the required permissions are present, else throws an error
 */
const requires = (scope, ...perms) => {
    return async (req, res, next) => {
        try {
            let token = await Session.getTokenFromSession(req);
            let jwtPerms = token.permissions;
            let hasPerm = false;
            switch (scope) {
                case Scopes.ALL:
                    hasPerm = Utils.checkAll(perms, jwtPerms);
                    break;
                case Scopes.ANY:
                    hasPerm = Utils.checkAny(perms, jwtPerms);
                    break;
                default :
                    next(new HttpError('Unknown permission scope : ' + scope, HttpStatus.INTERNAL_SERVER_ERROR));
            }
            if (hasPerm) {
                return next();
            } else {
                return next(new HttpError('You tried to access protected data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN));
            }
        } catch (err) {
            Logger.debug("PermissionsManager", err);
            return next(err);
        }
    }
};

export default requires;