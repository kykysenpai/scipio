import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import Db from "../db/DbMock";
import bcrypt from "bcrypt";
import UserDto from "../models/UserDto";

const authenticate = async (login, password) => {
    if (login === undefined || login === ''
        || password === undefined || password === '') {
        reject(new HttpError('One of the parameter was invalid or not present', HttpStatus.BAD_REQUEST));
    }
    let userJsObj = await Db.getUserByLogin(login);
    let result = await bcrypt.compare(password, userJsObj.password);
    if (result) {
        return UserDto.cast(userJsObj);
    } else {
        throw new HttpError('Password did not match', HttpStatus.BAD_REQUEST);
    }
};
const updatePassword = () => {

};
const createUser = () => {

};

export default {authenticate}
