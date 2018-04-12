import Db from "../db/Db";
import Logger from "../modules/Logger";

const findAllByUserId = async (user_id) => {
    try {
        let users_permissions = await Db.UsersPermissions.findAll({
            where: {
                user_id: user_id
            }
        });

        let permissions_id = [];
        users_permissions.forEach(user_permission => {
            permissions_id.push(user_permission.permission_id);
        });

        return await Db.Permissions.findAll({
            where: {
                id: permissions_id
            }
        });


    } catch (err) {
        Db.handleError(err);
    }
};

export default {findAllByUserId}