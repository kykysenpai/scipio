import HttpError from "../modules/HttpError";

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
        return new Promise((resolve, reject) => {
            if(userObject.name === undefined || userObject.name === ''
                || userObject.permissions === undefined){
                reject(new Error('Invalid js object to cast'));
            }
            try {
                resolve(new User(
                    userObject.name,
                    userObject.permissions
                ));
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default User;