import config from '../config/config';
import HttpStatus from 'http-status';
import log from 'winston';
import HttpError from '../modules/HttpError';

const get = (req, res, next) => {
    res.status(HttpStatus.OK).send({
        '/api' : {
            get: 'returns a JSON describing all the API has to offer'
        },
        '/api/auth': {
            post: 'should received a post with parameters username and password in the body, will put a cookie in the response if the credentials were valid'
        }
    });
};

export default {get};