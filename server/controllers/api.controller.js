import config from '../config/config';
import HttpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';

const get = (req, res, next) => {
    res.status(HttpStatus.OK).send('Hello');
};

export default {get};