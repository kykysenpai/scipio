import Sequelize from "sequelize";

export default {
    split_payment_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DataTypes.FLOAT
    }
}