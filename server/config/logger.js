import config from './config';
import winston from 'winston';

let level;

if(config.ENV === 'dev'){
    level = 'debug';
} else if (config.ENV === 'prod'){
    level = 'warn';
} else {
    throw Error('Environment was not set in the config file');
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level,
            colorize: true,
            json:true,
            timestamp: true
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'app.log'
        })
    ],
    exitOnError: false
});

logger.colorize = true;

module.exports = logger;