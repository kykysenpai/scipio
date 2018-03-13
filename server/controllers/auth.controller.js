import config from '../config/config';
import HttpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';
import Permissions from '../config/Permissions';
import Session from '../modules/Session';
import User from '../models/User.DTO';
import UserUCC from '../UCC/User.UCC';
import HTTPConstants from '../config/HTTPConstants';

/**
 * Post route on /auth should put a signed jwt as a cookies in the response
 * Will put a HTTP status of 200 if everything is fine or an error in another case
 * @param req
 * @param res
 * @param next
 */
const post = (req, res, next) => {
    Session.getTokenFromSession(req)
        .then(decodedToken => res.status(HttpStatus.OK).send(decodedToken.permissions))
        .catch(err => {//The user doesn't have a cookie initialized
            if(!req.body[HTTPConstants.LOGIN] || !req.body[HTTPConstants.PASSWORD]){
                return next(new HttpError('The request didn\'t have the required parameters', HttpStatus.BAD_REQUEST));
            }
            UserUCC.authenticate(req.body[HTTPConstants.LOGIN], req.body[HTTPConstants.PASSWORD])
                .then((userDTO) => {
                    return Promise.all([Session.signToken(userDTO.getAll()), userDTO]);
                })
                .then(([signedToken, userDTO]) => {
                    res
                        .cookie(config.COOKIE_NAME, signedToken)
                        .status(HttpStatus.OK)
                        .send(userDTO.permissions);
                })
                .catch((err) => {
                    log.debug(err);
                    next(err)
                });
        });
};

const deleteSession = (req, res, next) => {
    res
        .clearCookie(config.COOKIE_NAME)
        .status(HttpStatus.OK)
        .end();
};

export default {post, deleteSession};