const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

// Get single event
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEvents,
    getEventById,
};
