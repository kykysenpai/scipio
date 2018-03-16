import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";

class User {
    constructor(name, permissions) {
        this.name = name;
        this.permissions = permissions;
    }

    /**
     * Returns an js object with the user fields
     * @returns {{name: *, permissions: *}}
     */
    getAll() {
        return {
            name: this.getName(),
            permissions: this.getPermissions()
        }
    }

    getName() {
        return this.name;
    }

    getPermissions() {
        return this.permissions;
    }

    /**
     * Transforms a js object into a user if the object has all the necessary fields
     * @param userObject
     * @returns {*}
     */
    static cast(userObject) {
        if (userObject.name === undefined || userObject.name === ''
            || userObject.permissions === undefined) {
            throw new HttpError('Invalid js object to cast', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            return (new User(
                userObject.name,
                userObject.permissions
            ));
        } catch (err) {
            throw new HttpError('Couldn\t case a js Object to a UserDto instance', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default User;
