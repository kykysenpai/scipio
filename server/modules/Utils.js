const checkAny = (perms, jwtPerms) => {
    let hasPerm = false;
    perms.forEach((perm) => {
        jwtPerms.forEach((jwtPerm) => {
            if (perm === jwtPerm) {
                hasPerm = true;
            }
        })
    });
    return hasPerm;
};

const checkAll = (perms, jwtPerms) => {
    let hasPerm = true;
    perms.forEach((perm) => {
        if(!jwtPerms.includes(perm)){
            hasPerm = false;
        }
    });
    return hasPerm;
};

export default {checkAny, checkAll}