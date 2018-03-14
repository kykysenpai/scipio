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
const getTokenFromSession = async (req) => {
    if (req.cookies && req.cookies[config.COOKIE_NAME]) {
        try{
            return await JWT.decode(req.cookies[config.COOKIE_NAME], config.COOKIE_SECRET);
        } catch (err){
            throw new HttpError('The JWT token from the client session was malformed or invalid', HttpStatus.BAD_REQUEST);
        }
    } else {
        throw new HttpError('The client didn\'t have a cookie in his session', HttpStatus.UNAUTHORIZED);
    }
};

/**
 * Sign a token and return it
 * @param token
 * @returns {Promise<any>}
 */
const signToken = async (token) => {
    try {
        return await JWT.sign(token, config.COOKIE_SECRET, {algorithm: 'HS256'})
    } catch (err) {
        log.debug(err);
        throw new HttpError('The server couldn\'t sign the JWT token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default {getTokenFromSession, signToken};