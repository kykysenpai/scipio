import Db from '../db/Db';

const findByLogin = async (login) => {
    try{
        return await Db.User.findOne({
            where: {
                login: login
            }
        });
    } catch (err){
       Db.handleError(err);
    }
};

export default {findByLogin}