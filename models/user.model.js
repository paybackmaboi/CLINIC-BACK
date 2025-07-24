// models/user.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING, // 'patient', 'doctor'
            allowNull: false
        }
    });
    return User;
};
