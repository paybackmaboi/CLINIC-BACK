const { Consultation, User } = require('../models');

// Helper function to find or create the test user
const findOrCreateTestUser = async () => {
    const [user, created] = await User.findOrCreate({
        where: { id: 1 },
        defaults: { role: 'patient' },
    });
    if (created) {
        console.log('✅ Created test user with ID 1');
    }
    return user;
};

// Define the controller function
const createConsultation = async (req, res) => {
    try {
        const user = await findOrCreateTestUser();
        const userId = user.id;

        const { reason, preferredDateTime } = req.body;

        if (!reason || !preferredDateTime) {
            return res.status(400).json({ message: 'Reason and preferred date/time are required.' });
        }

        const newConsultation = await Consultation.create({
            chiefComplaint: reason,
            appointmentTime: new Date(preferredDateTime),
            status: 'Pending',
            UserId: userId,
        });

        res.status(201).json(newConsultation);

    } catch (error) {
        console.error('❌ Error creating consultation:', error);
        res.status(500).json({ message: 'Server error while creating consultation.', error: error.message });
    }
};

// Export the function in an object
module.exports = {
    createConsultation,
};