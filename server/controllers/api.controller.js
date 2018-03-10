import config from '../config/config';
import HttpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';

const get = (req, res, next) => {
    try{
        res.status(HttpStatus.OK).send('Hello');
    }catch (err){
        return next(err);
    }
};

export default {get};