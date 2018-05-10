import GameServerUcc from "../ucc/GameServerUcc";
import HttpStatus from "../config/constants/HttpStatus";

const getStateMinecraft = async (req, res, next) => {
    try{
        let state = await GameServerUcc.getStateMinecraft();
        res
            .status(HttpStatus.OK)
            .send(state);
    }catch(err){
        next(err);
    }
};

const getStateTrackmania = async (req, res, next) => {
    try{
        let state = await GameServerUcc.getStateTrackmania();
        res
            .status(HttpStatus.OK)
            .send(state);
    }catch(err){
        next(err);
    }
};

const getStateConan = async (req, res, next) => {
    try{
        let state = await GameServerUcc.getStateConan();
        res
            .status(HttpStatus.OK)
            .send(state);
    }catch(err){
        next(err);
    }
};

export default {getStateMinecraft, getStateTrackmania, getStateConan}