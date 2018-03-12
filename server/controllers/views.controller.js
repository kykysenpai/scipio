import config from '../config/config';
import HttpStatus from 'http-status';

const index = (req, res, next) => {
    res.status(HttpStatus.OK).sendFile(config.VIEWS_SUCCESS + '/index.html');
};

const profile = (req, res, next) => {
    res.status(HttpStatus.OK).sendFile(config.VIEWS_SUCCESS + '/profile.html');
};

export default {index, profile};