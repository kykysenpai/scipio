import Sequelize from "sequelize";

export default {
    permission_id : {
        type: Sequelize.DataTypes.INTEGER
    },
    user_id : {
        type: Sequelize.DataTypes.INTEGER
    }
}