// routes/consultation.routes.js

const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultation.controller');

// Route for a patient to submit a new request
router.post('/request', consultationController.requestConsultation);

// Route for a doctor to get all pending requests
router.get('/pending', consultationController.getPendingConsultations);

// Route for a doctor to schedule an appointment
router.put('/:id/schedule', consultationController.scheduleAppointment);

// Route for a doctor to save the physical exam form
router.post('/:id/physical-exam', consultationController.savePhysicalExam);

// Route for a doctor to save the health record
router.post('/:id/health-record', consultationController.saveHealthRecord);

module.exports = router;
