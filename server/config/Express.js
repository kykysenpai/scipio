import express from "express";
import cookieParser from 'cookie-parser';
import expressWinston from "express-winston";
import winston from "winston";
import ApiRoute from "../routes/ApiRoute";
import ViewsRoute from "../routes/ViewsRoute";
import HttpStatus from "./constants/HttpStatus";
import Paths from "./constants/Paths";
import Config from "./Config";
import Logger from "../modules/Logger";

const app = express();

app.use(express.static(Paths.PUBLIC));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

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

app.use('/api', ApiRoute);

app.use('/views', ViewsRoute);

/**
 * An error was thrown
 */
app.use((err, req, res, next) => {
    if (err) {
        if (err.statusCode && err.redirectRes) {
            res
                .status(err.statusCode)
                .sendFile(Paths.VIEWS_ERRORS + '/error' + err.statusCode + '.html');
        } else if (err.statusCode && !err.redirectRes) {
            res
                .status(err.statusCode)
                .send('Error message : ' + err.message)
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .sendFile(Paths.VIEWS_ERRORS + '/error500.html');
        }
    }
});

/**
 * If no route managed to respond to the request, send a 404
 */
app.use((req, res) => {
    res.status(HttpStatus.NOT_FOUND);

    if (req.accepts('html')) {
        res.sendFile(Paths.VIEWS_ERRORS + '/error404.html');
        return;
    }

    if (req.accepts('json')) {
        res.send({error: 'This url doesn\'t exist'});
        return;
    }

    res.type('txt').send('Error 404 this page doesn\'t exist');

});

Logger.info('express app has received middlewares setup');

export default app;