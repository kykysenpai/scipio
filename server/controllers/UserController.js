import UserUcc from "../ucc/UserUcc";
import HttpStatus from "../config/constants/HttpStatus";
import AccountCreationCodeUcc from "../ucc/AccountCreationCodeUcc";
import Paths from "../config/constants/Paths";
import Config from "../config/Config";
import HttpError from "../modules/HttpError";

const createUser = async (req, res, next) => {
    try {
        await UserUcc.createUser(req);
        res
            .status(HttpStatus.OK)
            .send();
    } catch (err) {
        next(err);
    }
};

const createCode = async (req, res, next) => {
    try {
        let code = await AccountCreationCodeUcc.createAccountCreationCode(req);
        res
            .status(HttpStatus.OK)
            .send(code.code);
    } catch (err) {
        next(err);
    }
};

const confirmAccount = async (req, res, next) => {
    try {
        await UserUcc.confirmAccount(req);
        res
            .status(HttpStatus.OK)
            .sendFile(Paths.VIEWS_SUCCESS + '/account_confirmed.html');
    } catch (err) {
        next(err);
    }
};

const findAll = async (req, res, next) => {
    try {
        let users = await UserUcc.findAll();
        res
            .status(HttpStatus.OK)
            .send(users);

    } catch (err) {
        next(err);
    }
};

const validateCode = async (req, res, next) => {
    try {
        let code = await UserUcc.validateCode(req);
        if (!code) throw new HttpError("The combination code/login was invalid, it is either wrong or expired", HttpStatus.BAD_REQUEST);
        res
            .status(HttpStatus.OK)
            .send({
                code: code.code,
                user_login: code.user_login
            });
    } catch (err) {
        next(err);
    }
};

const deactivateUser = async (req, res, next) => {
    try {
        await UserUcc.deactivateUser(req);
        res
            .status(HttpStatus.OK)
            .send();
    } catch (err) {
        next(err);
    }
};

const resendMail = async(req, res, next) => {
    try{
        await UserUcc.resendMail(req);
        res
            .status(HttpStatus.OK)
            .send();
    }  catch(err) {
        next(err);
    }
};

const addPermission = async (req, res, next) => {
    try{
        await UserUcc.addPermission(req);
        res
            .status(HttpStatus.OK)
            .send();
    } catch (err) {
        next(err);
    }
};

const removePermission = async(req, res, next) => {
    try{
        await UserUcc.removePermission(req);
        res
            .status(HttpStatus.OK)
            .send();
    } catch (err) {
        next(err);
    }
};

export default {createUser, createCode, confirmAccount, findAll, validateCode, deactivateUser, resendMail, addPermission, removePermission}