import HttpStatus from "../config/constants/HttpStatus";
import CommunistSplitUcc from "../ucc/CommunistSplitUcc";
import Logger from "../modules/Logger";

const getAllSplitGroups = async (req, res, next) => {
    try{
        let splitGroups = await CommunistSplitUcc.getAllSplitGroups(req);
        res
            .status(HttpStatus.OK)
            .send(splitGroups);
    }catch(err){
        next(err);
    }
};

const getAllSplitPayments = async (req, res, next) => {
    try{
        //TODO
        let splitPayments = await CommunistSplitUcc.getAllSplitPayments(req);
        res
            .status(HttpStatus.OK)
            .send(splitPayments);
    }catch(err){
        next(err);
    }
};

const getSplitGroup = async (req, res, next) => {
    try{
        let splitGroup = await CommunistSplitUcc.getSplitGroup(req);
        res
            .status(HttpStatus.OK)
            .send(splitGroup);
    }catch(err){
        next(err);
    }
};

const getSplitPayment = async (req, res, next) => {
    try{
        //TODO
        let splitPayment = await CommunistSplitUcc.getSplitPayment(req);
        res
            .status(HttpStatus.OK)
            .send(splitPayment);
    }catch(err){
        next(err);
    }
};

const addSplitGroup = async (req, res, next) => {
    try{
        await CommunistSplitUcc.addSplitGroup(req);
        res
            .status(HttpStatus.OK)
            .send();
    }catch(err){
        next(err);
    }
};

const addSplitPayment = async (req, res, next) => {
    try{
        await CommunistSplitUcc.addSplitPayment(req);
        res
            .status(HttpStatus.OK)
            .send();
    }catch(err){
        next(err);
    }
};



export default {getAllSplitGroups, getAllSplitPayments, getSplitGroup, getSplitPayment, addSplitGroup, addSplitPayment}