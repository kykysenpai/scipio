import Db from '../db/Db';
import Hash from 'object-hash';
import Logger from "../modules/Logger";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import {UniqueConstraintError} from "sequelize";

const findAllInfoByKeycloakId = async (id) => {
    try {
        return await Db.Users.findOne({
            include: {
                model: Db.Permissions,
                as: 'permissions',
                attributes: ['name']
            },
            where: {
                id_keycloak: id
            },
            attributes: ['id', 'login', 'email', 'active', 'password']
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const findLoginByIdList = async (ids) => {
    try{
        let users = await Db.Users.findAll({
            where:{
                id: ids
            },
            attributes: ['id', 'login']
        });
    }catch(err){
        Db.handleError(err);
    }
};

const createUser = async (user) => {
    Logger.debug("Started creating user in persistence", user);
    let t = await Db.getTransaction();
    try {
        Logger.debug("Creating user in database...");
        let createdUser = await Db.Users.create({
            login: user.login,
            password: user.password,
            email: user.email,
            active: false
        }, {transaction: t});

        Logger.debug("Creating his hash for email confirmation...");
        let createdHash = await Db.Hashs.create({
            user_id: createdUser.id,
            hash: Hash(createdUser.email)
        }, {transaction: t});

        let foundAccountCreationCode = await Db.AccountCreationCodes.find({
            where: {
                code: user.code
            }
        }, {transaction: t});

        Logger.debug("Deleting his security code in the database...");
        await foundAccountCreationCode.destroy({}, {transaction: t});


        Logger.debug("No problem while creating user, committing changes...");
        await t.commit();

        return createdHash.hash;
    } catch (err) {
        await t.rollback();
        if (err.constructor === UniqueConstraintError) {
            throw new HttpError("This e-mail is already used", HttpStatus.BAD_REQUEST);
        }
        Db.handleError(err);
    }
};

const confirmAccount = async (hash) => {
    Logger.debug("Confirming a user account activation...");
    let t = await Db.getTransaction();
    try {
        let foundHash = await Db.Hashs.find({
            where: {
                hash: hash
            }
        }, {transaction: t});

        if (!hash) throw new HttpError('This user doesn\'t exist', HttpStatus.BAD_REQUEST);

        let user = await Db.Users.find({
            where: {
                id: foundHash.user_id
            }
        }, {transaction: t});


        Logger.debug("Activating user...");
        await user.update({
            active: true
        }, {transaction: t});

        Logger.debug("No error while activating account, committing changes...");
        await t.commit();

    } catch (err) {
        await t.rollback();
        Db.handleError(err);
    }
};

const deactivateUser = async (login) => {
    try {
        let user = await findAllInfoByLogin(login);
        return await user.update({
            active: false
        });
    } catch (err) {

        Db.handleError(err);
    }
};

const findAll = async () => {
    try {
        return await Db.Users.findAll({
            include: [{
                model: Db.Permissions,
                as: 'permissions',
                attributes: ['name'],
                through: {attributes: []}
            }],
            attributes: ['login', 'email', 'active']
        });
    } catch (err) {
        Db.handleError(err);
    }
};

export default {findAllInfoByKeycloakId, createUser, confirmAccount, findAll, deactivateUser, findLoginByIdList}
