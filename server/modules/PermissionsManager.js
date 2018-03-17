import HttpError from "./HttpError";
import Logger from "./Logger";
import Session from "./Session";
import HttpStatus from "../config/constants/HttpStatus";
import Scopes from "../config/constants/Scopes";

const requires = (scope, redirect, ...perms) => {
    return async (req, res, next) => {
        try {
            let token = await Session.getTokenFromSession(req);
            let jwtPerms = token.permissions;
            let hasPerm = false;
            switch (scope) {
                case Scopes.ALL:
                    hasPerm = checkAll(perms, jwtPerms)
                    break;
                case Scopes.ANY:
                    hasPerm = checkAny(perms, jwtPerms)
                    break;
                default :
                    next(new HttpError('Unknown permission scope :' + scope, HttpStatus.INTERNAL_SERVER_ERROR, redirect));
            }
            if (hasPerm) {
                next();
            } else {
                next(new HttpError('You tried to access protected data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN, redirect));
            }
        } catch (err) {
            Logger.debug(err);
            err.redirectRes = redirect;
            next(err);
        }
    }
};

const checkAny = (perms, jwtPerms) => {
    let hasPerm = false;
    perms.forEach((perm) => {
        jwtPerms.forEach((jwtPerm) => {
            if (perm === jwtPerm) {
                hasPerm = true;
            }
        })
    });
    return hasPerm;
};

const checkAll = (perms, jwtPerms) => {
    perms.forEach((perm) => {
        let hasPerm = false;
        jwtPerms.forEach((jwtPerm) => {
            if (perm === jwtPerm) {
                hasPerm = true;
            }
        });
        if (!hasPerm) {
            return false;
        }
    });
    return true;
};

export default requires;