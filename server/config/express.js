import express from 'express';
import log from 'winston';
import index from '../routes/index.route';
import httpStatus from 'http-status';
import api from '../routes/api.route';
import config from './config';
import expressWinston from 'express-winston';

const app = express();

app.use(express.static('../../public'));

/**
 * logs only the http request method and path at info level in the console
 */
app.use(expressWinston.logger({
    transports:[
        new log.transports.Console({
            colorize: true,
            level: config.LOG_LEVEL
        })
    ],
    meta: false,
    expressFormat: true
}));

/**
 * logs the meta data of http requests in the http-requests.log file
 */
app.use(expressWinston.logger({
    transports:[
        new log.transports.File({
            filename:'http-requests.log'
        })
    ],
    expressFormat: true
}));

/**
 * logs the errors of the pipeline
 */
app.use(expressWinston.errorLogger({
    transports:[
        new log.transports.Console({
            colorize: true
        }),
        new log.transports.File({
            filename:'http-errors.log'
        })
    ]
}));

/**
 * Route all calls to the /api url
 */
app.use('/api', api);

/**
 * Route calls to the root url
 */
app.use('/', index);

/**
 * If no route managed to respond to the request, send a 404
 */
app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND);

    if(req.accepts('html')){
        res.sendFile(config.VIEWS + '/error404.html');
        return;
    }

    if(req.accepts('json')){
        res.send({error: 'This url doesn\'t exist'});
        return;
    }

    res.type('txt').send('Error 404 this page doesn\'t exist');

});

log.info('express app has received middlewares setup');

module.exports = app;