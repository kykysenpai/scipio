import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: Sequelize.DataTypes.STRING
    },
    expiration_date:{
        type: Sequelize.DataTypes.DATE
    },
    user_login:{
        type: Sequelize.DataTypes.STRING
    }
}