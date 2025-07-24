// routes/patient.routes.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

// Route to get all patients
router.get('/', patientController.getAllPatients);

// Route to save a patient's medical profile
router.post('/profile', patientController.saveMedicalProfile);

module.exports = router;
