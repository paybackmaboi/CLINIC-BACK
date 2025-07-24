// controllers/patient.controller.js

const { User, MedicalProfile } = require('../models');

// Controller to get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'patient' },
            include: [MedicalProfile]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error while fetching patients.' });
    }
};

// Controller to create or update a patient's medical profile
exports.saveMedicalProfile = async (req, res) => {
    try {
        // In a real app, userId would come from an authenticated session/token.
        const [user, created] = await User.findOrCreate({
            where: { id: req.body.userId || 1 }, // Using a placeholder ID
            defaults: { role: 'patient' }
        });

        const profileData = { ...req.body, UserId: user.id };
        
        // Use `upsert` to create a new profile or update an existing one for the user.
        await MedicalProfile.upsert(profileData);
        
        res.status(201).json({ message: 'Profile saved successfully.' });
    } catch (error) {
        console.error('Error creating/updating medical profile:', error);
        res.status(500).json({ message: 'Failed to save medical profile.' });
    }
};
