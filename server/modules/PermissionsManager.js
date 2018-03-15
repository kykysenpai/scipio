import HttpError from "./HttpError";
import HttpStatus from 'http-status';
import Session from './Session';
import log from 'winston';

/**
 * Checks if the session of the client has the required permissions
 * @param scope any or all defines if the client needs all  the permissions or any of those default = any
 * @param perms
 * @returns {function(*=, *, *)}
 */
const requires = (scope, ...perms) => {
    return async (req, res, next) => {
        try {
            let token = await Session.getTokenFromSession(req);
            let jwtPerms = token.permissions;
            let hasPerm = false;
            if(scope === 'all'){
                hasPerm = checkAll(perms, jwtPerms)
            } else {
                hasPerm = checkAny(perms, jwtPerms)
            }
            if (hasPerm) {
                next();
            } else {
                next(new HttpError('A client tried accessing protecting data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN));
            }
        } catch (err) {
            log.debug(err);
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

export default {requires};