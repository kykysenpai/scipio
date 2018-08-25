import Session from "../modules/Session";
import CommunistSplitDao from "../dao/CommunistSplitDao";
import Logger from "../modules/Logger";

const getAllSplitGroups = async (req) => {
    let decodedToken = await Session.getTokenFromSession(req);
    return await CommunistSplitDao.getAllSplitGroups(decodedToken.id);
};

const getAllSplitPayments = async (split_group_id) => {
};

const getSplitGroup = async (req) => {
    let split_group = await CommunistSplitDao.getSplitGroup(req.params.split_group_id);

    let users_owe = {};

    for (let user in split_group.users) {
        users_owe[split_group.users[user].id] = {}
    }

    for (let user in split_group.users) {
        for (let user_owe in users_owe) {
            users_owe[user_owe][split_group.users[user].id] = 0;
        }
    }

    for (let payment in split_group.payments) {
        for (let user_participation in split_group.payments[payment].users_participations) {
            if (split_group.payments[payment].users_participations[user_participation].user_id != split_group.payments[payment].user_id) {
                users_owe[split_group.payments[payment].users_participations[user_participation].user_id][split_group.payments[payment].user_id]
                    += split_group.payments[payment].users_participations[user_participation].amount;
                users_owe[split_group.payments[payment].user_id][split_group.payments[payment].users_participations[user_participation].user_id]
                    -= split_group.payments[payment].users_participations[user_participation].amount;
            }
        }
    }

    split_group.users_owe = users_owe;

    let decoded_token = await Session.getTokenFromSession(req);

    split_group.user_id = decoded_token.id;

    return split_group;

};

const getSplitPayment = async (req) => {
};

const addSplitGroup = async (req) => {
    return await CommunistSplitDao.addSplitGroup();
};

const addSplitPayment = async (req) => {
    let decodedToken = await Session.getTokenFromSession(req);
    req.body.split_payment.user_id = decodedToken.id;
    await CommunistSplitDao.addSplitPayment(req.body.split_payment);
};


export default {getAllSplitGroups, getAllSplitPayments, getSplitGroup, getSplitPayment, addSplitGroup, addSplitPayment}