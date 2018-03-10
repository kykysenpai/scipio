import HttpError from "./HttpError";
import HttpStatus from 'http-status';
import Session from './Session';
import log from 'winston';

/**
 * Checks if the session of the client has at least any of the given permissions
 * @param perms
 * @returns {function(*=, *, *=)}
 */
const requireAny = (...perms) => {
    return (req, res, next) => {
        Session.getTokenFromSession(req)
            .then((token) => {
                let jwtPerms = token.permissions;
                perms.forEach((perm) => {
                    jwtPerms.forEach((jwtPerm) => {
                        if (perm === jwtPerm) {
                            next();
                        }
                    })
                });
                throw new HttpError('A client tried accessing protecting data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN);
            })
            .catch((err) => {
                log.debug(err);
                next(new HttpError('The JWT token from the client session was malformed or invalid', HttpStatus.BAD_REQUEST));
            });
    }
};

/**
 * Checks if the session of the client has all of the given permissions
 * @param perms
 * @returns {function(*=, *, *)}
 */
const requireAll = (...perms) =>{
    return (req, res, next) => {
        Session.getTokenFromSession(req)
            .then((token) => {
                let jwtPerms = token.permissions;
                perms.forEach((perm) => {
                    let hasPerm = false;
                    jwtPerms.forEach((jwtPerm) => {
                        if(perm === jwtPerm){
                            hasPerm = true;
                        }
                    });
                    if(!hasPerm){
                        throw new HttpError('A client tried accessing protecting data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN);
                    }
                });
                next();
            })
            .catch((err) => {
                log.debug(err);
                next(new HttpError('The JWT token from the client session was malformed or invalid', HttpStatus.BAD_REQUEST));
            });

    }
};

export default {requireAny, requireAll};