import express from "express";
import cookieParser from 'cookie-parser';
import expressWinston from "express-winston";
import winston from "winston";
import ApiRoute from "../routes/ApiRoute";
import HttpStatus from "./constants/HttpStatus";
import Paths from "./constants/Paths";
import Config from "./Config";
import Logger from "../modules/Logger";
import ViewRoute from "../routes/ViewRoute";

Logger.info('Setting up server context...');

const app = express();

app.use(express.static(Paths.PUBLIC));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

Logger.info('Setting up the server log middleware...');

/**
 * logs only the http request method and path at info level in the console
 */
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            level: Config.LOG_LEVEL
        })
    ],
    meta: false,
    expressFormat: true
}));

/**
 * logs the meta data of http requests in the http-requests.log file
 */
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: 'http-requests.log'
        })
    ],
    expressFormat: true
}));

/**
 * logs the errors of the pipeline
 */
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            colorize: true
        }),
        new winston.transports.File({
            filename: 'http-errors.log'
        })
    ]
}));

Logger.info('Setting up the HTTP routes...');

app.use('/api', ApiRoute);

app.use('/views', ViewRoute);

/**
 * An error was thrown
 */
app.use((err, req, res, next) => {
    if (err) {
        Logger.debug(err);
        if (err.statusCode) {
            res
                .status(err.statusCode)
                .send('Error message : ' + err.message)
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Error message : Unknown error, please report this error to Kyky');
        }
    }
});

/**
 * If no route managed to respond to the request, send a 404
 */
app.use((req, res) => {

    if(req.accepts('html')){
        res
            .status(HttpStatus.NOT_FOUND)
            .sendFile(Paths.VIEWS_ERRORS + '/error404.html');
    } else {
        res
            .status(HttpStatus.NOT_FOUND)
            .send('This resource doesn\'t exist');
    }
});

Logger.info('express app has received middlewares setup');

export default app;