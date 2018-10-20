import HttpStatus from "../config/constants/HttpStatus";
import Config from '../config/Config';

const fetch = async (req, res, next) => {
    try {
        res
            .status(HttpStatus.OK)
            .send(Config.VERSION);
    } catch (err) {
        next(err);
    }
};

export default {fetch}