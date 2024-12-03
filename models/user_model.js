const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');



const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
})


User.associate = (models) => {
    User.hasMany(models.Trips, { foreignKey: 'adminId'});
}

module.exports = User;
