class User {
    constructor(name, permissions){
        this.name = name;
        this.permissions = permissions;
    }

    get(){
        return {
            name : this.name,
            permissions: this.permissions
        }
    }

    cast(userObject){
        try{
         //...
        }
    }

    getName(){
        return this.name;
    }

    getPermissions(){
        return this.permissions;
    }
}

export default User;