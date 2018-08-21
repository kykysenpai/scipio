import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.DataTypes.STRING
    },
    date: {
        type: Sequelize.DataTypes.DATE
    },
    image: {
        type: Sequelize.DataTypes.STRING
    }

}