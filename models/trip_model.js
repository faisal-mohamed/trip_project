const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const Trip = sequelize.define('Trips', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true,
    freezeTableName: true
})

Trip.associate = (models) => {
    Trip.belongsTo(models.User, { foreignKey: 'adminId' });
};

module.exports = Trip;