import Permissions from '../config/Permissions';
import HttpError from "../modules/HttpError";
import HttpStatus from 'http-status';

/**
 * Try to get the user data from his login and check if the password is valid.
 * @param login
 * @param password
 * @returns {Promise<any>}
 */
const authenticate = (login, password) => {
    return new Promise((resolve, reject) => {
        if(login === 'admin' && password === 'password'){
            resolve({
                name: 'admin',
                permissions :[
                    Permissions.ADMIN,
                    Permissions.USER
                ]
            });
        } else {
            reject(new HttpError('Invalid user as ' + login + ' : ' + password, HttpStatus.UNAUTHORIZED));
        }
    });
};

/**
 * Fetch user by his login
 * @param login
 * @returns {Promise<any>}
 */
const getUserByLogin = (login) => {
    return new Promise((resolve, reject) => {
        if(login === 'admin') {
            resolve({
                name: 'admin',
                permissions: [
                    Permissions.USER
                ],
                password: '$2a$10$Yp1ASKU6XieX6ctCG/t3wOr/NCS90T0rV3oD9bHPQSB5YqSMXJ/Y.'
            })
        } else {
            reject(new HttpError('User ' + login + ' doens\'t exist', HttpStatus.UNAUTHORIZED));
        }
    });
};

export default {getUserByLogin};