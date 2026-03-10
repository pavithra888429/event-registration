require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
const connectDB = require('./config/db');

const sampleEvents = [
    {
        eventId: 'EVENT001',
        title: 'TechNova Annual Hackathon 2026',
        description: 'Join us for the most awaited 36-hour hackathon of the year! Build innovative solutions, compete with the brightest minds, and win exciting prizes. Open to all departments.',
        date: new Date('2026-04-15')
    },
    {
        eventId: 'EVENT002',
        title: 'Design Sprint 2026',
        description: 'A 24-hour design challenge for creative minds.',
        date: new Date('2026-05-10')
    }
];

const seedDB = async () => {
    await connectDB();
    try {
        await Event.deleteMany({});
        await Event.insertMany(sampleEvents);
        console.log('Sample data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
