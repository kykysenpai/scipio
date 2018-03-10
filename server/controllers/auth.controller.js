import config from '../config/config';
import HttpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';
import Permissions from '../config/Permissions';
import Session from '../modules/Session';
import User from '../models/User.DTO';

const post = (req, res, next) => {

    let user = new User('Jean-mi', [
            Permissions.USER,
            Permissions.ADMIN
        ]
    ).get();

    //Db.authenticate(req).then(() => {})
    //...
    Session.signToken(user, req.cookies)
        .then(() => {
            log.debug(user, 'has logged in');
            res.status(HttpStatus.OK).end();
        })
        .catch((err) => {
            next(err);
        });
};

export default {post};