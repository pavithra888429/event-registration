const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true,
    },
    rollNumber: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    eventId: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

// Prevent duplicate registration per event
registrationSchema.index({ rollNumber: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
