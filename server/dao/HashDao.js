import Db from "../db/Db";
import HttpError from "../modules/HttpError";
import HttpStatus from "../config/constants/HttpStatus";

const findHashByLogin = async(login) => {
    try{
        let user = await Db.Users.find({
            where:{
                login: login
            }
        });

        if(!user) throw new HttpError("No such user in persistence", HttpStatus.BAD_REQUEST);

        return await Db.Hashs.find({
            where:{
                user_id: user.id
            }
        })
    } catch(err){
        Db.handleError(err);
    }
};

export default {findHashByLogin}