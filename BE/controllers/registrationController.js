const Registration = require('../models/Registration');

// Register for an event
const registerEvent = async (req, res, next) => {
    try {
        const { studentName, rollNumber, department, year, email, phone, eventId } = req.body;

        if (!studentName || !rollNumber || !department || !year || !email || !phone || !eventId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingRegistration = await Registration.findOne({ rollNumber, eventId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const newRegistration = new Registration({
            studentName,
            rollNumber,
            department,
            year,
            email,
            phone,
            eventId
        });

        await newRegistration.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }
        next(error);
    }
};

// Get all registrations
const getAllRegistrations = async (req, res, next) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });
        res.status(200).json(registrations);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerEvent,
    getAllRegistrations,
};
