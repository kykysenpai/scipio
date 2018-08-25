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
    },
    split_group_id: {
        type: Sequelize.DataTypes.INTEGER
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER
    },
    total: {
        type: Sequelize.DataTypes.FLOAT
    },
    users_participations: {
        type: Sequelize.DataTypes.VIRTUAL
    }

}