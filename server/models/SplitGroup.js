import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        unique: true
    },
    id_discord_server: {
        type: Sequelize.DataTypes.STRING
    },
    id_discord_default_channel: {
        type: Sequelize.DataTypes.STRING
    }
}
