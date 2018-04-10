import AccountCreationCodeDao from "../dao/AccountCreationCodeDao";
import Logger from "../modules/Logger";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";

const createAccountCreationCode = async (req) => {
    if(!req.query || !req.query.login || req.query.login === "") throw new HttpError("Missing the login to which the code will be linked", HttpStatus.BAD_REQUEST);
    return await AccountCreationCodeDao.createAccountCreationCode(req.query.login);
};

const checkCodeValidity = async (code, login) => {
    return await AccountCreationCodeDao.checkCodeValidity(code, login);
};

export default {createAccountCreationCode, checkCodeValidity}