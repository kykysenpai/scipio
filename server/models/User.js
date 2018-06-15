import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    email: {
        type: Sequelize.DataTypes.STRING
    },
    active: {
        type: Sequelize.DataTypes.BOOLEAN
    }
}