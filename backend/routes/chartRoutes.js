const express = require('express');
const router = express.Router();
const ChartData = require('../models/ChartData');

// Endpoint to fetch chart data (GET /api/charts)
router.get('/', async (req, res) => {
    try {
        const data = await ChartData.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Endpoint to add new chart data (POST /api/charts)
router.post('/', async (req, res) => {
    const { total_kwh, createdAt } = req.body;
    
    // Ensure required fields are provided
    if (!total_kwh || !createdAt) {
        return res.status(400).json({ message: 'Please provide total_kwh and createdAt' });
    }
    
    try {
        const newData = new ChartData({ total_kwh, createdAt });
        await newData.save();
        res.status(201).json(newData); // 201 Created response
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
