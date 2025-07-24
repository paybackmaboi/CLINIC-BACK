// models/healthRecord.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const HealthRecord = sequelize.define('HealthRecord', {
        findings: DataTypes.TEXT,
        medicalDiagnosis: DataTypes.TEXT,
        treatment: DataTypes.TEXT,
    });
    return HealthRecord;
};
