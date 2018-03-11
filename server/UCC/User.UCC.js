import DB from '../db/DB.mock';
import UserDTO from '../models/User.DTO';
import HttpError from "../modules/HttpError";
import HttpStatus from 'http-status';
import log from 'winston';
import bcrypt from 'bcrypt';
import config from '../config/config';

const authenticate = (login, password) => {
    return new Promise((resolve, reject) => {
        if(login === undefined || login === ''
            || password === undefined || password === ''){
            reject(new HttpError('One of the parameter was invalid or not present', HttpStatus.BAD_REQUEST));
        }

        DB.getUserByLogin(login)
            .then((userJsObj) => {
                return userJsObj;
            })
            .then((userJsObj) => {
                bcrypt.compare(password, userJsObj.password)
                    .then((result) => {
                        if(result){
                            try{
                                resolve(UserDTO.cast(userJsObj));
                            } catch (err) {
                                reject(err);
                            }
                        } else {
                            reject(new HttpError('Password did not match', HttpStatus.BAD_REQUEST));
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                log.debug('error from db', err);
                reject(err);
            });
    });
};
const updatePassword = () => {

};
const createUser = () => {

};


export default {authenticate};