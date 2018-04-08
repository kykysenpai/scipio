import Db from '../db/Db';
import Hash from 'object-hash';
import Logger from "../modules/Logger";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";

const findAllInfoByLogin = async (login) => {
    try {
        return await Db.Users.findOne({
            where: {
                login: login
            }
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const createUser = async (user) => {
    Logger.debug("Started creating user in persistence", user);
    let t = await Db.getTransaction();
    try {
        Logger.debug("Creating user in database...");
        let createdUser = await Db.Users.create({
            first_name: user.first_name,
            last_name: user.last_name,
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
        await foundAccountCreationCode.destroy({

        }, {transaction: t});


        Logger.debug("No problem while creating user, committing changes...");
        await t.commit();

        return createdHash.hash;
    } catch (err) {
        await t.rollback();
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

        Logger.debug("Removing his activation code from persistence...");
        await foundHash.destroy({

        }, {transaction: t});

        Logger.debug("No error while activating account, committing changes...");
        await t.commit();

    } catch (err) {
        await t.rollback();
        Db.handleError(err);
    }
};

const findAll = async() => {
  try{
      return await Db.Users.findAll({
          attributes: ['first_name', 'last_name', 'login', 'email', 'active']
      });
  } catch(err) {
      Db.handleError(err);
  }
};


export default {findAllInfoByLogin, createUser, confirmAccount, findAll}