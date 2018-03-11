import JWT from 'jsonwebtoken';
import config from '../config/config';
import HttpError from "./HttpError";
import HttpStatus from "http-status";
import log from 'winston';

/**
 * Verify the validity of the JWT token in the client session and decode it if it's valid
 * @param req
 * @returns {Promise<any>}
 */
const getTokenFromSession = (req) => {
    return new Promise((resolve, reject) => {
        if (req.cookies && req.cookies[config.COOKIE_NAME]) {
            log.debug(req.cookies[config.COOKIE_NAME]);
            JWT.verify(req.cookies[config.COOKIE_NAME], config.COOKIE_SECRET, (err, decoded) => {
                if (err) {
                    reject(new HttpError('The JWT token from the client session was malformed or invalid', HttpStatus.BAD_REQUEST));
                } else {
                    resolve(decoded);
                }
            });
        } else {
            reject(new HttpError('The client didn\'t have a cookie in his session', HttpStatus.UNAUTHORIZED));
        }
    });
};

/**
 * Sign a token and return it
 * @param token
 * @returns {Promise<any>}
 */
const signToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.sign(token, config.COOKIE_SECRET, {algorithm: 'HS256'}, (err, signedToken) => {
            if (err) {
                log.debug(err);
                reject(new HttpError('The server couldn\'t sign the JWT token', HttpStatus.INTERNAL_SERVER_ERROR));
            } else {
                log.debug('generated token :', signedToken);
                resolve(signedToken);
            }
        })
    })
};

export default {getTokenFromSession, signToken};