import HttpStatus from "../config/constants/HttpStatus";
import PermissionUcc from "../ucc/PermissionUcc";

const findAll = async (req, res, next) => {
    try {
        let perms = await PermissionUcc.findAll();
        res
            .status(HttpStatus.OK)
            .send(perms);
    } catch (err) {
        next(err);
    }
};

export default {findAll}