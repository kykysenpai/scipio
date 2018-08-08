import path from "path";

let ROOT = path.normalize(__dirname + '/../../..');
let VIEWS = ROOT + '/server/views';

const paths = {
    ROOT: ROOT,
    PUBLIC: ROOT + '/public',
    VIEWS: VIEWS,
    VIEWS_ERRORS: VIEWS + '/errors',
    VIEWS_SUCCESS: VIEWS + '/success',
    GAME_SERVER_SCRIPTS : ROOT +'/game_servers_scripts'
};

export default paths