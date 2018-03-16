import HttpError from "./HttpError";
import Logger from "./Logger";
import Session from "./Session";
import HttpStatus from "../config/constants/HttpStatus";

const requires = (scope, ...perms) => {
        return async (req, res, next) => {
            try {
                let token = await Session.getTokenFromSession(req);
                let jwtPerms = token.permissions;
                let hasPerm = false;
                if (scope === 'all') {
                    hasPerm = checkAll(perms, jwtPerms)
                } else {
                    hasPerm = checkAny(perms, jwtPerms)
                }
                if (hasPerm) {
                    next();
                } else {
                    next(new HttpError('You tried to access protected data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN));
                }
            } catch (err) {
                Logger.debug(err);
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

    export default {requires}