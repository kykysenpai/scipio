import Db from "../db/Db";
import Logger from "../modules/Logger";

const getAllSplitGroups = async (user_id) => {
    try {

        let user_split_groups = await Db.UsersSplitGroups.findAll({
            where: {
                user_id: user_id
            }
        });

        let split_groups_id = [];

        user_split_groups.forEach(user_split_group => {
            split_groups_id.push(user_split_group.split_group_id);
        });

        return await Db.SplitGroups.findAll({
            where: {
                id: split_groups_id
            }
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const getSplitGroup = async (split_group_id) => {
    try{

        let split_group = await Db.SplitGroups.find({
            id: split_group_id
        });

        let users_in_group = await Db.UsersSplitGroups.findAll({
            where:{
                split_group_id: split_group_id
            },
            attributes: ['user_id']
        });

        let users_ids = [];

        users_in_group.forEach(user => {
            users_ids.push(user.user_id)
        });

        let users = await Db.Users.findAll({
            where:{
                id: users_ids
            },
            attributes: ['id', 'login']
        });

        let payments = await Db.SplitPayments.findAll({
            where:{
                split_group_id:split_group_id
            }
        });

        for(let payment in payments){

            let users_participations = await Db.UsersSplitPayments.findAll({
                where:{
                    split_payment_id: payments[payment].id
                }
            });

            payments[payment].users_participations = users_participations;
        }

        return {
            split_group: split_group,
            users: users,
            payments: payments
        }

    } catch(err){
        Db.handleError(err);
    }
};

const addSplitGroup = async (group_name) => {
    try {
        return await Db.SplitGroups.create({
            name: group_name
        });
    } catch (err) {
        Db.handleError(err);
    }
};

const addSplitPayment = async (split_payment) => {
    try {

        let participating_users = split_payment.participating_users;
        let description = split_payment.description;
        let date = new Date().toLocaleString();
        let image = "";

        let created_split_payment = await Db.SplitPayments.create({
            split_group_id: split_payment.split_group_id,
            description: description,
            date: date,
            image: image,
            user_id: split_payment.user_id,
            total: split_payment.total
        });

        let users_participations = [];

        participating_users.forEach(participating_user => {
          users_participations.push({
              split_payment_id: created_split_payment.id,
              user_id: participating_user.id,
              amount: participating_user.amount
          });
        });

        await Db.UsersSplitPayments.bulkCreate(users_participations);

    } catch (err) {
        Db.handleError(err);
    }
};

const addUserToGroup = async (user_id, group_id) => {

};

const removeUserFromGroup = async (user_id, group_id) => {

};


export default {getAllSplitGroups, getSplitGroup, addSplitPayment}
