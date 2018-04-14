import Config from "../config/Config";
import JWT from "jsonwebtoken";
import HttpError from "./HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "./Logger";

/**
 * Get the token from the given request
 * @param req
 * @returns {Promise<*>} returns the decoded token from the session, else throws an error
 */
const getTokenFromSession = async (req) => {
    if (req.cookies && req.cookies[Config.COOKIE_NAME]) {
        try {
            return await JWT.decode(req.cookies[Config.COOKIE_NAME], Config.COOKIE_SECRET);
        } catch (err) {
            throw new HttpError('The JWT token from the session was malformed or invalid', HttpStatus.BAD_REQUEST);
        }
    } else {
        throw new HttpError('You must be properly logged in to access this resource', HttpStatus.UNAUTHORIZED);
    }
};

/**
 * Sign a token and return it
 * @param token the user informations in a js object
 * @returns {Promise<any>}
 */
const signToken = async (token) => {
    try {
        return await JWT.sign(token, Config.COOKIE_SECRET, {algorithm: 'HS256'})
    } catch (err) {
        Logger.debug(err);
        throw new HttpError('The server couldn\'t sign the JWT token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default {getTokenFromSession, signToken}