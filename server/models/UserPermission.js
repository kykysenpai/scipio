import Sequelize from "sequelize";

export default {
    permission_id : {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    user_id : {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    }
}