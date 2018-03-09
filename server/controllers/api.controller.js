import config from '../config/config';
import httpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';

const get = (req, res, next) => {
    try{
        throw new HttpError('this is a test', httpStatus.UNAUTHORIZED);
    }catch (err){
        return next(err);
    }
};

export default {get};