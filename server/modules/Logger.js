import winston from "winston";
import Config from "../config/Config";

winston.cli();

switch (Config.ENV) {
    case 'dev':
        Config.LOG_LEVEL = 'debug';
        break;
    case 'prod':
        Config.LOG_LEVEL = 'info';
        break;
    default:
        throw new Error('no environment set in the config');
}

export default new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: Config.LOG_LEVEL,
            prettyPrint: true,
            timestamp: true
        }),
        new (winston.transports.File)({
            filename: 'app.log',
            level: 'warn',
            timestamp: true
        })
    ]
})
