import Sequelize from "sequelize";

export default {
    split_group_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    }
}