import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import Db from "../db/DbMock";
import bcrypt from "bcrypt";
import UserDao from "../dao/UserDao";
import Logger from "../modules/Logger";
import Config from "../config/Config";
import AccountCreationCodeUcc from "./AccountCreationCodeUcc";
import Mailer from "../modules/Mailer";
import Url from "../config/constants/Url";
import HashDao from "../dao/HashDao";

const createUser = async (req) => {
    if (!req.body) throw new HttpError("Missing logging user information while creating him", HttpStatus.BAD_REQUEST);
    if (!checkIntegrity(req.body)) throw new HttpError("Invalid user informations", HttpStatus.BAD_REQUEST);
    if (req.body.password !== req.body.passwordConfirm) throw new HttpError("The passwords do not match", HttpStatus.BAD_REQUEST);
    if (!req.body.code || req.body.code === "") throw new HttpError("Missing Sign in code, please contact an administrator to generate your unique code", HttpStatus.BAD_REQUEST);
    Logger.debug("UserUcc : A new user is trying to sign in with valid parameters", req.body);
    let codeIsValid = await validateCode(req);
    if (!codeIsValid) throw new HttpError("The combination code/login was invalid, it is either wrong or expired", HttpStatus.BAD_REQUEST);
    try {
        req.body.password = await bcrypt.hash(req.body.password, Config.BCRYPT_SALT_ROUNDS);
    } catch (err) {
        Logger.error(err);
        throw new HttpError("Internal error while hashing the password", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    let userHash = await UserDao.createUser(req.body);
    try {
        await Mailer.sendAccountConfirmation(req.body.email, Url.ACCOUNT_CONFIRMATION + userHash, req.body.login);
    } catch (err) {
        Logger.error(err);
        throw new HttpError("Error while trying to send confirmation email", HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

const validateCode = async (req) => {
    if (!req.body || !req.body.code || req.body.code === "" || !req.body.login || req.body.login === "") throw new HttpError("Missing login or code to validate code", HttpStatus.BAD_REQUEST);
    return await AccountCreationCodeUcc.checkCodeValidity(req.body.code, req.body.login);
};

/**
 * Try to authenticate user with given login and password, will return a js object representing the user or else null and throw an error
 * @param login
 * @param password
 * @returns {Promise<null>} jsobj if valid or null otherwise
 */
const authenticate = async (login, password) => {
    if (!login || login === "" ||
        !password || password === "") {
        throw new HttpError('One of the parameter was invalid or not present', HttpStatus.BAD_REQUEST);
    }
    let user = await UserDao.findAllInfoByLogin(login);
    if (!user) throw new HttpError('Unable to match your login with any currently existing', HttpStatus.BAD_REQUEST);
    if (!user.active) throw new HttpError('Your account exists but is not activated, please check your emails to activate it', HttpStatus.EXPECTATION_FAILED);
    let result = await bcrypt.compare(password, user.password);
    if (result) {
        return checkIntegrity(user) ? user : null;
    } else {
        throw new HttpError('Password did not match', HttpStatus.BAD_REQUEST);
    }
};

/**
 * Checks if the javascript object has all the attriubtes required to match a user in the application
 * Checks for password > 6 length
 * Email corresponds to email pattern
 * @param user
 * @returns {boolean} true if the object is a good representation of a user
 */
const checkIntegrity = (user) => {
    if (
        !user ||
        !user.first_name || user.first_name === "" ||
        !user.last_name || user.first_name === "" ||
        !user.login || user.login === "" ||
        !user.password || user.password === "" ||
        !user.email || user.email === "" ||
            !user.permissions
    ) throw new HttpError("A needed value is missing to create a new user", HttpStatus.BAD_REQUEST);

    if (!
            /^.{6,}$/.test(user.password)
    ) throw new HttpError("Password should be between 6 and 30 characters", HttpStatus.BAD_REQUEST);

    if (!
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
    ) throw new HttpError("This email has an invalid format", HttpStatus.BAD_REQUEST);

    return true;
};

const confirmAccount = async (req) => {
    if (!req.query || !req.query.user || req.query.user === "") throw new HttpError("Missing the token in the confirmation url", HttpStatus.BAD_REQUEST);
    await UserDao.confirmAccount(req.query.user);
};

const findAll = async () => {
    let users = await UserDao.findAll();
    let rawUsers = [];
    users.forEach(user => {
        let tmp = [];
        if(user.permissions) {
            user.permissions.forEach(perm => {
                tmp.push(perm.name);
            });
        };
        rawUsers.push({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            login: user.login,
            active: user.active,
            permissions: tmp
        });
    });
    return rawUsers;
};

const deactivateUser = async (req) => {
    if (!req.body || !req.body.login || req.body.login === "") throw new HttpError("The login value of the user was empty", HttpStatus.BAD_REQUEST);
    return await UserDao.deactivateUser(req.body.login);
};

const resendMail = async (req) => {
    if (!req.body || !req.body.login || req.body.login === "") throw new HttpError("The login value of the user was empty", HttpStatus.BAD_REQUEST);
    let user = await UserDao.findAllInfoByLogin(req.body.login);
    let hash = await HashDao.findHashByLogin(req.body.login);
    if(!hash) throw new HttpError("No hash found in database for this user. He is probably already active", HttpStatus.BAD_REQUEST);
    try {
        await Mailer.sendAccountConfirmation(user.email, Url.ACCOUNT_CONFIRMATION + hash.hash, user.login);
    } catch (err) {
        Logger.error(err);
        throw new HttpError("Error while trying to send confirmation email", HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default {authenticate, createUser, confirmAccount, findAll, validateCode, deactivateUser, resendMail}
