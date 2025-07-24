// models/consultation.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Consultation = sequelize.define('Consultation', {
        chiefComplaint: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        appointmentTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING, // e.g., 'Pending', 'Scheduled', 'Completed', 'Cancelled', 'No-show'
            defaultValue: 'Pending'
        },
    });
    return Consultation;
};
