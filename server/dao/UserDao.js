import Db from '../db/Db';
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
            attributes: ['id', 'login', 'email', 'id_keycloak', 'id_discord']
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const findLoginByIdList = async (ids) => {
    try {
        return await Db.Users.findAll({
            where: {
                id: ids
            },
            attributes: ['id', 'login']
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const updateUser = async (localUser, keycloakUser) => {
    try {
        Logger.debug("Updating user infos with keycloak infos", keycloakUser);
        return await localUser.update({
            login: keycloakUser.preferred_username,
            email: keycloakUser.email
        })
    } catch (err) {
        Db.handleError(err);
    }
};

const createUser = async (user) => {
    Logger.debug("Started creating user in persistence", user);
    try {
        Logger.debug("Creating user in database...");
        await Db.Users.create({
            login: user.preferred_username,
            email: user.email,
            id_keycloak: user.sub
        });

        return await findAllInfoByKeycloakId(user.sub);

    } catch (err) {
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
            attributes: ['login', 'email', 'id_keycloak', 'id_discord']
        });
    } catch (err) {
        Db.handleError(err);
    }
};

export default {
    findAllInfoByKeycloakId,
    createUser,
    confirmAccount,
    findAll,
    deactivateUser,
    findLoginByIdList,
    updateUser
}
