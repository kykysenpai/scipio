import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.DataTypes.STRING
    },
    last_name: {
        type: Sequelize.DataTypes.STRING
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