import config from './config';
import winston from 'winston';

winston.cli()

let level;

if(config.ENV === 'dev'){
    level = 'debug';
} else if (config.ENV === 'prod'){
    level = 'warn';
} else {
    throw Error('Environment was not set in the config file');
}

winston.configure({
    transports:[
        new(winston.transports.Console)({
            colorize: true,
            level: level,
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

/*
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
*/