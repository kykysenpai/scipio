import Sequelize, {
    AccessDeniedError,
    BaseError, ConnectionError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    DatabaseError, EmptyResultError
} from "sequelize";
import Config from "../config/Config";
import Logger from "../modules/Logger";
import UserModel from "../models/User";
import PermissionModel from "../models/Permission";
import UserPermissionModel from "../models/UserPermission";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";

const db = new Sequelize(
    Config.DB_DATABASE,
    Config.DB_USERNAME,
    Config.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: Config.DB_URL,
        port: Config.DB_PORT,
        pool: {
            max: Config.DB_POOL_MAX,
            idle: 30000,
            acquire: 60000,
            logging: Logger.debug
        },
        define: {
            timestamps: false,
            charset: 'utf8'
        },
        operatorsAliases: false
    }
);

const getErrorMessage = (err) => {
    Logger.error(err);
    switch (err.constructor) {
        case AccessDeniedError:
            return "Access to database was denied from application";
        case ConnectionRefusedError:
            return "Access to database refused";
        case ConnectionTimedOutError:
            return "Timed out before reaching database, it is probably not attainable";
    }
    if(err instanceof DatabaseError){
        return "There was an error querrying the database";
    }
    if(err instanceof ConnectionError){
        return "There was an error connecting to the database";
    }
    return "There was an unknown problem in the database";
};

const handleError = (err) => {
    throw new HttpError(getErrorMessage(err), HttpStatus.INTERNAL_SERVER_ERROR);
};

const User = db.define("users", UserModel);

const Permissions = db.define("permissions", PermissionModel);

const UsersPermissions = db.define("users_permissions", UserPermissionModel);


export default {User, Permissions, UsersPermissions, handleError}