import Logger from "../modules/Logger";
import HttpStatus from "../config/constants/HttpStatus";
import Paths from "../config/constants/Paths";
import HttpError from "../modules/HttpError";

const getError = (req, res, next) => {
    try {
        res
            .status(HttpStatus[req.params.errorNumber])
            .sendFile(Paths.VIEWS_ERRORS + '/error' + req.params.errorNumber + '.html');
    } catch (err) {
        Logger.debug(err);
        next(new HttpError("Unknown error", HttpStatus.BAD_REQUEST));
    }
};

const getView = (req, res, next) => {
    try{
        Logger.debug("getting view Controller", req.params.viewName);
        res
            .status(HttpStatus.OK)
            .sendFile(Paths.VIEWS_SUCCESS + '/' + req.params.viewName + '.html');
    } catch (err){
        Logger.debug(err);
        next(new HttpError("No such resource", HttpStatus.NOT_FOUND))
    }
};

export default {getError, getView}