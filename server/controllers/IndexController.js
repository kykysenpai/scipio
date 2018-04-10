import HttpStatus from "../config/constants/HttpStatus";
import Logger from "../modules/Logger";

const get = (req, res) => {
    res.status(HttpStatus.OK).send({
        '/api': {
            get: 'returns a JSON describing all the API has to offer'
        },
        '/api/auth': {
            post: 'should received a post with parameters username and password in the body, will put a cookie in the response if the credentials were valid'
        }
    });
};

const load = (req, res, next) => {
    Logger.debug("root query", req.query);
    if(!req.query) return;
    try{
        if(req.query.account-confirmation-code){
            Logger.debug("account confirmation");
        }
    }catch(err){
        Logger.debug(err);
        next(err);
    }
};

export default {load}