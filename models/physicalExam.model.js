// models/physicalExam.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PhysicalExam = sequelize.define('PhysicalExam', {
        weightKg: DataTypes.FLOAT,
        heightCm: DataTypes.FLOAT,
        temperatureC: DataTypes.FLOAT,
        bloodPressure: DataTypes.STRING,
        heartRateBpm: DataTypes.INTEGER,
        pulseRateBpm: DataTypes.INTEGER,
        respiratoryRateCpm: DataTypes.INTEGER,
        oxygenSaturationPercent: DataTypes.FLOAT,
        physicalDefectDeformity: DataTypes.STRING,
        nearsighted: DataTypes.BOOLEAN,
        farsighted: DataTypes.BOOLEAN,
        astigmatism: DataTypes.BOOLEAN,
        sneelensTestRight: DataTypes.STRING,
        sneelensTestLeft: DataTypes.STRING,
        earInfection: DataTypes.STRING,
        neck: DataTypes.TEXT,
        chestLungs: DataTypes.TEXT,
        heart: DataTypes.TEXT,
        abdomen: DataTypes.TEXT,
        extremities: DataTypes.TEXT,
        remarks: DataTypes.TEXT,
    });
    return PhysicalExam;
};
