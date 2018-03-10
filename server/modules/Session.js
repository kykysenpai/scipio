import JWT from 'jsonwebtoken';
import config from '../config/config';
import HttpError from "./HttpError";
import HttpStatus from "http-status";
import log from 'winston';

const secretJWTKey = config.JWT_SECRET;

/**
 * Verify the validity of the JWT token in the client session and decode it if it's valid
 * @param req
 * @returns {Promise<any>}
 */
const getTokenFromSession = (req) => {
    return new Promise((resolve, reject) => {
        if (req.session && req.session.token) {
            let token = JWT.decode(req.session.token);
            JWT.verify(token, secretJWTKey, (err, decoded) => {
                if(!err) {
                    resolve(decoded);
                }
                log.debug(err);
            })
        }
        reject(new HttpError('The JWT token from the client session was malformed or invalid', HttpStatus.BAD_REQUEST));
    });
};

/**
 * Sign a token and add it in the session signed if no error happened
 * @param token
 * @param session
 * @returns {Promise<any>}
 */
const signToken = (token, session) => {
    return new Promise((resolve, reject) => {
        JWT.sign(token, secretJWTKey, {algorithm: 'HS256'}, (err, signedToken) => {
            if(err){
                log.debug(err);
                reject(new HttpError('The server couldn\'t sign the JWT token', HttpStatus.INTERNAL_SERVER_ERROR));
            } else {
                session.token = signedToken;
                resolve();
            }
        })
    })
};

export default {getTokenFromSession, signToken};