import Sequelize, {
    AccessDeniedError,
    BaseError, ConnectionError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    DatabaseError, EmptyResultError, UniqueConstraintError
} from "sequelize";
import Config from "../config/Config";
import Logger from "../modules/Logger";
import UserModel from "../models/User";
import PermissionModel from "../models/Permission";
import UserPermissionModel from "../models/UserPermission";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import HashModel from "../models/Hash";
import AccountCreationCodeModel from "../models/AccountCreationCode";
import UserSplitPaymentModel from "../models/UserSplitPayment";
import UserSplitGroupModel from "../models/UserSplitGroup";
import SplitGroupModel from "../models/SplitGroup";
import SplitPaymentModel from "../models/SplitPayment";

Logger.info("Creating database instance...");

const sequelize = new Sequelize(
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
    switch (err.constructor) {
        case AccessDeniedError:
            return "Access to database was denied from application";
        case ConnectionRefusedError:
            return "Access to database refused";
        case ConnectionTimedOutError:
            return "Timed out before reaching database, it is probably not attainable";
        case HttpError:
            return err.message;
    }
    if (err instanceof DatabaseError) {
        return "There was an error querrying the database";
    }
    if (err instanceof ConnectionError) {
        return "There was an error connecting to the database";
    }
    return "There was an unknown problem in the database";
};

const handleError = (err) => {
    Logger.error("An error was reported in the persistence layer", err);
    throw new HttpError(getErrorMessage(err), HttpStatus.INTERNAL_SERVER_ERROR);
};

Logger.info("Creation all database models...");

const getTransaction = async () => {
    try {
        return await sequelize.transaction();
    } catch (err) {
        Logger.error(err);
        throw new HttpError("Not possible to start a persistence transaction", HttpStatus.INTERNAL_SERVER_ERROR);
    }
};


const Users = sequelize.define("users", UserModel);

const Permissions = sequelize.define("permissions", PermissionModel);

const UsersPermissions = sequelize.define("users_permissions", UserPermissionModel);

const Hashs = sequelize.define("hashs", HashModel);

const AccountCreationCodes = sequelize.define("account_creation_codes", AccountCreationCodeModel);

const SplitGroups = sequelize.define("split_groups", SplitGroupModel);

const SplitPayments = sequelize.define("split_payments", SplitPaymentModel);

const UsersSplitGroups = sequelize.define("users_split_groups", UserSplitGroupModel);

const UsersSplitPayments = sequelize.define("users_split_payments", UserSplitPaymentModel);

Users.belongsToMany(Permissions, {
    through: 'users_permissions',
    foreignKey: 'user_id'
});

Permissions.belongsToMany(Users, {
    through: 'users_permissions',
    foreignKey: 'permission_id'
});

Users.belongsToMany(SplitGroups, {
    through: 'users_split_groups',
    foreignKey: 'user_id'
});

SplitGroups.belongsToMany(Users, {
    through: 'users_split_groups',
    foreignKey: 'split_group_id'
});

Users.belongsToMany(SplitPayments, {
    through: 'users_split_payments',
    foreignKey: 'user_id'
});

SplitPayments.belongsToMany(Users, {
    through: 'users_split_payments',
    foreignKey  : 'split_payment_id'
});

SplitPayments.hasOne(SplitGroups, {
    foreignKey: 'id'
});

SplitGroups.hasMany(SplitPayments, {
    foreignKey: 'id'
});

Logger.info("All database models have been set up");

export default {
    handleError,
    Users,
    Permissions,
    UsersPermissions,
    Hashs,
    AccountCreationCodes,
    SplitGroups,
    SplitPayments,
    UsersSplitGroups,
    UsersSplitPayments,
    getTransaction
}