import JWT from './JWT';
import HttpError from "./HttpError";
import HttpStatus from 'http-status';

/**
 * Checks if the session of the client has at least any of the given permissions
 * @param perms
 * @returns {function(*=, *, *=)}
 */
const requireAny = (...perms) => {
    return (req, res, next) => {
        let jwtPerms = checkSession(req);
        perms.forEach((perm) => {
            jwtPerms.forEach((jwtPerm) => {
                if(perm === jwtPerm){
                    next();
                }
            })
        });
        throw new HttpError('A client tried accessing protecting data but didn\'t have high enough permissions', HttpStatus.FORBIDDEN);
    }
};

/**
 * Checks if the session of the client has all of the given permissions
 * @param perms
 * @returns {function(*=, *, *)}
 */
const requireAll = (...perms) =>{
    return (req, res, next) => {
        let jwtPerms = checkSession(req);
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
    }
};

/**
 * Checks if the session exists and is well formed
 * @param req
 * @returns {*}
 */
const checkSession = (req) => {
    if(req.session && req.session.token){
        let token = JWT.decode(req.session.token);
        if(token.permissions){
            return token.permissions;
        } else {
            throw new HttpError('JWT Token was malformed', HttpStatus.BAD_REQUEST);
        }
    } else {
        throw new HttpError('A client tried accessing protecting data but had an empty session', HttpStatus.UNAUTHORIZED);
    }
}

export default {requireAny, requireAll};