const { User, MedicalProfile, Consultation } = require('../models');

// Helper function to find or create the test user and its profile
const findOrCreateTestUser = async () => {
    const [user, created] = await User.findOrCreate({
        where: { id: 1 },
        defaults: { role: 'patient' },
    });

    if (created) {
        console.log('✅ Created test user with ID 1');
        // If the user is new, they need a medical profile to update
        await MedicalProfile.create({ UserId: user.id });
        console.log('✅ Created associated medical profile for user 1');
    }
    return user;
};

// Define the controller functions
const getDashboard = async (req, res) => {
    try {
        const user = await findOrCreateTestUser();
        const userId = user.id;

        const appointments = await Consultation.findAll({
            where: { UserId: userId },
            order: [['appointmentTime', 'ASC']],
        });

        // The health history is the medical profile itself
        const healthHistory = await MedicalProfile.findOne({
            where: { UserId: userId },
        });

        res.status(200).json({ appointments, healthHistory });
    } catch (error) {
        console.error('❌ Error in getDashboard:', error);
        res.status(500).json({ message: 'Error fetching dashboard data.', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await findOrCreateTestUser();
        const userId = user.id;

        const [updatedCount] = await MedicalProfile.update(req.body, {
            where: { UserId: userId },
        });

        if (updatedCount > 0) {
            const updatedProfile = await MedicalProfile.findOne({ where: { UserId: userId } });
            res.status(200).json(updatedProfile);
        } else {
            res.status(404).json({ message: 'Medical profile not found for this user.' });
        }
    } catch (error) {
        console.error('❌ Error in updateProfile:', error);
        res.status(500).json({ message: 'Error updating profile.', error: error.message });
    }
};

// Export all functions as a single object
module.exports = {
    getDashboard,
    updateProfile,
};