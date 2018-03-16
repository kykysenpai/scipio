import Session from "../modules/Session";
import HttpStatus from "../config/constants/HttpStatus";
import Logger from "../modules/Logger";
import Config from "../config/Config";
import UserUcc from "../UCC/UserUcc";
import HttpError from "../modules/HttpError";
import HttpParams from "../config/constants/HttpParams";

const authenticate = async (req, res, next) => {
    try {
        let decodedToken = await Session.getTokenFromSession(req);
        res.status(HttpStatus.OK).send(decodedToken.permissions);
        return;
    } catch (err) {
        Logger.debug("A client made a request with an empty cookie");
    }

    try {
        if (!req.body[HttpParams.LOGIN] || !req.body[HttpParams.PASSWORD]) {
            return next(new HttpError('The login or the password is missing !', HttpStatus.BAD_REQUEST));
        }
        let userDTO = await UserUcc.authenticate(req.body[HttpParams.LOGIN], req.body[HttpParams.PASSWORD]);
        let signedToken = await Session.signToken(userDTO.getAll());
        res
            .cookie(Config.COOKIE_NAME, signedToken)
            .status(HttpStatus.OK)
            .send(userDTO.permissions);
    } catch (err) {
        Logger.debug(err);
        next(err)
    }
};

const deleteSession = (req, res) => {
    res
        .clearCookie(Config.COOKIE_NAME)
        .status(HttpStatus.OK)
        .end();
};

export default {authenticate, deleteSession}