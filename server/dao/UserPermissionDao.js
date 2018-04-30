import Db from "../db/Db";

const addPermission = async (login, permission) => {
    try {
        let fetched_permission = await Db.Permissions.find({
            where:{
                name:permission
            }
        });

        let fetched_user = await Db.Users.find({
            where:{
                login: login
            }
        });

        await Db.UsersPermissions.create({
            permission_id: fetched_permission.id,
            user_id: fetched_user.id
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const removePermission = async (login, permission) => {
    try {
        let fetched_permission = await Db.Permissions.find({
            where:{
                name:permission
            }
        });

        let fetched_user = await Db.Users.find({
            where:{
                login: login
            }
        });

        let userPermission = await Db.UsersPermissions.find({
            where: {
                permission_id: fetched_permission.id,
                user_id: fetched_user.id
            }
        });

        await userPermission.destroy();

    } catch (err) {
        Db.handleError(err);
    }
};

export default {addPermission, removePermission}