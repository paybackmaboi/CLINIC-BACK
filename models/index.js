// models/index.js

const { sequelize } = require('../database');
const db = {};

// Import all model definition functions
db.User = require('./user.model')(sequelize);
db.MedicalProfile = require('./medicalProfile.model')(sequelize);
db.Consultation = require('./consultation.model')(sequelize);
db.PhysicalExam = require('./physicalExam.model')(sequelize);
db.HealthRecord = require('./healthRecord.model')(sequelize);

// --- Set up Model Associations (Relationships) ---

// User <-> MedicalProfile (One-to-One)
db.User.hasOne(db.MedicalProfile);
db.MedicalProfile.belongsTo(db.User);

// User <-> Consultation (One-to-Many)
db.User.hasMany(db.Consultation);
db.Consultation.belongsTo(db.User);

// User <-> HealthRecord (One-to-Many)
db.User.hasMany(db.HealthRecord);
db.HealthRecord.belongsTo(db.User);

// Consultation <-> PhysicalExam (One-to-One)
db.Consultation.hasOne(db.PhysicalExam);
db.PhysicalExam.belongsTo(db.Consultation);

// Consultation <-> HealthRecord (One-to-One)
db.Consultation.hasOne(db.HealthRecord);
db.HealthRecord.belongsTo(db.Consultation);


// Export the sequelize instance and all models
db.sequelize = sequelize;

module.exports = db;
