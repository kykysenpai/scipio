import Sequelize from "sequelize";


export default {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    }
}