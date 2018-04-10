import Db from "../db/Db";

const findAllByUserId = async (user_id) => {
    try {
        let users_permissions = await Db.UsersPermissions.findAll({
            where: {
                user_id: user_id
            }
        });

        let users_permissions_id = [];
        users_permissions.forEach(user_permission => {
            users_permissions_id.push(user_permission.user_id);
        });

        return await Db.Permissions.findAll({
            where: {
                id: users_permissions_id
            }
        });
    } catch (err) {
        Db.handleError(err);
    }
};

export default {findAllByUserId}