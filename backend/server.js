const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chartRoutes = require('./routes/chartRoutes');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/charts', chartRoutes);  // Link the chart routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
