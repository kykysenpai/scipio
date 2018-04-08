import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";
import PermissionDao from "../dao/PermissionDao";

const findAllByUserId = async (user) => {
    if(!user || user === "") throw new HttpError("Internal Error", HttpStatus.INTERNAL_SERVER_ERROR);
    return await PermissionDao.findAllByUserId(user);
};

export default {findAllByUserId}