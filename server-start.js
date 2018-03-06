//get the config file
import config from './server/config/config';
//setup the logger for the server
import log from './server/config/logger';

process.env.NODE_ENV = process.env.NODE_ENV || config.ENV;
process.env.PORT = process.env.PORT || config.PORT;
process.env.IP = process.env.IP || config.IP;
config.PUBLIC = __dirname + '/public';

import './server';