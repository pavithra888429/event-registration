require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://event-registration-frontend.onrender.com', 'https://your-frontend-url.onrender.com'] // Update with actual frontend URL
    : 'http://localhost:3000'
}));
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/register', registrationRoutes);
app.use('/api/registrations', registrationRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('Event Registration API is running!');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
