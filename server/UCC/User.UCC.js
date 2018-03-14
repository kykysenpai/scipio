import DB from '../db/DB.mock';
import UserDTO from '../models/User.DTO';
import HttpError from "../modules/HttpError";
import HttpStatus from 'http-status';
import log from 'winston';
import bcrypt from 'bcrypt';
import config from '../config/config';
import Session from "../modules/Session";

const authenticate = async (login, password) => {
    if (login === undefined || login === ''
        || password === undefined || password === '') {
        reject(new HttpError('One of the parameter was invalid or not present', HttpStatus.BAD_REQUEST));
    }
    let userJsObj = await DB.getUserByLogin(login);
    let result = await bcrypt.compare(password, userJsObj.password);
    if(result){
        return UserDTO.cast(userJsObj);
    } else {
        throw new HttpError('Password did not match', HttpStatus.BAD_REQUEST);
    }
};
const updatePassword = () => {

};
const createUser = () => {

};


export default {authenticate};