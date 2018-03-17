import Permissions from "../config/constants/Permissions";
import HttpError from "../modules/HttpError";

const getUserByLogin = async (login) => {
    if (login === 'admin') {
        return {
            name: 'admin',
            permissions: [
                Permissions.USER,
                Permissions.ADMIN
            ],
            password: '$2a$10$Yp1ASKU6XieX6ctCG/t3wOr/NCS90T0rV3oD9bHPQSB5YqSMXJ/Y.'
        };
    } else {
        throw new HttpError('No user with this login', 400, false)
    }
};

export default {getUserByLogin}