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
    email: {
        type: Sequelize.DataTypes.STRING
    },
    id_keycloak: {
        type: Sequelize.DataTypes.STRING
    },
    id_discord: {
        type: Sequelize.DataTypes.STRING
    }
}
