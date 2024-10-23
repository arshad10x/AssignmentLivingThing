const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    total_kwh: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

const ChartData = mongoose.model('ChartData', chartDataSchema);
module.exports = ChartData;
