import Config from "../config/Config";
import JWT from "jsonwebtoken";
import HttpError from "./HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "./Logger";

const getTokenFromSession = async (req) => {
    if (req.cookies && req.cookies[Config.COOKIE_NAME]) {
        try {
            return await JWT.decode(req.cookies[Config.COOKIE_NAME], Config.COOKIE_SECRET);
        } catch (err) {
            throw new HttpError('The JWT token from the session was malformed or invalid', HttpStatus.BAD_REQUEST);
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
        return await JWT.sign(token, Config.COOKIE_SECRET, {algorithm: 'HS256'})
    } catch (err) {
        Logger.debug(err);
        throw new HttpError('The server couldn\'t sign the JWT token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default {getTokenFromSession, signToken}