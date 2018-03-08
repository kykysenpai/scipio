import config from './config';
import winston from 'winston';

winston.cli();

if(config.ENV === 'dev'){
    config.LOG_LEVEL = 'debug';
} else if (config.ENV === 'prod'){
    config.LOG_LEVEL = 'warn';
} else {
    throw Error('Environment was not set in the config file');
}

winston.configure({
    transports:[
        new(winston.transports.Console)({
            colorize: true,
            level: config.LOG_LEVEL,
            prettyPrint: true,
            timestamp: true
        }),
        new(winston.transports.File)({
            filename: 'app.log',
            level: 'warn',
            timestamp: true
        })
    ]
});