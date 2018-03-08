import config from "./config";
import path from 'path';

config.ROOT = path.normalize(__dirname + '/../..');
config.PUBLIC = config.ROOT + '/public';
config.VIEWS = config.ROOT + '/server/views';
config.VIEWS_ERRORS = config.VIEWS + '/errors';
