import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import Db from "../db/DbMock";
import bcrypt from "bcrypt";
import UserDao from "../dao/UserDao";
import Logger from "../modules/Logger";

/**
 * Try to authenticate user with given login and password, will return a js object representing the user or else null and throw an error
 * @param login
 * @param password
 * @returns {Promise<null>} jsobj if valid or null otherwise
 */
const authenticate = async (login, password) => {
    if (login === undefined || login === ''
        || password === undefined || password === '') {
        reject(new HttpError('One of the parameter was invalid or not present', HttpStatus.BAD_REQUEST));
    }
    let userJsObj = await UserDao.findByLogin(login);
    if(!userJsObj) throw new HttpError('No user with this login', HttpStatus.BAD_REQUEST);
    let result = await bcrypt.compare(password, userJsObj.password);
    if (result) {
        return checkIntegrity(userJsObj) ? userJsObj : null;
    } else {
        throw new HttpError('Password did not match', HttpStatus.BAD_REQUEST);
    }
};

/**
 * Checks if the javascript object has all the attriubtes required to match a user in the application
 * @param jsObj
 * @returns {boolean} true if the object is a good representation of a user
 */
const checkIntegrity = (jsObj) => {
    if(
        !jsObj.name || !jsObj.permissions ||
            jsObj.name === ""
    )throw new HttpError('Invalid js object was casted as a user object', HttpStatus.INTERNAL_SERVER_ERROR);
    return true;
};

export default {authenticate}
