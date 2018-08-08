import Db from "../db/Db";
import Logger from "../modules/Logger";
import Sequelize from "sequelize";

const createGroup = async (group_name) => {
    try {
        return await Db.SplitGroups.create({
            name: group_name
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const createPayment = async (description) => {
    try{
        return await Db.SplitPayments.create({
            description: description,
            date: new Date().toLocaleString()
        })
    } catch(err){
        Db.handleError(err);users
    }
};

const userMakePayment = async (user_id, payment_id, amount) => {
    try{
        return await Db.UserSplitPayments.create({
            split_payment_id: payment_id,
            user_id: user_id,
            amount: amount
        });
    } catch (err){
        Db.handleError(err);
    }
};

const addUserToGroup = async (user_id, group_id) => {

};

const removeUserFromGroup = async (user_id, group_id) => {

};


export default {createGroup}