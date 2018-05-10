import Logger from "../modules/Logger";
import HttpStatus from "../config/constants/HttpStatus";
import Paths from "../config/constants/Paths";
import HttpError from "../modules/HttpError";

const getError = (req, res, next) => {
    if(!req.params || !req.params.errorNumber){
        req.params.errorNumber = HttpStatus.BAD_REQUEST;
    }
    try {
        res
            .status(HttpStatus.OK)
            .sendFile(Paths.VIEWS_ERRORS + '/' + req.params.errorNumber + '.html');
    } catch (err) {
        Logger.debug(err);
        next();
    }
};

const getView = (req, res, next) => {
    try{
        res
            .status(HttpStatus.OK)
            .sendFile(Paths.VIEWS_SUCCESS + '/' + req.params.viewName + '.html');
    } catch (err){
        Logger.debug(err);
        next();
    }
};

export default {getError, getView}