import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER
    },
    hash:{
        type: Sequelize.DataTypes.STRING
    }
}