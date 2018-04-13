import Db from "../db/Db";
import Hash from "object-hash";
import Logger from "../modules/Logger";
import Sequelize from 'sequelize';
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import ErrorMessages from "../config/constants/ErrorMessages";

const Op = Sequelize.Op;

const createAccountCreationCode = async (user_login) => {
    try {
        let expiration_date = new Date();
        expiration_date.setHours(expiration_date.getHours() + 1);
        return await Db.AccountCreationCodes.create({
            code: Hash(Math.random()),
            expiration_date: expiration_date.toLocaleString(),
            user_login: user_login
        });
    } catch (err) {
        Logger.debug(err);
        if(err.message === ErrorMessages.ACCOUNT_CREATION_CODE_UNIQUE_LOGIN)
            throw new HttpError("This user already exists", HttpStatus.BAD_REQUEST);
        if(err.message === ErrorMessages.VALIDATION_ERROR)
            throw new HttpError("A code was already created for this user", HttpStatus.BAD_REQUEST);
        Db.handleError(err);
    }
};

const checkCodeValidity = async (code, user_login) => {
    try {
        let currentDateTime = new Date();
        let expiredCodes = await Db.AccountCreationCodes.destroy({
            where: {
                expiration_date: {
                    [Op.lt]: currentDateTime
                }
            }
        });

        Logger.debug("Found", expiredCodes, "expired date times in the account creation codes table and will proceed to delete them");

        return await Db.AccountCreationCodes.findOne({
            where: {
                code: code,
                user_login: user_login
            }
        })
    } catch (err) {
        Db.handleError(err);
    }
};

export default {createAccountCreationCode, checkCodeValidity}