// routes/index.js

const express = require('express');
const router = express.Router();

const patientRoutes = require('./patient.routes');
const consultationRoutes = require('./consultation.routes');

// Mount the specific routers on their base paths
router.use('/patients', patientRoutes);
router.use('/consultations', consultationRoutes);

module.exports = router;
