import Permissions from '../config/Permissions';
import HttpError from "../modules/HttpError";
import HttpStatus from 'http-status';

/**
 * Fetch user by his login
 * @param login
 * @returns {Promise<{name: string, permissions: *[], password: string}>}
 */
const getUserByLogin = async (login) => {
    if (login === 'admin') {
        return {
            name: 'admin',
            permissions: [
                Permissions.USER
            ],
            password: '$2a$10$Yp1ASKU6XieX6ctCG/t3wOr/NCS90T0rV3oD9bHPQSB5YqSMXJ/Y.'
        };
    } else {
        throw new Error('no user with this login')
    }
};

export default {getUserByLogin};