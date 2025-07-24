// controllers/consultation.controller.js

const { Consultation, User, MedicalProfile, PhysicalExam, HealthRecord } = require('../models');

// Controller to create a new consultation request
exports.requestConsultation = async (req, res) => {
    try {
        const { userId, chiefComplaint } = req.body;
        if (!userId || !chiefComplaint) {
            return res.status(400).json({ message: 'User ID and chief complaint are required.' });
        }
        const consultation = await Consultation.create({
            chiefComplaint,
            status: 'Pending',
            UserId: userId,
        });
        res.status(201).json(consultation);
    } catch (error) {
        console.error('Error submitting consultation request:', error);
        res.status(500).json({ message: 'Failed to submit consultation request.' });
    }
};

// Controller to get all pending consultations
exports.getPendingConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.findAll({
            where: { status: 'Pending' },
            include: [{
                model: User,
                attributes: ['id', 'role'], 
                include: [MedicalProfile]
            }],
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error fetching pending consultations:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Controller to schedule an appointment
exports.scheduleAppointment = async (req, res) => {
    try {
        const { appointmentTime } = req.body;
        const consultation = await Consultation.findByPk(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found.' });
        }
        consultation.appointmentTime = appointmentTime;
        consultation.status = 'Scheduled';
        await consultation.save();
        res.status(200).json(consultation);
    } catch (error) {
        console.error('Error scheduling consultation:', error);
        res.status(500).json({ message: 'Failed to schedule.' });
    }
};

// Controller to save the physical exam form
exports.savePhysicalExam = async (req, res) => {
    try {
        const consultation = await Consultation.findByPk(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found.' });
        }
        await PhysicalExam.upsert({ ...req.body, ConsultationId: consultation.id });
        res.status(201).json({ message: 'Physical exam saved.'});
    } catch (error) {
        console.error('Error saving physical exam:', error);
        res.status(500).json({ message: 'Failed to save physical exam.' });
    }
};

// Controller to save the health record and complete the consultation
exports.saveHealthRecord = async (req, res) => {
    try {
        const consultation = await Consultation.findByPk(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found.' });
        }
        await HealthRecord.upsert({
            ...req.body,
            ConsultationId: consultation.id,
            UserId: consultation.UserId
        });
        
        consultation.status = 'Completed';
        await consultation.save();

        res.status(201).json({ message: 'Health record saved and consultation completed.' });
    } catch (error) {
        console.error('Error saving health record:', error);
        res.status(500).json({ message: 'Failed to save health record.' });
    }
};
